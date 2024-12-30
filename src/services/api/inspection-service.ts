import globalAppConfig from "@config/global-app-config";
import { ResponseData } from "@interfaces/api-response.interface";
import { InspectionDto } from "@interfaces/request/ewr-inspection-dto";
import { GetPaginatedListDto } from "@interfaces/request/paginated-list-dto";
import { CoreService } from "./CoreService";
import { InspectionResponseDto } from "@interfaces/response/inspection-response-dto";

class InspectionService extends CoreService {
  async getInspection(
    inspectionId: number
  ): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .get(`${globalAppConfig.baseApiUrl}/inspection/${inspectionId}`,)
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

  async createInspection(
    request: InspectionDto
  ): Promise<ResponseData<InspectionResponseDto>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post(`${globalAppConfig.baseApiUrl}/inspection`, request)
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

  async updateInspection(
    id: number,
    request: InspectionDto
  ): Promise<ResponseData<InspectionResponseDto>> {
    return new Promise((resolve, reject) => {
      this.axios
        .put(`${globalAppConfig.baseApiUrl}/inspection/${id}`, request)
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

  async getPaginatedList(
    request: GetPaginatedListDto
  ): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post(`${globalAppConfig.baseApiUrl}/inspection/paginated`, request)
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

export const inspectionService = new InspectionService();
