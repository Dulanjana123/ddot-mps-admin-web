import Layout from "@layouts/Layout";

import SamplePage from "./Sample";

export const sampleRoutes = {
  routes: [
    {
      path: "sample",
      // auth: [UserRole.Admin],
      layout: Layout,
      children: [
        {
          path: "",
          element: <SamplePage />,
        },
      ],
    },
  ],
};
