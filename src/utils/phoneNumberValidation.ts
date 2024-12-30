export function isUSMobileNoValid(mobileNo: string) {
  const mobileRegex = /^(\([2-9][0-8]\d\)|[2-9][0-8]\d)[- .]?\d{3}[- .]?\d{4}(?: ext\.?(\d{1,5}))?$/;
  return mobileRegex.test(mobileNo);
}

// convert (878) 205-0088 -> 8782050088
export function convertMobileNo(mobileNo: string) {
  return mobileNo.replace(/\D/g, '');
}
