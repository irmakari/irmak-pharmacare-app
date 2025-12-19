import { ApiService } from "../../service/api-service/api.service";

const NightPharmaciesService = {
    fetchNightPharmacies: async () => {
        const res = await ApiService.get("/pharmacies?isNightDuty=true");
        return res.data;
    },
};

export default NightPharmaciesService;