import globalAppConfig from "@config/global-app-config";
import { CoreService } from "./CoreService";
import { UserInteractionType } from "@enums/UserInteractionType";
import { authDatService } from "@services/data/AuthDataService";

class LoginHistoryService extends CoreService {
  createLoginHistory = async (payload: {
    userintractionid: UserInteractionType;
    ipAddress: string;
  }): Promise<{ success: boolean; message: string }> => {
    const userEmail = authDatService.emailAddress;
    const timestamp = new Date().toISOString();
    const userAgent = navigator.userAgent;

    return new Promise((resolve, reject) => {
      this.axios
        .post(
          `${globalAppConfig.baseApiUrl}/loginHistory/create-login-history`,
          {
            userEmail,
            timestamp,
            ...payload,
          },
          {
            headers: {
              ipAddress: payload.ipAddress,
              agent: userAgent,
            },
          }
        )
        .then(async (response: any) => {
          const { success, message } = response.data;
          resolve({ success, message });
        })
        .catch((err) => {
          reject(err.response.data.message);
        });
    });
  };
}

export const loginHistoryService = new LoginHistoryService();
