import globalAppConfig from "@config/global-app-config";
import { PaginatedResponseData, ResponseData } from "@interfaces/api-response.interface";
import { CoreService } from "./CoreService";
import { GetPaginatedListDto } from "@interfaces/request/paginated-list-dto";
import { EwrAssignInfoResponseDto, EwrIndexFiltersInfoResponseDto, EwrResponseDto } from "@interfaces/response/ewr-response-dto";
import { DateRangeDto } from "@interfaces/request/date-range-dto";
import { EwrDashboardResponseDto } from "@interfaces/response/ewr-response-dto";
import { EwrAssignDto, EwrBulkAssignDto } from "@interfaces/request/ewr-assign-dto";
import { AxiosResponse } from "axios";
import { EwrFiltersDto } from "@interfaces/request/ewr-filters-dto";

class EwrService extends CoreService {

  async getById(
    id: number
  ): Promise<ResponseData<EwrResponseDto>> {
    return new Promise((resolve, reject) => {
      this.axios
        .get(`${globalAppConfig.baseApiUrl}/ewr/${id}`)
        .then(async (response: any) => {
          const responseData: ResponseData<EwrResponseDto> = response?.data?.data;
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
        .post(`${globalAppConfig.baseApiUrl}/ewr/paginated`, request)
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

  async getConflictedList(
    request: EwrFiltersDto
  ): Promise<PaginatedResponseData<EwrResponseDto>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post(`${globalAppConfig.baseApiUrl}/ewr/paginated`, request)
        .then(async (response: any) => {
          const responseData: PaginatedResponseData<EwrResponseDto> = response?.data;
          if (responseData) {
            resolve(responseData);
          } else {
            reject(response?.response?.data);
          }
        });
    });
  }

  async getByLocation(
    request: EwrFiltersDto
  ): Promise<PaginatedResponseData<EwrResponseDto>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post(`${globalAppConfig.baseApiUrl}/ewr/location`, request)
        .then(async (response: any) => {
          const responseData: PaginatedResponseData<EwrResponseDto> = response?.data;
          if (responseData) {
            resolve(responseData);
          } else {
            reject(response?.response?.data);
          }
        });
    });
  }

  async getDashboardData(request: DateRangeDto): Promise<ResponseData<EwrDashboardResponseDto>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post(`${globalAppConfig.baseApiUrl}/ewr/dashboard`, request)
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

  async getAssigningInfo(): Promise<ResponseData<EwrAssignInfoResponseDto>> {
    return new Promise((resolve, reject) => {
      this.axios
        .get(`${globalAppConfig.baseApiUrl}/ewr/assign/info`)
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

  async updateEwrAssigning(
    ewrId: number,
    request: EwrAssignDto
  ): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .put(`${globalAppConfig.baseApiUrl}/ewr/assign/${ewrId}`, request)
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

  async updateEwrBulkAssigning(
    request: EwrBulkAssignDto
  ): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .put(`${globalAppConfig.baseApiUrl}/ewr/assign/bulk`, request)
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

  async getIndexFiltersInfo(): Promise<ResponseData<EwrIndexFiltersInfoResponseDto>> {
    return new Promise((resolve, reject) => {
      this.axios
        .get<ResponseData<EwrIndexFiltersInfoResponseDto>>(`${globalAppConfig.baseApiUrl}/ewr/filters/info`)
        .then(async (response: AxiosResponse<ResponseData<EwrIndexFiltersInfoResponseDto>>) => {
          const responseData: ResponseData<EwrIndexFiltersInfoResponseDto> = response?.data;
          if (responseData) {
            resolve(responseData);
          } else {
            reject(response?.data);
          }
        });
    });
  }
}

export const ewrService = new EwrService();
