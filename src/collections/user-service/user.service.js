import { ApiService } from "../../service/api-service/api.service";

class UserService {
    static usersPath = "/users";

    static async fetchUsers() {
        const response = await ApiService.get(this.usersPath);
        return response.data;
    }
}

export default UserService;