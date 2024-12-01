using Microsoft.AspNetCore.Mvc;
using dashboard_api.Model;
using dashboard_api.Data;
using dashboard_api.Services;


namespace Dashboard_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {       
        private readonly ILogger<DashboardController> _logger;
        private readonly DashboardDbContext _context;
        private readonly IDashboardService _dashboardService;

        public DashboardController(ILogger<DashboardController> logger, DashboardDbContext context, IDashboardService dashboardService)
        {
            _logger = logger;
            _context = context;
            _dashboardService = dashboardService;
        }
               

        [HttpGet]
        public Task<ActionResult<IEnumerable<Dashboard>>> GetDashboard()
        {
            var dashboard = new Dashboard
            {
                Id = 1,
                Name = "sample"
            };
            return Task.FromResult<ActionResult<IEnumerable<Dashboard>>>(Ok(dashboard));
        }

        [HttpPost]
        public async Task<ActionResult<Dashboard>> CreateDashboard(Dashboard dashboard)
        {
            var createdOrderDto = await _dashboardService.CreateDashboardAsync(dashboard);

            return Created($"/api/dashboard/{dashboard.Id}", 1);           
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<Dashboard>> UpdateDashboard(int id, Dashboard dashboard)
        {
           var updatedDashboard = await _dashboardService.UpdateDashboardAsync(dashboard);
           return Ok(updatedDashboard);            
        }
    }
}
