using AutoMapper;
using dashboard_api.DTOs;
using dashboard_api.Entities;
using dashboard_api.Repositories;

namespace dashboard_api.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductReadDTO>> GetAllProductsAsync()
        {
            var products = await _productRepository.GetAllProductsAsync();
            return _mapper.Map<IEnumerable<ProductReadDTO>>(products);
        }

        public async Task<ProductReadDTO> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
            {
                return null;
            }
            return _mapper.Map<ProductReadDTO>(product);
        }

        public async Task<ProductReadDTO> CreateProductAsync(ProductCreateUpdateDTO productCreateUpdateDTO)
        {
            var productEntity = _mapper.Map<Product>(productCreateUpdateDTO);
            var createdProduct = await _productRepository.CreateProductAsync(productEntity);
            return _mapper.Map<ProductReadDTO>(createdProduct);
        }

        public async Task<ProductReadDTO> UpdateProductAsync(int id, ProductReadDTO productCreateUpdateDTO)
        {
            var existingProduct = await _productRepository.GetProductByIdAsync(id);
            if (existingProduct == null)
            {
                return null;
            }

            // Map updated fields from DTO to entity
            _mapper.Map(productCreateUpdateDTO, existingProduct);

            var updatedProduct = await _productRepository.UpdateProductAsync(existingProduct);
            return _mapper.Map<ProductReadDTO>(updatedProduct);
        }

        public async Task DeleteProductAsync(int id)
        {
            await _productRepository.DeleteProductAsync(id);
        }
    }
}
