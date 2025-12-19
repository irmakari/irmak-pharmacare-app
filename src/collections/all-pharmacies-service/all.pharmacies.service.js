import { ApiService } from "../../service/api-service/api.service";

const AllPharmaciesService = {
    fetchAllPharmacies: async () => {
        const res = await ApiService.get("/pharmacies");
        return res.data;
    },

    fetchPharmacyById: async (id) => {
        const res = await ApiService.get(`/pharmacies/${id}`);
        return res.data;
    },
};

export default AllPharmaciesService;