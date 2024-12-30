import {
   CalendarDatesSelectionDto,
   PdrmExclusionTimeSlotsResponse,
   PdrmFetchSettingsDto,
} from "@interfaces/response/pdrm-settings-response-dto";
import { CoreService } from "./CoreService";
import { ResponseData } from "@interfaces/api-response.interface";
import globalAppConfig from "@config/global-app-config";
import { PdrmExclusionTimeSlotsDto, PdrmSettingsAvailableTimeBlocksSelectionDto } from "@interfaces/request/pdrm-settings-available-time-blocks-selection";

class PdrmSettingsService extends CoreService {
   async getSettings(meetingTypeId: number): Promise<ResponseData<PdrmFetchSettingsDto>> {
      return new Promise((resolve, reject) => {
         this.axios
            .get(`${globalAppConfig.baseApiUrl}/meeting-settings/${meetingTypeId}`)
            .then(async (response: any) => {
               const responseData: ResponseData<PdrmFetchSettingsDto> = response?.data?.data;
               if (responseData) {
                  resolve(responseData);
               } else {
                  reject(response?.response?.data);
               }
            });
      });
   }

   async saveSettings(data: any): Promise<ResponseData<CalendarDatesSelectionDto>> {
      return new Promise((resolve, reject) => {
         this.axios
            .post(`${globalAppConfig.baseApiUrl}/meeting-settings/calendar-dates-selection`, data)
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

   async saveTimeBlocks(data: any): Promise<ResponseData<PdrmSettingsAvailableTimeBlocksSelectionDto>> {
      return new Promise((resolve, reject) => {
         this.axios
            .post(`${globalAppConfig.baseApiUrl}/meeting-settings/time-blocks-selection`, data)
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

   async getExclusionTimeSlots(meetingTypeId: number, date: string): Promise<ResponseData<PdrmExclusionTimeSlotsResponse>> {
      return new Promise((resolve, reject) => {
         this.axios
            .get(`${globalAppConfig.baseApiUrl}/meeting-settings/calendar-exclusion-dates/${meetingTypeId}/${date}`)
            .then(async (response: any) => {
               const responseData: ResponseData<PdrmExclusionTimeSlotsResponse> = response?.data?.data;
               if (responseData) {
                  resolve(responseData);
               } else {
                  reject(response?.response?.data);
               }
            });
      });
   }

   async saveExclusionTimeBlocks(data: any): Promise<ResponseData<PdrmExclusionTimeSlotsDto>> {
      return new Promise((resolve, reject) => {
         this.axios
            .post(`${globalAppConfig.baseApiUrl}/meeting-settings/calendar-exclusion-dates`, data)
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

export const pdrmSettingsService = new PdrmSettingsService();
