import { SystemMessageTypes } from "@enums/components/SystemMessageEnum";
import { setSystemMessage } from "@store/reducers/systemMessageSlice";
import { store } from "@store/store";
import axios, { AxiosInstance } from "axios";

export class ApiInterceptor {

  public axios: AxiosInstance = axios.create();
  private static instance: ApiInterceptor;
  private getAccessToken: (() => Promise<string | null>) | null = null;

  private constructor() {
    this.initRequest();
    this.initResponse();
  }

  public static getInstance(): ApiInterceptor {
    if (!ApiInterceptor.instance) {
      ApiInterceptor.instance = new ApiInterceptor();
    }
    return ApiInterceptor.instance;
  }

  public setTokenRetrieval(getAccessToken: () => Promise<string | null>) {
    this.getAccessToken = getAccessToken;
  }

  private initRequest() {
    this.axios.interceptors.request.use(
      async (config) => {
        if (this.getAccessToken) {
          try {
            const token = await this.getAccessToken();
            if (token) {
              config.headers["Authorization"] = `Bearer ${token}`;
            }
            config.headers["x-origin-strategy"] = "department-portal"; // this header is using in BFF to identify the request origin (department portal or client portal). This is static value.
          } catch (error) {
            console.error("Error retrieving token:", error); // need to remove after finalized the MSAL integration
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(new Error(error));
      }
    );
  }

  private initResponse() {
    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        //Global response error handling
        store.dispatch(
          setSystemMessage({
            type: SystemMessageTypes.Error,
            message: error.response?.data?.message ?? error.response,
          })
        );
        return Promise.reject(error);
      }
    );
  }
}
