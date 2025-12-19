import React, { useEffect, useState } from "react";
import "./recommendedProductsSection.css";
import RecommendedProductsService from "../../collections/recommended-products-service/recommended.products.service";
import {Link} from "react-router-dom";

function RecommendedProductsSection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await RecommendedProductsService.fetchRecommendedProducts();
                const list = Array.isArray(data) ? data : [];
                setProducts(list);
            } catch (err) {
                console.error(err);
                setError("Recommended products could not be loaded.");
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) {
        return (
            <section className="recommended-section">
                <h2 className="section-title">Recommended Non-Prescription Products</h2>
                <p>Loading</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="recommended-section">
                <h2 className="section-title">Recommended Non-Prescription Products</h2>
                <p>{error}</p>
            </section>
        );
    }

    return (
        <section className="recommended-section">
            <h2 className="section-title">Recommended Non-Prescription Products</h2>

            <div className="product-cards">
                {products.map((p) => (
                    <div key={p.id} className="product-card">
                        <div className="product-image-placeholder" />

                        <div className="product-info">
                            <h3 className="product-name">{p.name}</h3>
                            <p className="product-price">{p.price}</p>
                            <p className="product-status">{p.status}</p>
                        </div>
                        <button className="product-btn">Add to cart</button>
                    </div>
                ))}
            </div>

            <div className="view-all-wrapper">
                <Link to="/products" className="view-all-btn">
                    View All Products
                </Link>
            </div>
        </section>
    );
}

export default RecommendedProductsSection;