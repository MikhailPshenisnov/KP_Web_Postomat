using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Back.DbContext.Entities;

public class Cell
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    
    public int size { get; set; }

    public bool is_empty { get; set; }

    [MaybeNull]
    public int? order_id { get; set; }
}