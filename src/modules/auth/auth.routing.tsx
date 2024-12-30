import CdMainLayout from "@layouts/MainLayout";
import B2CLoginRedirect from "./b2c-login-redirect/B2CLoginRedirect";

export const authRoutes = {
  routes: [
    {
      path: "auth",
      layout: CdMainLayout,
      children: [
        {
          path: "sign-in",
          element: <B2CLoginRedirect />,
        },
      ],
    },
  ],
};
