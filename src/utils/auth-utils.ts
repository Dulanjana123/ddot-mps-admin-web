import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string): any => {
  return jwtDecode(token);
};
