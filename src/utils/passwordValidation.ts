import { passwordValidations } from '@constants/password-validations';

export const isPasswordValid = (password: string) => {
  return passwordValidations.every((validation) => validation.pattern.test(password));
};
