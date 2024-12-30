import { useTranslation } from 'react-i18next';

//Translate form validations
const translatedFormValidation = (validationKey?: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation('formValidation');
  return validationKey ? t(validationKey) : '';
};

export default translatedFormValidation;
