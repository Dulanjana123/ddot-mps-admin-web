import globalAppConfig from "@config/global-app-config";
import { CoreService } from "./CoreService";
import { ResponseData } from "@interfaces/api-response.interface";
import { MapLocation } from "@interfaces/components/map";
import { ReverseGeoCodeResponseDto } from "@interfaces/response/reverse-geocode-reseponse-dto";

class MapService extends CoreService {
    readonly REJECTION_CHARACTERS = globalAppConfig.mapApiRejectionCharacters;

    async getBaseMaps(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.axios
                .get(`${globalAppConfig.baseApiUrl}/external/map/base-maps`)
                .then((response) => {
                    const data: ResponseData<any> = response.data
                    if (data.success) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
        });
    }

    requestSearchResults = (search: string): Promise<{ success: boolean; message: string; data: any }> => {
        return new Promise((resolve, reject) => {
            this.axios
                .get(`${globalAppConfig.baseApiUrl}/external/map/search-location?searchText=${search}`)
                .then((response: any) => {
                    const data = response.data
                    if (data) {
                        resolve(data)
                    }
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    };

    requestTextSuggestions = (search: string): Promise<{ success: boolean; message: string; data: any }> => {
        return new Promise((resolve, reject) => {
            if (search !== '') {
                // check if rejection characters included
                let isRejected = false;
                this.REJECTION_CHARACTERS.forEach((char) => {
                    if (search.includes(char)) {
                        isRejected = true;
                    }
                });

                if (isRejected) {
                    resolve({ success: false, message: 'Invalid search', data: [] });
                } else {
                    this.axios
                        .get(`${globalAppConfig.baseApiUrl}/external/map/search-suggestions?searchText=${search}`)
                        .then((response: any) => {
                            const data = response.data;
                            resolve(data);
                        })
                        .catch((err) => {
                            reject(err.Message);
                        });
                }
            }
        });
    };

    async getReverseGeoCodeLocation(coordinate: MapLocation): Promise<ResponseData<ResponseData<ReverseGeoCodeResponseDto>>> {
        const coordinateReq = {
            latitude: `${coordinate.latitude}`,
            longitude: `${coordinate.longitude}`
        }
        return new Promise((resolve, reject) => {
            this.axios
                .post(`${globalAppConfig.baseApiUrl}/location/mar-v2-reverse-geocoding/`, coordinateReq)
                .then((response) => {
                    const data: ResponseData<ResponseData<ReverseGeoCodeResponseDto>> = response.data
                    if (data.success) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
        });
    }
}

export const mapService = new MapService();