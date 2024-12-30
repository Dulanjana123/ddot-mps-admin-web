import { LogLevel } from "@azure/msal-browser";
import globalAppConfig from "./global-app-config";

export const b2cPolicies = {
    names: {
        signIn: globalAppConfig.msalB2CPolicySignin
    },
    authorities: {
        signIn: {
            authority: globalAppConfig.msalB2CAuthSignInAuthority,
        }
    },
    authorityDomain: globalAppConfig.msalB2CAuthorityDomain,
};

export const msalConfig = {
    auth: {
        clientId: globalAppConfig.msalB2CClientId,
        authority: b2cPolicies.authorities.signIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: globalAppConfig.msalB2CRedirectUri,
        postLogoutRedirectUri: globalAppConfig.msalB2CPostLogoutRedirectUri,
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if (containsPii) {
                    return;
                }

                // below console.logs should be removed later
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

export const protectedScopes = [globalAppConfig.msalB2CDepartmentScope];

export const loginRequest = {
    scopes: [...protectedScopes],
};
