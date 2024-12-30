export interface DatagridStateDto {
  userId?: number;
  interfaceId?: number;
  gridObjectJson?: string;
  isActive?: boolean;
}

export interface DatagridStateRequest {
  userId: number;
  interfaceId: number;
}
