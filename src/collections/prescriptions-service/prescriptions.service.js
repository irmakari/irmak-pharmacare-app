import { ApiService } from "../../service/api-service/api.service";

const PrescriptionsService = {
    fetchByCode: async (code) => {
        const response = await ApiService.get("/prescriptions", {
            params: { code },
        });
        return response.data;
    },
};

export default PrescriptionsService;
