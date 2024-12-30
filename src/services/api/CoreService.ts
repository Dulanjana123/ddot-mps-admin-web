import { ApiInterceptor } from '@config/interceptors/apiInterceptor';
import { AxiosInstance } from 'axios';

export class CoreService {
  protected axios: AxiosInstance;

  constructor() {
    this.axios = ApiInterceptor.getInstance().axios;
  }
}
