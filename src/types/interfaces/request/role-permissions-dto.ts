export interface ModuleDto {
  moduleId: number;
  code: string;
  name: string;
  description?: string;
  sortId?: number;
  isActive?: boolean;
  otherPermissions: PermissionDto[];
  interfaces: PermissionDto[];
}

export interface PermissionDto {
  permissionId: number;
  code: string;
  name?: string;
  description?: string;
  sortId?: number;
  checked: boolean;
}
