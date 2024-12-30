interface GlobalAppConfig {
  baseApiUrl: string;
  otpResendTime: number;
  jwtSecretKey: string;
  sessiontimeoutInit: number;
  sessiontimeout: number;
  muiProLicenseKey: string;
  signalRApiUrl: string;

  b2cDomain: string;
  b2cPolicy: string;
  b2cClientId: string;
  b2cRedirectUrl: string;

  mapSearchAndAutocompleteBaseUrl: string;
  mapSearchPath: string;
  mapSearchAndAutocompleteApiKey: string;
  mapAutocompletePath: string;
  arcgisPrintServerUrl: string;
  mapApiRejectionCharacters: string[];

  msalB2CPolicySignin: string;
  msalB2CAuthSignInAuthority: string;
  msalB2CAuthorityDomain: string;
  msalB2CClientId: string;
  msalB2CRedirectUri: string;
  msalB2CPostLogoutRedirectUri: string;
  msalB2CDepartmentScope: string;


}

const globalAppConfig: GlobalAppConfig = {
  baseApiUrl: process.env.REACT_APP_BASE_API_URL ?? "",
  otpResendTime: parseInt(process.env.VITE_OTP_RESEND_TIME ?? "") ?? 60,
  jwtSecretKey: process.env.VITE_JWT_SECRET_KEY ?? "",
  sessiontimeoutInit: parseInt(process.env.VITE_SESSION_TIMEOUT_INIT_TIME ?? "") ?? 60,
  sessiontimeout: parseInt(process.env.VITE_SESSION_TIMEOUT_TIME ?? "") ?? 60,
  muiProLicenseKey: process.env.REACT_APP_MUI_PRO_LICENSE_KEY ?? "",
  signalRApiUrl: process.env.REACT_APP_SIGNALR_SERVICE_URL ?? "",

  b2cDomain: process.env.REACT_APP_B2C_DOMAIN ?? "",
  b2cPolicy: process.env.REACT_APP_B2C_POLICY ?? "",
  b2cClientId: process.env.REACT_APP_B2C_CLIENT_ID ?? "",
  b2cRedirectUrl: process.env.REACT_APP_B2C_REDIRECT_URL ?? "",

  mapSearchAndAutocompleteBaseUrl: process.env.REACT_APP_MAP_SEARCH_AND_AUTOCOMPLETE_BASE_URL ?? "",
  mapSearchPath: process.env.REACT_APP_MAP_SEARCH_PATH ?? "",
  mapSearchAndAutocompleteApiKey: process.env.REACT_APP_MAP_SEARCH_AND_AUTOCOMPLETE_API_KEY ?? "",
  mapAutocompletePath: process.env.REACT_APP_MAP_AUTOCOMPLETE_PATH ?? "",
  arcgisPrintServerUrl: process.env.REACT_APP_ARCGIS_PRINT_SERVER_URL ?? "",
  mapApiRejectionCharacters: process.env.REACT_APP_MAP_API_REJECTION_CHARACTERS?.split(',') ?? ['/'],

  msalB2CPolicySignin: process.env.REACT_APP_B2C_POLICIES_NAMES_SIGNIN ?? "",
  msalB2CAuthSignInAuthority: process.env.REACT_APP_B2C_POLICIES_SIGNIN_AUTHORITY ?? "",
  msalB2CAuthorityDomain: process.env.REACT_APP_B2C_POLICIES_AUTHORITY_DOMAIN ?? "",
  msalB2CClientId: process.env.REACT_APP_MSAL_CONFIG_AUTH_CLIENT_ID ?? "",
  msalB2CRedirectUri: process.env.REACT_APP_MSAL_CONFIG_AUTH_REDIRECT_URI ?? "",
  msalB2CPostLogoutRedirectUri: process.env.REACT_APP_MSAL_CONFIG_AUTH_POST_LOGOUT_REDIRECT_URI ?? "",
  msalB2CDepartmentScope: process.env.REACT_APP_MSAL_CONFIG_DEPARTMENT_SCOPE ?? "",
  
};

export default globalAppConfig;
