using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back.DbContext.Entities;

public class User
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    
    [MaxLength(128)]
    public string login { get; set; }
    
    [MaxLength(128)]
    public string password_hash { get; set; }

    public int role_id { get; set; }
}