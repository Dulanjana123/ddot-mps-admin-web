import { datagridActionType } from "src/types/modules/DatagridActionTypes";

export const agencyDataGridActions: datagridActionType[] = [
  {
    name: "Edit",
    icon: "Edit",
    link: `${process.env.PUBLIC_URL}/agency/update`,
  },
  {
    name: "View",
    icon: "Eye",
    link: `${process.env.PUBLIC_URL}/agency/view`,
  },
];

export const roleDataGridActions: datagridActionType[] = [
  {
    name: "Edit",
    icon: "Edit",
    link: `#`,
  },
];
