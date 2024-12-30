import Layout from "@layouts/Layout";

import EmergencyWorkRequestDashboard from "./EmergencyWorkRequestDashboard";


export const emergencyWorkRequestRoutes = {
  routes: [
    {
      path: "emergency-work-request",
      layout: Layout,
      children: [
        {
          path: "",
          element: <EmergencyWorkRequestDashboard />,
        },
      ],
    },
  ],
};
