import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TabBar from "../../components/tab-navigator/tabNavigator";
import { PRODUCT_ITEMS } from "../products/products.data";
import "./productDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [quantity, setQuantity] = useState(1);

    const productFromState = location.state?.product;
    const product = useMemo(() => {
        const parsedId = Number(id);
        if (productFromState && (!id || productFromState.id === parsedId)) {
            return productFromState;
        }

        if (Number.isNaN(parsedId)) {
            return null;
        }

        return PRODUCT_ITEMS.find((item) => item.id === parsedId) || null;
    }, [id, productFromState]);

    const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));
    const increment = () => setQuantity((prev) => Math.min(prev + 1, 99));

    if (!product) {
        return (
            <div className="pd-page">
                <TabBar />
                <main className="pd-wrapper">
                    <div className="pd-breadcrumb">
                        <button
                            type="button"
                            className="pd-link"
                            onClick={() => navigate("/products")}
                        >
                            Products
                        </button>
                        <span className="pd-breadcrumb-sep">/</span>
                        <span>Not Found</span>
                    </div>
                    <div className="pd-empty-state">
                        Product could not be loaded.
                    </div>
                </main>
            </div>
        );
    }

    const description =
        product.description ||
        "Up-to-date product details pulled from our catalog. Review the information below before adding to your cart.";

    const features = [
        `${product.brand} branded product`,
        `Category: ${product.category}`,
        product.available ? "Currently in stock" : "Temporarily unavailable",
    ];

    const tags = [
        product.category,
        product.available ? "In stock" : "Notify me",
    ];

    return (
        <div className="pd-page">
            <TabBar />

            <main className="pd-wrapper">
                <div className="pd-breadcrumb">
                    <button
                        type="button"
                        className="pd-link"
                        onClick={() => navigate("/products")}
                    >
                        Products
                    </button>
                    <span className="pd-breadcrumb-sep">/</span>
                    <span>{product.name}</span>
                </div>

                <div className="pd-grid">
                    <section className="pd-gallery">
                        <div className="pd-main-image" aria-hidden="true" />

                        <div className="pd-thumbnails">
                            {[1, 2, 3, 4].map((thumb) => (
                                <div key={thumb} className="pd-thumb" />
                            ))}
                        </div>

                        <button className="pd-zoom-btn" type="button">
                            + Zoom
                        </button>
                    </section>

                    <section className="pd-summary">
                        <h1 className="pd-title">{product.name}</h1>
                        <p className="pd-brand">{product.brand}</p>
                        <p className="pd-price">${product.price.toFixed(2)}</p>
                        <p className="pd-description">{description}</p>

                        <div className="pd-cta-row">
                            <div className="pd-quantity">
                                <button
                                    type="button"
                                    className="pd-qty-btn"
                                    onClick={decrement}
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <span className="pd-qty-value">{quantity}</span>
                                <button
                                    type="button"
                                    className="pd-qty-btn"
                                    onClick={increment}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                type="button"
                                className={`pd-add-cart ${
                                    !product.available ? "pd-add-cart--disabled" : ""
                                }`}
                                disabled={!product.available}
                            >
                                Add to Cart
                            </button>
                        </div>

                        <button type="button" className="pd-wishlist">
                            Add to Wishlist
                        </button>

                        <ul className="pd-features">
                            {features.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>

                        <div className="pd-tags">
                            {tags.map((tag) => (
                                <span key={tag} className="pd-pill">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;
