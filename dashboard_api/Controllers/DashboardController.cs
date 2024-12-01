using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dashboard_api.Model;
using dashboard_api.Data;


namespace Dashboard_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {       
        private readonly ILogger<DashboardController> _logger;
        private readonly DashboardDbContext _context;

        public DashboardController(ILogger<DashboardController> logger, DashboardDbContext context)
        {
            _logger = logger;
            _context = context;
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
    }
}
