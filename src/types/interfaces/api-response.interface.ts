import { Pagination } from "reactstrap";

export interface ResponseData<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponseData<T> {
  success: boolean;
  message: string;
  data: {
    entities: T[],
    pagination: {
      length: number,
      pageSize: number
    }
  };
}
