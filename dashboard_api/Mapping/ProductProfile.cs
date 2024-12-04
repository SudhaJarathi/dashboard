using AutoMapper;
using dashboard_api.DTOs;
using dashboard_api.Entities;

namespace dashboard_api.Mapping
{
    public class ProductProfile : Profile
    {
        public ProductProfile() 
        {
            CreateMap<Product, ProductReadDTO>().ReverseMap();
            CreateMap<Product, ProductCreateUpdateDTO>().ReverseMap();
        }
    }
}

