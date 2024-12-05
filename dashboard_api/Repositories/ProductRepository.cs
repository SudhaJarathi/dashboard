using dashboard_api.Data;
using dashboard_api.Entities;
using Microsoft.EntityFrameworkCore;

namespace dashboard_api.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly DashboardDbContext _context;

        public ProductRepository(DashboardDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Product.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Product.FindAsync(id);
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            _context.Product.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Product> UpdateProductAsync(Product product)
        {
            var existingProduct = await _context.Product.FindAsync(product.Id);
            if (existingProduct == null)
            {
                return null;
            }

            // Manually update fields or just use the Update() method if all fields can be replaced
            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.Category = product.Category;

            await _context.SaveChangesAsync();
            return existingProduct;
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product != null)
            {
                _context.Product.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}
