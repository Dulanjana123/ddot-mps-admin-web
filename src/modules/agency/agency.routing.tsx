import { FormAction } from "@enums/form-action";
import Layout from "@layouts/Layout";
import CreateUpdateAgency from "./CreateUpdateAgency";
import ManageAgencies from "./ManageAgencies";
import SampleDataGridWithFullFeatures from "./SampleDataGridWithFullFeatures";

export const agencyRoutes = {
  routes: [
    {
      path: "agency",
      layout: Layout,
      children: [
        {
          path: "",
          element: <ManageAgencies />,
        },
        {
          path: "add",
          element: <CreateUpdateAgency formAction={FormAction.Add} />,
        },
        {
          path: "view",
          element: <CreateUpdateAgency formAction={FormAction.View} />,
        },
        {
          path: "update",
          element: <CreateUpdateAgency formAction={FormAction.Update} />,
        },
        {
          path: "sample-datagrid",
          element: <SampleDataGridWithFullFeatures />,
        },
      ],
    },
  ],
};
