import { UserRole } from '@enums/UserRole';

export const hasRequiredRole = (userRole: UserRole, requiredRoles: UserRole[]) => {
  if (requiredRoles.length === 0) {
    return true;
  }
  return requiredRoles.includes(userRole);
};
