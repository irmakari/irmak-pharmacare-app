import React from "react";
import TabBar from "../tab-navigator/tabNavigator";

const ProductDetailsCard = ({
    product,
    quantity,
    description,
    features,
    tags,
    onBack,
    onIncrement,
    onDecrement,
    loading = false,
    errorMessage = "",
}) => {
    if (loading) {
        return (
            <div className="pd-page">
                <TabBar />
                <main className="pd-wrapper">
                    <div className="pd-breadcrumb">
                        <button
                            type="button"
                            className="pd-link"
                            onClick={onBack}
                        >
                            Products
                        </button>
                        <span className="pd-breadcrumb-sep">/</span>
                        <span>Loading...</span>
                    </div>
                    <div className="pd-empty-state">
                        Loading product details...
                    </div>
                </main>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="pd-page">
                <TabBar />
                <main className="pd-wrapper">
                    <div className="pd-breadcrumb">
                        <button
                            type="button"
                            className="pd-link"
                            onClick={onBack}
                        >
                            Products
                        </button>
                        <span className="pd-breadcrumb-sep">/</span>
                        <span>Not Found</span>
                    </div>
                    <div className="pd-empty-state">
                        {errorMessage || "Product could not be loaded."}
                    </div>
                </main>
            </div>
        );
    }

    const priceValue = Number(product.price ?? 0);
    const isAvailable = product.available ?? true;

    return (
        <div className="pd-page">
            <TabBar />

            <main className="pd-wrapper">
                <div className="pd-breadcrumb">
                    <button
                        type="button"
                        className="pd-link"
                        onClick={onBack}
                    >
                        Products
                    </button>
                    <span className="pd-breadcrumb-sep">/</span>
                    <span>{product?.name}</span>
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
                        <h1 className="pd-title">{product?.name}</h1>
                        <p className="pd-brand">{product?.brand}</p>
                        <p className="pd-price">${priceValue.toFixed(2)}</p>
                        <p className="pd-description">{description}</p>

                        <div className="pd-cta-row">
                            <div className="pd-quantity">
                                <button
                                    type="button"
                                    className="pd-qty-btn"
                                    onClick={onDecrement}
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <span className="pd-qty-value">{quantity}</span>
                                <button
                                    type="button"
                                    className="pd-qty-btn"
                                    onClick={onIncrement}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                type="button"
                                className={`pd-add-cart ${
                                    !isAvailable ? "pd-add-cart--disabled" : ""
                                }`}
                                disabled={!isAvailable}
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

export default ProductDetailsCard;
