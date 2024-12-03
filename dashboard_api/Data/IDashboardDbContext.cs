using dashboard_api.Entities;
using Microsoft.EntityFrameworkCore;

namespace dashboard_api.Data
{
    public interface IDashboardDbContext
    {
        //Below SaveChangesAsync are implemented in Microsoft's DBContext class, we have just simply extracted
        //it out in this interface so that we could create mock of DashboardDbContext class when unit testing
        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        public DbSet<Product> Products { get; set; }
    }
}