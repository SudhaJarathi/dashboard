using dashboard_api.DTOs;
using FluentValidation;

namespace dashboard_api.Validators
{
    public class ProductDTOValidator: AbstractValidator<ProductReadDTO>
    {
        public ProductDTOValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .WithMessage("Product ID is required");

            RuleFor(x => x.Category)
                .NotEmpty()
                .WithMessage("Category is required");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Price must be greater than zero.");
        }
    }
}
