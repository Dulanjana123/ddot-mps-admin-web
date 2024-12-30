import { MsalProvider } from "@azure/msal-react";
import globalAppConfig from "@config/global-app-config";
import RenderRoutes from "@config/routing/RenderRoutes";
import { appRoutes } from "@config/routing/routesConfig";
import {
  HorizontalPosition,
  VerticalPosition,
} from "@enums/components/snackbar-enum";
import CdPageLoader from "@molecules/PageLoading/CdPageLoader";
import { LicenseInfo } from "@mui/x-license";
import { AuthProvider } from "@store/context/AuthContext";
import { ConfirmProvider } from "@utils/confirm-navigation/ConfirmProvider";
import IPInfo from "ip-info-react";
import { SnackbarProvider } from "notistack";
import { Suspense } from "react";
LicenseInfo.setLicenseKey(globalAppConfig.muiProLicenseKey);

function App({instance}) {
  return (
    <IPInfo>
      <MsalProvider instance={instance}>
        <AuthProvider>
          <SnackbarProvider
            anchorOrigin={{
              vertical: VerticalPosition.Top,
              horizontal: HorizontalPosition.Center,
            }}
          />
          <Suspense fallback={<CdPageLoader />}>
            <ConfirmProvider>
              <RenderRoutes routes={appRoutes} />
            </ConfirmProvider>
          </Suspense>
        </AuthProvider>
      </MsalProvider>
    </IPInfo>
  );
}

export default App;
