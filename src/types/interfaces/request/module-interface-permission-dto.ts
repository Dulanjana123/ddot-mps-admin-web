export interface ModuleUIDto {
  moduleId: number;
  code: string;
  name: string;
  description?: string;
  sortId?: number;
  isActive?: boolean;
  interfaces: InterfaceUIDto[];
}

export interface InterfaceUIDto {
  interfaceId: number;
  name: string;
  code: string;
  hasCreate: boolean;
  create: boolean;
  hasRead: boolean;
  read: boolean;
  hasUpdate: boolean;
  update: boolean;
  hasDeactivate: boolean;
  deactivate: boolean;
  sortId?: number;
  permissions: PermissionUIDto[];
}

export interface PermissionUIDto {
  permissionId: number;
  code: string;
  name?: string;
  description?: string;
  sortId?: number;
  isCrud?: boolean;
  isActive?: boolean;
  moduleInterfacePermissionId: number;
}

export interface RoleDetailsWithPermissionsDto {
  code: string;
  name: string;
  description?: string;
  sortId: number;
  userGroupId: number;
  isActive?: boolean;
  permissions: number[];
}
