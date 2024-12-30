import { PasswordValidation } from '@interfaces/components/passwordValidation';

export const passwordValidations: PasswordValidation[] = [
  { key: 'lengthValid', message: 'PASSWORD_LENGTH_INVALID', pattern: /.{8,}/ },
  { key: 'lowercaseValid', message: 'PASSWORD_LOWER_CASE', pattern: /[a-z]/ },
  { key: 'uppercaseValid', message: 'PASSWORD_UPPER_CASE', pattern: /[A-Z]/ },
  { key: 'numberValid', message: 'PASSWORD_NUMBER_VALID', pattern: /\d/ },
  { key: 'specialCharValid', message: 'PASSWORD_SPECIAL_CHARACTER', pattern: /[!@#$%^&*(),.?":{}|<>]/ },
];
