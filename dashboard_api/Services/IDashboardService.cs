using dashboard_api.Model;

namespace dashboard_api.Services
{
    public interface IDashboardService
    {
        Task<Dashboard> CreateDashboardAsync(Dashboard dashboard);
        Task<Dashboard> UpdateDashboardAsync(Dashboard dashboard);
        Task<IEnumerable<Dashboard>> GetDashboardAsync();
    }
}
