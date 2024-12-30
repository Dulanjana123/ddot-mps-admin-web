import globalAppConfig from "@config/global-app-config";
import { ResponseData } from "@interfaces/api-response.interface";
import { SwoResponseDto, SwoViolationTypesResponseDto } from "@interfaces/response/swo-response-dto";
import { CoreService } from "./CoreService";
import { SWORequestDto } from "@interfaces/request/swo-dto";

class SwoService extends CoreService {
  async getViolationTypes(): Promise<ResponseData<SwoViolationTypesResponseDto>> {
    return new Promise((resolve, reject) => {
      this.axios
        .get(`${globalAppConfig.baseApiUrl}/swo/violation-types`)
        .then(async (response: any) => {
          const responseData: ResponseData<any> = response?.data;
          if (responseData) {
            resolve(responseData);
          } else {
            reject(response?.response?.data);
          }
        });
    });
  }

  async createSWO(
    request: SWORequestDto
  ): Promise<ResponseData<SwoResponseDto>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post(`${globalAppConfig.baseApiUrl}/swo`, request)
        .then(async (response: any) => {
          const responseData: ResponseData<any> = response?.data;
          if (responseData) {
            resolve(responseData);
          } else {
            reject(response?.response?.data);
          }
        });
    });
  }

  async updateSwo(
    swoId: number,
    request: SWORequestDto
  ): Promise<ResponseData<SwoResponseDto>> {
    return new Promise((resolve, reject) => {
      this.axios
        .put(`${globalAppConfig.baseApiUrl}/swo/${swoId}`, request)
        .then(async (response: any) => {
          const responseData: ResponseData<any> = response?.data;
          if (responseData) {
            resolve(responseData);
          } else {
            reject(response?.response?.data);
          }
        });
    });
  }
}

export const swoService = new SwoService();
