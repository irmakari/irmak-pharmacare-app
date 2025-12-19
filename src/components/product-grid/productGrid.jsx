import React from "react";
import ProductCard from "../product-card/productCard";
import "./productGrid.css";

const ProductGrid = ({ items }) => {
    if (!items || items.length === 0) {
        return <div style={{ padding: 12 }}>No products found.</div>;
    }

    return (
        <div className="products-grid">
            {items.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;