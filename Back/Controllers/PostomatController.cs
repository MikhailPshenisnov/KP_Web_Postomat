using Back.DbContext;
using Back.DbContext.Entities;
using Back.DbContext.MyTypes;
using Microsoft.AspNetCore.Mvc;

namespace Back.Controllers;

[Route("[controller]/[action]")]
public class PostomatController : ControllerBase
{
    [HttpGet]
    public IActionResult GetOrder()
    {
        var headers = HttpContext.Request.Headers;
        if (headers.TryGetValue("secret_code", out var secretCode))
        {
            if (!secretCode.ToString().All(char.IsDigit))
                return Ok("Incorrect secret code");

            try
            {
                DbFunctions.GetOrder(DbFunctions.GetOrderId(secretCode.ToString()));
            }
            catch (Exception e)
            {
                DbFunctions.Log(e.Message);
                return Ok(e.Message);
            }
            
            return Ok("");
        }

        return BadRequest("incorrect_headers");
    }
    
    [HttpGet]
    public IActionResult DeliverOrder()
    {
        var headers = HttpContext.Request.Headers;
        if (headers.TryGetValue("secret_code", out var secretCode)
            && headers.TryGetValue("description", out var description)
            && headers.TryGetValue("size", out var size))
        {
            var cookies = HttpContext.Request.Cookies;
            cookies.TryGetValue("user_id", out var userId);
            userId ??= "";
            cookies.TryGetValue("password_hash", out var passwordHash);
            passwordHash ??= "";
            
            if (userId == "" || passwordHash == "") return Ok("Incorrect user");
            try
            {
                if (!DbFunctions.CheckUserPasswordHash(Convert.ToInt32(userId), passwordHash)) return Ok("Incorrect user");
            }
            catch (Exception e)
            {
                DbFunctions.Log(e.Message);
                return Ok(e.Message);
            }

            var intSize = Convert.ToInt32(size.ToString());
            if (intSize < Convert.ToInt32(SizeEnum.Small) || intSize > Convert.ToInt32(SizeEnum.Large)) return Ok("Incorrect size");

            if (!secretCode.ToString().All(char.IsDigit))
                return Ok("Incorrect secret code");

            try
            {
                DbFunctions.DeliverOrder(new OrderStruct 
                    {
                        secret_code = secretCode.ToString(), 
                        description = description.ToString(), 
                        size = intSize, 
                        delivery_person_id = Convert.ToInt32(userId)
                    });
            }
            catch (Exception e)
            {
                DbFunctions.Log(e.Message);
                return Ok(e.Message);
            }
            
            return Ok("");
        }

        return BadRequest("incorrect_headers");
    }

    [HttpGet]
    public IActionResult CreateUser()
    {
        var headers = HttpContext.Request.Headers;
        if (headers.TryGetValue("login", out var login)
            && headers.TryGetValue("password", out var password)
            && headers.TryGetValue("role_id", out var roleId))
        {
            var cookies = HttpContext.Request.Cookies;
            cookies.TryGetValue("user_id", out var userId);
            userId ??= "";
            cookies.TryGetValue("password_hash", out var passwordHash);
            passwordHash ??= "";
            
            if (userId == "" || passwordHash == "") return Ok("Incorrect user");
            try
            {
                if (!DbFunctions.CheckUserPasswordHash(Convert.ToInt32(userId), passwordHash)) return Ok("Incorrect user");
            
                if (DbFunctions.GetUserRole(Convert.ToInt32(userId)) < 1) return Ok("Incorrect role");
            }
            catch (Exception e)
            {
                DbFunctions.Log(e.Message);
                return Ok(e.Message);
            }
            
            if (login.ToString().Length < 6
                || login.ToString().Any(char.IsPunctuation))
                return Ok("Incorrect login or password");
            
            if (password.ToString().Length < 8
                || !password.ToString().Any(char.IsLetter)
                || !password.ToString().Any(char.IsDigit)
                || !password.ToString().Any(char.IsPunctuation)
                || !password.ToString().Any(char.IsLower)
                || !password.ToString().Any(char.IsUpper))
                return Ok("Incorrect login or password");

            var intRoleId = Convert.ToInt32(roleId.ToString());
            if (intRoleId < 0 || intRoleId > 1) return Ok("Incorrect role id");

            try
            {
                DbFunctions.AddUser(login.ToString(), password.ToString(), intRoleId);
            }
            catch (Exception e)
            {
                DbFunctions.Log(e.Message);
                return Ok(e.Message);
            }
            
            return Ok("");
        }

        return BadRequest("incorrect_headers");
    }
    
    [HttpGet]
    public IActionResult LoginUser()
    {
        var headers = HttpContext.Request.Headers;
        if (headers.TryGetValue("login", out var login)
            && headers.TryGetValue("password", out var password))
        {
            if (login.ToString().Length < 6
                || login.ToString().Any(char.IsPunctuation))
                return Ok("Incorrect login or password");
            
            if (password.ToString().Length < 8
                || !password.ToString().Any(char.IsLetter)
                || !password.ToString().Any(char.IsDigit)
                || !password.ToString().Any(char.IsPunctuation)
                || !password.ToString().Any(char.IsLower)
                || !password.ToString().Any(char.IsUpper))
                return Ok("Incorrect login or password");

            try
            {
                var u = DbFunctions.TryLoginUser(login.ToString(), password.ToString());
                if (u is null) return Ok("Failed to login");
                
                HttpContext.Response.Cookies.Append("user_id", u.id.ToString());
                HttpContext.Response.Cookies.Append("login", u.login);
                HttpContext.Response.Cookies.Append("password_hash", u.password_hash);
                
                return Ok("");
            }
            catch (Exception e)
            {
                DbFunctions.Log(e.Message);
                return Ok(e.Message);
            }
        }

        return BadRequest("incorrect_headers");
    }
}