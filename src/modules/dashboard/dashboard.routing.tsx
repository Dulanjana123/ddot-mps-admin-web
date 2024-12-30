import Layout from "@layouts/Layout";
import Dashboard from "@modules/dashboard/Dashboard";

export const dashboardRoutes = {
  routes: [
    {
      path: "dashboard",
      // auth: [UserRole.Admin],
      layout: Layout,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "reports",
          element: <Dashboard />,
        },
      ],
    },
  ],
};
