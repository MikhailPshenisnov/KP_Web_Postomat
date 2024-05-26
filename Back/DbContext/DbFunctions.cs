using Back.DbContext.Entities;
using Back.DbContext.MyTypes;

namespace Back.DbContext;

public static class DbFunctions
{
    // Очищает ячейку от заказа и удаляет очищенный заказ
    public static void ClearCellContent(int cellId)
    {
        using var dbContext = new ApplicationDbContext();

        var cellToClear = (from cell in dbContext.Cells where cell.id == cellId select cell).FirstOrDefault();

        if (cellToClear is null) throw new Exception("Incorrect cell id");

        var orderId = cellToClear.order_id;

        if (orderId is not null)
        {
            var orderToDelete =
                (from order in dbContext.Orders where order.id == orderId select order).FirstOrDefault();

            if (orderToDelete is null) throw new Exception("Incorrect order id");

            dbContext.Orders.Remove(orderToDelete);
        }

        cellToClear.order_id = null;
        cellToClear.is_empty = true;

        dbContext.SaveChanges();
    }

    // Строго устанавливает заказ в ячейке
    public static void SetCellContent(int cellId, OrderStruct order)
    {
        using var dbContext = new ApplicationDbContext();

        var addedOrder = dbContext.Orders.Add(new Order()
        {
            secret_code_hash = BCrypt.Net.BCrypt.HashPassword(order.secret_code),
            description = order.description,
            size = order.size,
            delivery_person_id = order.delivery_person_id,
            end_date = DateOnly.FromDateTime(DateTime.Now.AddDays(7))
        });

        dbContext.SaveChanges();

        var cellToSetOrder = (from cell in dbContext.Cells where cell.id == cellId select cell).FirstOrDefault();

        if (cellToSetOrder is null) throw new Exception("Incorrect cell id");

        if (!(cellToSetOrder.size >= order.size)) throw new Exception("Incorrect cell size");

        var oldOrderId = cellToSetOrder.order_id;

        if (oldOrderId is not null)
        {
            var orderToDelete = (from o in dbContext.Orders where o.id == oldOrderId select o).FirstOrDefault();

            if (orderToDelete is null) throw new Exception("Incorrect order id");

            dbContext.Orders.Remove(orderToDelete);
        }

        cellToSetOrder.order_id = addedOrder.Entity.id;
        cellToSetOrder.is_empty = false;

        dbContext.SaveChanges();
    }

    public static void AddCellContent(int cellId, OrderStruct order)
    {
        using var dbContext = new ApplicationDbContext();

        var cellToAddOrder = (from cell in dbContext.Cells where cell.id == cellId select cell).FirstOrDefault();

        if (cellToAddOrder is null) throw new Exception("Incorrect cell id");

        if (!cellToAddOrder.is_empty) throw new Exception("Cell is not empty");

        if (!(cellToAddOrder.size >= order.size)) throw new Exception("Incorrect cell size");

        var addedOrder = dbContext.Orders.Add(new Order()
        {
            secret_code_hash = BCrypt.Net.BCrypt.HashPassword(order.secret_code),
            description = order.description,
            size = order.size,
            delivery_person_id = order.delivery_person_id,
            end_date = DateOnly.FromDateTime(DateTime.Now.AddDays(7))
        });

        dbContext.SaveChanges();

        cellToAddOrder.order_id = addedOrder.Entity.id;

        cellToAddOrder.is_empty = false;

        dbContext.SaveChanges();
    }

    public static void CreateCell(SizeEnum cellSize)
    {
        using var dbContext = new ApplicationDbContext();

        dbContext.Cells.Add(new Cell()
        {
            size = Convert.ToInt32(cellSize),
            is_empty = true,
            order_id = null
        });

        dbContext.SaveChanges();
    }

    public static void DeleteCell(int cellId)
    {
        using var dbContext = new ApplicationDbContext();

        var cellToDelete = (from cell in dbContext.Cells where cell.id == cellId select cell).FirstOrDefault();

        if (cellToDelete is null) throw new Exception("Incorrect cell id");

        dbContext.Cells.Remove(cellToDelete);

        dbContext.SaveChanges();
    }

    public static void GetOrder(int orderId)
    {
        using var dbContext = new ApplicationDbContext();

        var cellWithOrder = (from cell in dbContext.Cells where cell.order_id == orderId select cell).FirstOrDefault();

        if (cellWithOrder == null) throw new Exception("Incorrect order id");

        ClearCellContent(cellWithOrder.id);
    }

    public static void DeliverOrder(OrderStruct order)
    {
        using var dbContext = new ApplicationDbContext();

        var cellToDeliverOrder = (from cell in dbContext.Cells
                                     where cell.is_empty == true && cell.size == order.size
                                     select cell).FirstOrDefault() ??
                                 (from cell in dbContext.Cells
                                     where cell.is_empty == true && cell.size > order.size
                                     select cell).FirstOrDefault();

        if (cellToDeliverOrder is null) throw new Exception("No suitable cells");

        AddCellContent(cellToDeliverOrder.id, order);
    }

    public static int GetOrderId(string secretCode)
    {
        using var dbContext = new ApplicationDbContext();

        var orders = from order in dbContext.Orders
            select order;

        foreach (var o in orders)
        {
            if (BCrypt.Net.BCrypt.Verify(secretCode, o.secret_code_hash))
            {
                return o.id;
            }
        }

        throw new Exception("Unknown secret code");
    }

    public static void Log(string message)
    {
        using var dbContext = new ApplicationDbContext();

        dbContext.Program_logs.Add(new Program_log()
        {
            message = message.Length > 4000 ? message.Substring(0, 4000) : message,
            datetime = DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString()
        });

        dbContext.SaveChanges();
    }

    public static bool CheckUserPasswordHash(int userId, string passwordHash)
    {
        using var dbContext = new ApplicationDbContext();

        var userToCheckPasswordHash = (from user in dbContext.Users
            where user.id == userId
            select user).FirstOrDefault();

        if (userToCheckPasswordHash is null) throw new Exception("Incorrect user id");

        return passwordHash == userToCheckPasswordHash.password_hash;
    }

    public static int GetUserRole(int userId)
    {
        using var dbContext = new ApplicationDbContext();

        var userToGetRole = (from user in dbContext.Users
            where user.id == userId
            select user).FirstOrDefault();

        if (userToGetRole is null) throw new Exception("Incorrect user id");

        return userToGetRole.role_id;
    }

    public static void AddUser(string login, string password, int roleId)
    {
        using var dbContext = new ApplicationDbContext();

        dbContext.Users.Add(new User()
        {
            login = login,
            password_hash = BCrypt.Net.BCrypt.HashPassword(password),
            role_id = roleId
        });

        dbContext.SaveChanges();
    }

    public static User? TryLoginUser(string login, string password)
    {
        using var dbContext = new ApplicationDbContext();

        var userToTryLogin = (from user in dbContext.Users
            where user.login == login
            select user).FirstOrDefault();

        if (userToTryLogin is null) throw new Exception("Incorrect user id");

        return BCrypt.Net.BCrypt.Verify(password, userToTryLogin.password_hash) ? userToTryLogin : null;
    }
}