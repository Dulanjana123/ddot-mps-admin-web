import Layout from "@layouts/Layout";
import WatchLockAreaFormWizard from "./watch-lock-area/WatchLockAreaFormWizard";
import MapInfoLookup from "./map-info-lookup/MapInfoLookup";

export const mapRoutes = {
  routes: [
    {
      path: "maps",
      layout: Layout,
      children: [
        {
          path: "map-info",
          element: <MapInfoLookup />,
        },
        {
          path: "watch-lock-area",
          element: <WatchLockAreaFormWizard />,
        },
      ],
    },
  ],
};
