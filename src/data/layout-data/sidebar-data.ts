import { MenuItem } from "@layout/SidebarType";

export const MenuList: MenuItem[] = [
  {
    title: "General",
    lanClass: "lan-1",
    Items: [
      {
        title: "EWR",
        icon: "home",
        path: "/ewr",
        type: "link",
      },
      {
        title: "Stop Work Orders",
        icon: "support-tickets",
        path: "/swo",
        type: "link",
      },
      {
        title: "Agency",
        icon: "home",
        path: "/agency",
        type: "link",
      },
      {
        title: "Permissions",
        icon: "support-tickets",
        type: "sub",
        children: [
          {
            title: "Manage Permissions",
            path: `/permissions/`,
            type: "link",
          },
          {
            title: "Create Permissions",
            path: `/permissions/add`,
            type: "link",
          },
        ],
      },
      {
        title: "PDRM Meeting Settings",
        icon: "support-tickets",
        type: "link",
        path: "/pdrm-settings/meeting",
      },
      {
        title: "Maps",
        icon: "maps",
        type: "sub",
        children: [
          {
            title: "Map/Info Lookup",
            path: `/maps/map-info`,
            type: "link",
          },
          {
            title: "Watch & Lock Area",
            path: `/maps/watch-lock-area`,
            type: "link",
          },
        ],
      },
    ],
  },
];
