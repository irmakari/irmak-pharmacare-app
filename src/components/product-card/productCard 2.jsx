import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCategorySlug } from "../../utils/product";
import "./productCard.css";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleViewDetails = () =>
        navigate(`/products/${product.id}`, { state: { product } });

    const category =
        product.categoryLabel ||
        formatCategorySlug(product.categorySlug) ||
        product.category ||
        "Product";

    const isAvailable = product.available ?? true;
    const price = Number(product.price ?? 0);
    const imageSrc = product.imageUrl;

    return (
        <div className="product-card">
            <div className={`card-image ${!imageSrc ? "card-image--placeholder" : ""}`}>
                {imageSrc && (
                    <img src={imageSrc} alt={`${product.name} product`} loading="lazy" />
                )}
            </div>

            <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-brand">{product.brand} • {category}</p>
                <p className="card-price">${price.toFixed(2)}</p>
            </div>

            <button
                className={`card-cta ${!isAvailable ? "card-cta--muted" : ""}`}
                disabled={!isAvailable}
                type="button"
            >
                Add to Cart

            </button>
            <button
                className="card-cta card-cta--secondary"
                onClick={handleViewDetails}
                type="button">
                View Details
            </button>
        </div>
    );
};

export default ProductCard;
