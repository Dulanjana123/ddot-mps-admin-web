export interface GetPaginatedListDto {
  pagingAndSortingInfo: {
    paging: {
      pageNo: number;
      pageSize: number;
    };
  };
  filters?: any;
}
