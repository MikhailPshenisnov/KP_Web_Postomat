using Back.DbContext.Entities;
using Microsoft.EntityFrameworkCore;

namespace Back.DbContext;

public class ApplicationDbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public DbSet<Cell> Cells { get; set; }
    
    public DbSet<Order> Orders { get; set; }
    
    public DbSet<Program_log> Program_logs { get; set; }
    
    public DbSet<Role> Roles { get; set; }
    
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cell>()
            .HasKey(h => new { h.id });
        
        modelBuilder.Entity<Order>()
            .HasKey(h => new { h.id });
        
        modelBuilder.Entity<Program_log>()
            .HasKey(h => new { h.id });
        
        modelBuilder.Entity<Role>()
            .HasKey(h => new { h.id });
        
        modelBuilder.Entity<User>()
            .HasKey(h => new { h.id });
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=web_postomat;" +
                                 "Username=postgres;Password=admin");
    }
}