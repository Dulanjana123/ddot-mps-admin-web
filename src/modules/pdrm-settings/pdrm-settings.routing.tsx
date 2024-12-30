import Layout from "@layouts/Layout";
import MeetingsSettings from "@modules/pdrm-settings/MeetingSettings";

export const meetingSettingsRoutes = {
  routes: [
    {
      path: "pdrm-settings",
      layout: Layout,
      children: [
        {
          path: "meeting",
          element: <MeetingsSettings />,
        },        
      ],
    },
  ],
};
