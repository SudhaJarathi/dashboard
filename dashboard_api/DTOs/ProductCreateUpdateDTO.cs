﻿namespace dashboard_api.DTOs
{
    public class ProductCreateUpdateDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
    }
}