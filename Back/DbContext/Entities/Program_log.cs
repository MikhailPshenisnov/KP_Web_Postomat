using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back.DbContext.Entities;

public class Program_log
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    
    [MaxLength(4096)]
    public string message { get; set; }
    
    [MaxLength(64)]
    public string datetime { get; set; }
}