using Microsoft.EntityFrameworkCore;
using dashboard_api.Model;

namespace dashboard_api.Data
{
    public class DashboardDbContext : DbContext
    {
        public DashboardDbContext(DbContextOptions<DashboardDbContext> options)
            : base(options) { }

        public DbSet<Dashboard> Dashboard { get; set; }
    }

}
