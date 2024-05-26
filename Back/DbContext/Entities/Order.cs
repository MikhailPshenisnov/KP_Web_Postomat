using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back.DbContext.Entities;

public class Order
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    
    [MaxLength(128)]
    public string secret_code_hash { get; set; }
    
    [MaxLength(1024)]
    public string description { get; set; }

    public int size { get; set; }
    
    public DateOnly end_date { get; set; }

    public int delivery_person_id { get; set; }
}