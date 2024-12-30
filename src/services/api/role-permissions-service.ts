import globalAppConfig from "@config/global-app-config";
import { ResponseData } from "@interfaces/api-response.interface";
import { CoreService } from "./CoreService";
import { UserGroupDto } from "@interfaces/request/user-role-dto";
import { ModuleDto } from "@interfaces/request/role-permissions-dto";
import {
  ModuleUIDto,
  RoleDetailsWithPermissionsDto,
} from "@interfaces/request/module-interface-permission-dto";
import { RolesPermissionsRequestDto } from "@interfaces/request/roles-paginated-dto";

class RolePermissionsService extends CoreService {
  async getUserGroups(): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .get(`${globalAppConfig.baseApiUrl}/role-permissions/user-group/simple`)
        .then(async (response: any) => {
          const responseData: ResponseData<UserGroupDto[]> = response?.data;
          if (responseData) {
            resolve(responseData);
          } else {
            reject(response?.response?.data);
          }
        });
    });
  }

  async getNextRoleCode(): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .get(`${globalAppConfig.baseApiUrl}/role-permissions/role/next-code`)
        .then(async (response: any) => {
          const responseData: ResponseData<string> = response?.data;
          if (responseData) {
            resolve(responseData);
          } else {
            reject(response?.response?.data);
          }
        });
    });
  }

  async getModulePermissions(): Promise<ResponseData<ModuleUIDto[]>> {
    return new Promise((resolve, reject) => {
      this.axios
        .get<ResponseData<ModuleUIDto[]>>(
          `${globalAppConfig.baseApiUrl}/role-permissions`
        )
        .then((response) => {
          const responseData = response?.data;
          if (responseData) {
            resolve(responseData);
          } else {
            reject(response?.data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async createRolePermissions(
    request: RoleDetailsWithPermissionsDto
  ): Promise<ResponseData<any>> {
    return new Promise((resolve, reject) => {
      this.axios
        .post(`${globalAppConfig.baseApiUrl}/role-permissions`, request)
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

  async getRolePermissionsPaginated(request: RolesPermissionsRequestDto) {
    return new Promise((resolve, reject) => {
      this.axios
        .post(`${globalAppConfig.baseApiUrl}/role-permissions/role/paginated`, request)
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

export const rolePermissionsService = new RolePermissionsService();
