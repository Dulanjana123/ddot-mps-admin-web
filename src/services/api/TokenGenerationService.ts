import globalAppConfig from "@config/global-app-config";
import { CoreService } from "./CoreService";
import exp from "constants";
import { AccessTokenResponse } from "src/app/types/interfaces/response/access-token-response";

class TokenGenerationService extends CoreService {

    fetchGeneratedToken = async (email: string) : Promise<{ success: boolean; message: string, data: AccessTokenResponse }> => {

        return new Promise((resolve, reject) => {
            this.axios
                .get(
                    `${globalAppConfig.baseApiUrl}/auth/generate-token?email=${email}`
                )
                .then(async (response: any) => {
                    const { success, message, data } = response.data;
                    resolve({ success, message, data });
                })
                .catch((err) => {
                    reject(err.response.data.message);
                });
    });
    }

}

export const tokenGenerationService = new TokenGenerationService();