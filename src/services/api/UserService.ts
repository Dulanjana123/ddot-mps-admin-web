import { PaginatedRequest } from '@interfaces/shared/paging-sorting.interface';
import { PaginatedResponseData, ResponseData } from "@interfaces/api-response.interface";
import { CoreService } from "./CoreService";
import { UserResponse } from "@interfaces/response/users-response";
import globalAppConfig from "@config/global-app-config";

class UserService extends CoreService {

    async getUsersPaginated(
        request: PaginatedRequest<any>,
    ): Promise<PaginatedResponseData<UserResponse[]> | undefined> {
        return new Promise((resolve, reject) => {
            this.axios
                .post(`${globalAppConfig.baseApiUrl}/user/paginated`, request)
                .then(async (response) => {
                    const responseData: PaginatedResponseData<UserResponse[]> = response?.data;
                    if (responseData) {
                        resolve(responseData);
                    } else {
                        reject(responseData);
                    }
                });
        });
    }
}

export const userService = new UserService();