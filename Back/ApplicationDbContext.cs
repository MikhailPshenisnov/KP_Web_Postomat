using Microsoft.EntityFrameworkCore;

namespace back;

public class ApplicationDbContext : DbContext
{
    // public DbSet<User> users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // modelBuilder.Entity<User>()
        //     .HasKey(h => new { h.id });
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=web_postomat;" +
                                 "Username=postgres;Password=admin");
    }
}