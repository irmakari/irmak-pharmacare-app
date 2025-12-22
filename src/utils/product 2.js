import minosetImage from "../images/minoset.png";

export const formatCategorySlug = (slug = "") => {
    if (!slug) return "";

    return slug
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
};

const PRODUCT_IMAGE_MAP = {
    202: minosetImage, // Minoset
};

export const normalizeProduct = (product = {}) => {
    const price = Number(product.price ?? 0);

    return {
        ...product,
        price: Number.isFinite(price) ? price : 0,
        available: product.available ?? true,
        categoryLabel: formatCategorySlug(product.categorySlug || product.category || ""),
        imageUrl: product.imageUrl || product.image || PRODUCT_IMAGE_MAP[product.id] || "",
    };
};
