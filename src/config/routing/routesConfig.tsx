import { dashboardRoutes } from "@modules/dashboard/dashboard.routing";
import { agencyRoutes } from "@modules/agency/agency.routing";
import { ewrRoutes } from "@modules/ewr/ewr.routing";
import { rolePermissionsRoutes } from "@modules/role-permissions/role-permissions.routing";
import { mapRoutes } from "@modules/map/map.routing";
import { Navigate } from "react-router-dom";
import { authRoutes } from "@modules/auth/auth.routing";
import { swoRoutes } from "@modules/swo/swo.routing";
import { sampleRoutes } from "@modules/sample-page/sample.routing";
import { meetingSettingsRoutes } from "@modules/pdrm-settings/pdrm-settings.routing";
import { emergencyWorkRequestRoutes } from "@modules/emergency-work-request/ewr.routing";

export const appRoutes = [
  ...dashboardRoutes.routes,
  ...authRoutes.routes,
  ...agencyRoutes.routes,
  ...ewrRoutes.routes,
  ...rolePermissionsRoutes.routes,
  ...mapRoutes.routes,
  ...swoRoutes.routes,
  ...sampleRoutes.routes,
  ...meetingSettingsRoutes.routes,
  ...emergencyWorkRequestRoutes.routes,
  {
    path: "",
    element: <Navigate to="auth/sign-in" />,
  },
  {
    path: "*",
    element: <Navigate to="auth/sign-in" />,
  },
];
