import { ApiService } from "../../service/api-service/api.service";

const ProductsService = {
    fetchProducts: async () => {
        const res = await ApiService.get("/products");
        return res.data;
    },

    fetchProductById: async (id) => {
        const res = await ApiService.get(`/products/${id}`);
        return res.data;
    },
};

export default ProductsService;
