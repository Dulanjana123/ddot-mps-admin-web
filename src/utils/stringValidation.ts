export const isNullOrEmpty = (text?: string | null): boolean => {
  return text == null || text.trim() === '';
};

export const isEqualTo = (string1: string | null, string2: string | null, checkCase: boolean = true): boolean => {
  if (!string1 || !string2) return false;

  if (checkCase) {
    return string1 === string2;
  } else {
    return string1.toLowerCase() === string2.toLowerCase();
  }
};

/**
 * Converts a phone number from (XXX) XXX-XXXX format to +XXXXXXXXXXX format
 * @param mobileNumber - The mobile number in (XXX) XXX-XXXX format
 * @returns - The mobile number in +XXXXXXXXXXX format or null if invalid
 */
export const convertToValidMobileNumber = (mobileNumber: string): string | null => {
  const cleanedNumber = mobileNumber.replace(/\D/g, '');

  // converted to US numbers with adding +1. Need to implement this to dynamic value
  const internationalNumber = `+1${cleanedNumber}`;

  if (internationalNumber.length < 10) {
    return null;
  }

  return internationalNumber;
};
