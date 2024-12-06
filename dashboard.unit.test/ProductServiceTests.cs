using NUnit.Framework;
using Moq;
using AutoMapper;
using dashboard_api.DTOs;
using dashboard_api.Entities;
using dashboard_api.Repositories;
using dashboard_api.Services;

namespace dashboard.Tests
{
    [TestFixture]
    public class ProductServiceTests
    {
        private Mock<IProductRepository> _productRepositoryMock;
        private Mock<IMapper> _mapperMock;
        private ProductService _productService;

        [SetUp]
        public void SetUp()
        {
            _productRepositoryMock = new Mock<IProductRepository>();
            _mapperMock = new Mock<IMapper>();
            _productService = new ProductService(_productRepositoryMock.Object, _mapperMock.Object);
        }

        [Test]
        public async Task GetAllProductsAsync_ShouldReturnMappedProducts()
        {
            // Arrange
            var products = new List<Product> { new Product { Id = 1, Name = "Product1" } };
            var productDtos = new List<ProductReadDTO> { new ProductReadDTO { Id = 1, Name = "Product1" } };

            _productRepositoryMock.Setup(repo => repo.GetAllProductsAsync())
                .ReturnsAsync(products);

            _mapperMock.Setup(mapper => mapper.Map<IEnumerable<ProductReadDTO>>(products))
                .Returns(productDtos);

            // Act
            var result = await _productService.GetAllProductsAsync();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count);
            Assert.AreEqual("Product1", result.First().Name);
        }

        [Test]
        public async Task GetProductByIdAsync_ShouldReturnMappedProduct_WhenProductExists()
        {
            // Arrange
            var product = new Product { Id = 1, Name = "Product1" };
            var productDto = new ProductReadDTO { Id = 1, Name = "Product1" };

            _productRepositoryMock.Setup(repo => repo.GetProductByIdAsync(1))
                .ReturnsAsync(product);

            _mapperMock.Setup(mapper => mapper.Map<ProductReadDTO>(product))
                .Returns(productDto);

            // Act
            var result = await _productService.GetProductByIdAsync(1);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Id);
            Assert.AreEqual("Product1", result.Name);
        }

        [Test]
        public async Task GetProductByIdAsync_ShouldReturnNull_WhenProductDoesNotExist()
        {
            // Arrange
            _productRepositoryMock.Setup(repo => repo.GetProductByIdAsync(1))
                .ReturnsAsync((Product)null);

            // Act
            var result = await _productService.GetProductByIdAsync(1);

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public async Task CreateProductAsync_ShouldReturnMappedCreatedProduct()
        {
            // Arrange
            var productDto = new ProductCreateUpdateDTO { Name = "Product2" };
            var productEntity = new Product { Id = 1, Name = "Product2" };
            var createdProductDto = new ProductReadDTO { Id = 1, Name = "Product2" };

            _mapperMock.Setup(mapper => mapper.Map<Product>(productDto))
                .Returns(productEntity);

            _productRepositoryMock.Setup(repo => repo.CreateProductAsync(productEntity))
                .ReturnsAsync(productEntity);

            _mapperMock.Setup(mapper => mapper.Map<ProductReadDTO>(productEntity))
                .Returns(createdProductDto);

            // Act
            var result = await _productService.CreateProductAsync(productDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Id);
            Assert.AreEqual("Product2", result.Name);
        }

        [Test]
        public async Task UpdateProductAsync_ShouldReturnMappedUpdatedProduct_WhenProductExists()
        {
            // Arrange
            var productDto = new ProductReadDTO { Id = 1, Name = "Product3" };
            var productEntity = new Product { Id = 1, Name = "Product1" };

            _productRepositoryMock.Setup(repo => repo.GetProductByIdAsync(1))
                .ReturnsAsync(productEntity);

            _mapperMock.Setup(mapper => mapper.Map(productDto, productEntity));

            _productRepositoryMock.Setup(repo => repo.UpdateProductAsync(productEntity))
                .ReturnsAsync(productEntity);

            _mapperMock.Setup(mapper => mapper.Map<ProductReadDTO>(productEntity))
                .Returns(productDto);

            // Act
            var result = await _productService.UpdateProductAsync(1, productDto);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Id);
            Assert.AreEqual("Product3", result.Name);
        }

        [Test]
        public async Task UpdateProductAsync_ShouldReturnNull_WhenProductDoesNotExist()
        {
            // Arrange
            _productRepositoryMock.Setup(repo => repo.GetProductByIdAsync(1))
                .ReturnsAsync((Product)null);

            // Act
            var result = await _productService.UpdateProductAsync(1, new ProductReadDTO());

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public async Task DeleteProductAsync_ShouldInvokeRepositoryDelete()
        {
            // Arrange
            var productId = 1;

            _productRepositoryMock.Setup(repo => repo.DeleteProductAsync(productId))
                .Returns(Task.CompletedTask);

            // Act
            await _productService.DeleteProductAsync(productId);

            // Assert
            _productRepositoryMock.Verify(repo => repo.DeleteProductAsync(productId), Times.Once);
        }
    }
}
