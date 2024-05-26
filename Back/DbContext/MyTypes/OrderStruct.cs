namespace Back.DbContext.MyTypes;

public struct OrderStruct
{
    public int id { get; set; }

    public string secret_code { get; set; }

    public string description { get; set; }

    public int size { get; set; }
    
    public DateOnly end_date { get; set; }

    public int delivery_person_id { get; set; }
}