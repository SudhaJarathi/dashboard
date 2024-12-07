using Microsoft.EntityFrameworkCore;
using dashboard_api.Entities;

namespace dashboard_api.Data
{
    public class DashboardDbContext : DbContext, IDashboardDbContext
    {
        public DashboardDbContext(DbContextOptions<DashboardDbContext> options)
            : base(options) { }

        public DbSet<Product> Product { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Category).IsRequired();
                entity.Property(e => e.Description).IsRequired(false);
                entity.Property(e => e.Price).IsRequired();
            });
        }
    }

}
