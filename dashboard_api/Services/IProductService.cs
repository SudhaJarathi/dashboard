using dashboard_api.DTOs;

namespace dashboard_api.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductReadDTO>> GetAllProductsAsync();
        Task<ProductReadDTO> GetProductByIdAsync(int id);
        Task<ProductReadDTO> CreateProductAsync(ProductCreateUpdateDTO productCreateUpdateDTO);
        Task<ProductReadDTO> UpdateProductAsync(int id, ProductCreateUpdateDTO productCreateUpdateDTO);
        Task DeleteProductAsync(int id);
    }
}
