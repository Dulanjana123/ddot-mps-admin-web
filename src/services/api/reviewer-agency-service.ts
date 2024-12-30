import globalAppConfig from "@config/global-app-config";
import { ResponseData } from "@interfaces/api-response.interface";
import { ReviewerAgencyDto } from "@interfaces/request/reviewer-agency-dto";
import { CoreService } from "./CoreService";
import { GetPaginatedListDto } from "@interfaces/request/paginated-list-dto";

class ReviewerAgencyService extends CoreService {
  async getReviewerAgency(
    agencyId: number
  ): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .get(`${globalAppConfig.baseApiUrl}/agency/${agencyId}`,)
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

  async createReviewerAgency(
    request: ReviewerAgencyDto
  ): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post(`${globalAppConfig.baseApiUrl}/agency`, request)
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

  async updateReviewerAgency(
    agencyId: number,
    request: ReviewerAgencyDto
  ): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .put(`${globalAppConfig.baseApiUrl}/agency/${agencyId}`, request)
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
        .post(`${globalAppConfig.baseApiUrl}/agency/paginated`, request)
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

export const reviewerAgencyService = new ReviewerAgencyService();
