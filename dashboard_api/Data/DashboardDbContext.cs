using Microsoft.EntityFrameworkCore;
using dashboard_api.Entities;

namespace dashboard_api.Data
{
    public class DashboardDbContext : DbContext
    {
        public DashboardDbContext(DbContextOptions<DashboardDbContext> options)
            : base(options) { }

        public DbSet<Product> Product { get; set; }
    }

}
