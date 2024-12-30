import Layout from "@layouts/Layout";
import { lazy } from "react";
import EWRDashboard from "./dashboard/EWRDashboard";
import DetailWorkRequest from "./detail-work-request/DetailWorkRequest";
import ViewEwr from "./view-ewr/ViewEwr";
import EwrList from "./dashboard/EwrList";

// const EWRDashboard = lazy(() => import("./dashboard/EWRDashboard"));
// const DetailWorkRequest = lazy(
//   () => import("./detail-work-request/DetailWorkRequest")
// );

export const ewrRoutes = {
  routes: [
    {
      path: "ewr",
      layout: Layout,
      children: [
        {
          path: "",
          element: <EWRDashboard />,
          // element: <EwrList />,
        },
        {
          path: "detail-work-request",
          element: <DetailWorkRequest />,
        },
        {
          path: "view/:id",
          element: <ViewEwr />,
        },
      ],
    },
  ],
};
