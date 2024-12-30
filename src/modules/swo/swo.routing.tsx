import Layout from "@layouts/Layout";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const SWODashboard = lazy(() => import("./dashboard/SWODashboard"));
const StopWorkOrder = lazy(() => import("./stop-work-order/StopWorkOrder"));
const ManageStopWorkOrders = lazy(
  () => import("./manage-stop-work-orders/ManageStopWorkOrders")
);

export const swoRoutes = {
  routes: [
    {
      path: "swo",
      layout: Layout,
      children: [
        {
          path: "",
          element: <Navigate to="list" />,
        },
        {
          path: "dashboard",
          element: <SWODashboard />,
        },
        {
          path: "add",
          element: <StopWorkOrder />,
        },
        {
          path: "list",
          element: <ManageStopWorkOrders />,
        },
      ],
    },
  ],
};
