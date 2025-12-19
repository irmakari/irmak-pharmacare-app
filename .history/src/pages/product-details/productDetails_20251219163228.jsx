import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TabBar from "../../components/tab-navigator/tabNavigator";
import ProductsService from "../../collections/products-service/products.service";
import { normalizeProduct } from "../../utils/product";
import "./productDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const productFromState = location.state?.product;

    const [product, setProduct] = useState(
        productFromState ? normalizeProduct(productFromState) : null,
    );
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(!productFromState);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;
        const parsedId = Number(id);

        const hydrateFromState = () => {
            setProduct(normalizeProduct(productFromState));
            setLoading(false);
            setError("");
        };

        const fetchProduct = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await ProductsService.fetchProductById(parsedId);
                if (!isMounted) return;
                setProduct(normalizeProduct(data));
            } catch (err) {
                if (!isMounted) return;
                setProduct(null);
                setError("Product could not be loaded.");
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        if (productFromState && (!id || productFromState.id === parsedId)) {
            hydrateFromState();
            return () => {
                isMounted = false;
            };
        }

        if (Number.isNaN(parsedId)) {
            setProduct(null);
            setError("Product could not be loaded.");
            setLoading(false);
            return () => {
                isMounted = false;
            };
        }

        fetchProduct();

        return () => {
            isMounted = false;
        };
    }, [id, productFromState]);

    const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));
    const increment = () => setQuantity((prev) => Math.min(prev + 1, 99));

    const priceValue = product ? product.price : 0;

    const description = useMemo(() => {
        if (!product) {
            return "";
        }

        return (
            product.description ||
            "Up-to-date product details pulled from our catalog. Review the information below before adding to your cart."
        );
    }, [product]);

    if (loading) {
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
                            onClick={() => navigate("/products")}
                        >
                            Products
                        </button>
                        <span className="pd-breadcrumb-sep">/</span>
                        <span>Not Found</span>
                    </div>
                    <div className="pd-empty-state">
                        {error || "Product could not be loaded."}
                    </div>
                </main>
            </div>
        );
    }

    const features = [
        `${product.brand} branded product`,
        product.categoryLabel ? `Category: ${product.categoryLabel}` : null,
        product.available ? "Currently in stock" : "Temporarily unavailable",
    ].filter(Boolean);

    const tags = [
        product.categoryLabel || product.category,
        product.categorySlug,
        product.available ? "In stock" : "Notify me",
    ].filter(Boolean);

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
                        <p className="pd-price">${priceValue.toFixed(2)}</p>
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
