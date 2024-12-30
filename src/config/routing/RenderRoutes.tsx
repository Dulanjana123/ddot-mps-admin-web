import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useCallback, useEffect } from "react";
import { AuthenticatedTemplate, useAccount, useMsal } from "@azure/msal-react";
import { EventType, InteractionRequiredAuthError } from "@azure/msal-browser";
import { b2cPolicies, protectedScopes } from "@config/auth-config";
import globalAppConfig from "@config/global-app-config";
import { ApiInterceptor } from "@config/interceptors/apiInterceptor";

interface RenderRoutesProps {
  routes: any;
}

const RenderRoutes: React.FC<RenderRoutesProps> = ({ routes }) => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const tokenRequest = {
    scopes: [`${globalAppConfig.msalB2CDepartmentScope}`],
  };

  useEffect(() => {
    const callbackId = instance.addEventCallback((event: any) => {
      if (event.eventType === EventType.LOGIN_FAILURE) {
        if (event.error && event.error.errorMessage.includes("AADB2C90118")) {
          let signInFlowRequest = {
            authority: b2cPolicies.authorities.signIn.authority,
            scopes: [...protectedScopes],
          };
          instance.loginRedirect(signInFlowRequest);
        }
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
    // eslint-disable-next-line
  }, [instance]);

  // Create a function to retrieve access token
  const getAccessToken = useCallback(async () => {
    if (account) {
      try {
        const response = await instance.acquireTokenSilent({
          ...tokenRequest,
          account: account,
        });
        return response.accessToken;
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          await instance.acquireTokenRedirect(tokenRequest);
        } else {
          console.error("Error acquiring token:", error);
        }
      }
    }
    return null;
  }, [account, instance]);

  // Initialize the interceptor and pass the token retrieval function
  useEffect(() => {
    ApiInterceptor.getInstance().setTokenRetrieval(getAccessToken);
  }, [getAccessToken]);

  const renderRoute = (route: any, parentAuth: any[] = []): any => {
    const auth = route.auth !== undefined ? route.auth : parentAuth;

    let Element;
    if (route.element) {
      if (auth?.length !== 0) {
        Element = (
          <AuthenticatedTemplate>
            <ProtectedRoute auth={auth}>{route.element}</ProtectedRoute>
          </AuthenticatedTemplate>
        );
      } else {
        Element = route.element;
      }
    } else {
      Element = <Outlet />;
    }

    const routeConfig: any = {
      path: route.path,
      element: route.layout ? <route.layout>{Element}</route.layout> : Element,
    };

    if (route.children) {
      routeConfig.children = route.children.map((childRoute: any) =>
        renderRoute(childRoute, auth)
      );
    }

    return routeConfig;
  };

  const router = createBrowserRouter(
    routes.map((route: any) => renderRoute(route))
  );

  return <RouterProvider router={router} />;
};

export default RenderRoutes;
