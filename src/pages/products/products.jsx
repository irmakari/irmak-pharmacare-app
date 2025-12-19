import React, { useEffect, useMemo, useState } from "react";
import { TabNavigator } from "../../components/tab-navigator";
import "./products.css";

import ProductsHeader from "../../components/products-header/productsHeader";
import ProductsToolBar from "../../components/products-toolbar/productsToolBar";

import ProductGrid from "../../components/product-grid/productGrid";

import ProductsService from "../../collections/products-service/products.service";
import ProductsFilterPanel from "../../components/products-filterpanel/productsFilterPanel";
import { normalizeProduct } from "../../utils/product";

const PRICE_OPTIONS = [
    "Price: Low → High",
    "Price: High → Low",
    "Price: Newest",
    "Price: Popular",
];

const DEFAULT_PRICE_OPTION = PRICE_OPTIONS[0];

const toggleInArray = (arr, value) =>
    arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [draftCategories, setDraftCategories] = useState([]);
    const [draftBrands, setDraftBrands] = useState([]);
    const [draftPriceOption, setDraftPriceOption] = useState(DEFAULT_PRICE_OPTION);

    const [appliedCategories, setAppliedCategories] = useState([]);
    const [appliedBrands, setAppliedBrands] = useState([]);
    const [appliedPriceOption, setAppliedPriceOption] = useState(DEFAULT_PRICE_OPTION);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await ProductsService.fetchProducts();
                if (!isMounted) return;

                const normalized = (response || []).map(normalizeProduct);
                setProducts(normalized);
            } catch (err) {
                if (!isMounted) return;
                setError("Products could not be loaded.");
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    const categoryOptions = useMemo(() => {
        const slugs = new Set();
        products.forEach((p) => p.categorySlug && slugs.add(p.categorySlug));
        return Array.from(slugs).sort();
    }, [products]);

    const brandOptions = useMemo(() => {
        const brands = new Set();
        products.forEach((p) => p.brand && brands.add(p.brand));
        return Array.from(brands).sort();
    }, [products]);

    const onToggleCategory = (category) =>
        setDraftCategories((prev) => toggleInArray(prev, category));

    const onToggleBrand = (brand) =>
        setDraftBrands((prev) => toggleInArray(prev, brand));

    const onApply = () => {
        setAppliedCategories(draftCategories);
        setAppliedBrands(draftBrands);
        setAppliedPriceOption(draftPriceOption);
    };

    const onReset = () => {
        setDraftCategories([]);
        setDraftBrands([]);
        setDraftPriceOption(DEFAULT_PRICE_OPTION);

        setAppliedCategories([]);
        setAppliedBrands([]);
        setAppliedPriceOption(DEFAULT_PRICE_OPTION);
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (appliedCategories.length > 0) {
            result = result.filter((p) => appliedCategories.includes(p.categorySlug));
        }

        if (appliedBrands.length > 0) {
            result = result.filter((p) => appliedBrands.includes(p.brand));
        }

        if (appliedPriceOption === "Price: Low → High") {
            result.sort((a, b) => a.price - b.price);
        } else if (appliedPriceOption === "Price: High → Low") {
            result.sort((a, b) => b.price - a.price);
        } else if (appliedPriceOption === "Price: Newest") {
            result.sort((a, b) => (b.id || 0) - (a.id || 0));
        } else if (appliedPriceOption === "Price: Popular") {
            
        }

        return result;
    }, [appliedCategories, appliedBrands, appliedPriceOption, products]);

    const renderGrid = () => {
        if (loading) {
            return <div className="products-loading">Loading products...</div>;
        }

        if (error) {
            return <div className="products-error">{error}</div>;
        }

        return <ProductGrid items={filteredProducts} />;
    };

    return (
        <div className="products-page">
            <TabNavigator />

            <main className="products-wrapper">
                <ProductsHeader />

                <div className="products-content">
                    <ProductsFilterPanel
                        categories={categoryOptions}
                        brands={brandOptions}
                        priceOptions={PRICE_OPTIONS}
                        selectedCategories={draftCategories}
                        selectedBrands={draftBrands}
                        selectedPriceOption={draftPriceOption}
                        onToggleCategory={onToggleCategory}
                        onToggleBrand={onToggleBrand}
                        onChangePriceOption={setDraftPriceOption}
                        onApply={onApply}
                        onReset={onReset}
                    />

                    <section className="products-main">
                        <ProductsToolBar />
                        {renderGrid()}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Products;
