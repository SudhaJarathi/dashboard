using dashboard_api.DTOs;
using dashboard_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace dashboard_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly ILogger<DashboardController> _logger;
        private readonly IProductService _productService;

        public DashboardController(ILogger<DashboardController> logger, IProductService productRepository)
        {
            _logger = logger;
            _productService = productRepository;

            _logger.LogInformation("Dashboard Controller Started...");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductReadDTO>>> GetProductsAsync()
        {
            var products = await _productService.GetAllProductsAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductReadDTO?>> GetProductAsync(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);

            if (product == null)
                return NotFound();

            return product;
        }

        [HttpPost]
        public async Task<ActionResult<ProductReadDTO>> AddProductAsync([FromBody] ProductCreateUpdateDTO product)
        {
            var newProduct = await _productService.CreateProductAsync(product);

            return Created($"New product {newProduct.Id} added", newProduct);
        }

        [HttpPut()]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductCreateUpdateDTO product)
        {
            var updatedProduct = await _productService.UpdateProductAsync(id, product);
            if (updatedProduct == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _productService.DeleteProductAsync(id);

            return NoContent();
        }
    }
}