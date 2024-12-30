export interface RolesPermissionsRequestDto {
    pagingAndSortingInfo: {
        paging: {
        pageNo: number;
        pageSize: number;
        };
    };
    filters?: any;
}