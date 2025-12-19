import { ApiService } from "../../service/api-service/api.service";

const RecommendedProductsService = {
    fetchRecommendedProducts: async () => {
        const res = await ApiService.get("/recommendedProducts");
        return res.data;
    },
};

export default RecommendedProductsService;