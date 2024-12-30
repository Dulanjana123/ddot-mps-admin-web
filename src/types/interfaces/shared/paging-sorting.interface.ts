export interface GenericSearch {
  pagingAndSortingInfo: PagingAndSortingInfo;
}

export interface PaginatedRequest<T> {
  pagingAndSortingInfo: PagingAndSortingInfo;
  filters: T
}

export interface PagingAndSortingInfo {
  paging: PagingInfo;
  // sorting: SortingInfoCollection; // TODO: Implement when SortingInfoCollection is defined
}

export interface PagingInfo {
  pageNo: number;
  pageSize: number;
}

export interface SortingInfo {
  columnName: string;
  sortOrder: string;
}
