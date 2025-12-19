import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProductDetailsCard } from "../../components/product-details-card";
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

    const description = useMemo(() => {
        if (!product) {
            return "";
        }

        return (
            product.description ||
            "Up-to-date product details pulled from our catalog. Review the information below before adding to your cart."
        );
    }, [product]);

    const features = product
        ? [
              `${product.brand} branded product`,
              product.categoryLabel ? `Category: ${product.categoryLabel}` : null,
              product.available ? "Currently in stock" : "Temporarily unavailable",
          ].filter(Boolean)
        : [];

    const tags = product
        ? [
              product.categoryLabel || product.category,
              product.categorySlug,
              product.available ? "In stock" : "Notify me",
          ].filter(Boolean)
        : [];

    return (
        <ProductDetailsCard
            product={product}
            quantity={quantity}
            description={description}
            features={features}
            tags={tags}
            loading={loading}
            errorMessage={error}
            onBack={() => navigate("/products")}
            onIncrement={increment}
            onDecrement={decrement}
        />
    );
};

export default ProductDetails;
