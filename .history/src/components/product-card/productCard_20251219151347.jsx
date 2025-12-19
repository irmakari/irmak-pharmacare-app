import React from "react";
import "./productCard.css";

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="card-image" />

            <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-brand">{product.brand} • {product.category}</p>
                <p className="card-price">${product.price.toFixed(2)}</p>
            </div>

            <button
                className={`card-cta ${!product.available ? "card-cta--muted" : ""}`}
                disabled={!product.available}
                type="button"
            >
                Add to Cart

            </button>
            <button
                className={`card-cta ${!product.available ? "card-cta--muted" : ""}`}
                disabled={!product.available}
                type="button">
                View Details
            </button>
        </div>
    );
};

export default ProductCard;