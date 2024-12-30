import { ResponseData } from "@interfaces/api-response.interface";
import { CoreService } from "./CoreService";
import globalAppConfig from "@config/global-app-config";
import {
  DatagridStateDto,
  DatagridStateRequest,
} from "@interfaces/request/datagrid-state-dto";

class DatagridStateService extends CoreService {
  async getDatagridStateById(
    settingsGridStateId: number
  ): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .get(
          `${globalAppConfig.baseApiUrl}/datagridstate/${settingsGridStateId}`
        )
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

  async createDatagridState(
    request: DatagridStateDto
  ): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post(`${globalAppConfig.baseApiUrl}/datagridstate`, request)
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

  async updateDatagridState(
    settingsGridStateId: number,
    request: DatagridStateDto
  ): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .put(
          `${globalAppConfig.baseApiUrl}/datagridstate/${settingsGridStateId}`,
          request
        )
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

  async getDatagridStateByUserAndInterface(
    request: DatagridStateRequest
  ): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post(`${globalAppConfig.baseApiUrl}/datagridstate/datagrid`, request)
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

export const datagridStateService = new DatagridStateService();
