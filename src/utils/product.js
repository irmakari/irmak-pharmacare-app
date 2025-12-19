export const formatCategorySlug = (slug = "") => {
    if (!slug) return "";

    return slug
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
};

export const normalizeProduct = (product = {}) => {
    const price = Number(product.price ?? 0);

    return {
        ...product,
        price: Number.isFinite(price) ? price : 0,
        available: product.available ?? true,
        categoryLabel: formatCategorySlug(product.categorySlug || product.category || ""),
    };
};
