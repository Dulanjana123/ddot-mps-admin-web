import Layout from "@layouts/Layout";
import AddUpdatePermissions from "./AddUpdatePermissions";
import { ActionMode } from "@enums/ActionMode";
import PermissionsIndex from "./PermissionsIndex";

export const rolePermissionsRoutes = {
  routes: [
    {
      path: "permissions",
      layout: Layout,
      children: [
        {
          path: "add",
          element: <AddUpdatePermissions mode={ActionMode.Add} />,
        },
        {
          path: "",
          element: <PermissionsIndex />,
        },
      ],
    },
  ],
};
