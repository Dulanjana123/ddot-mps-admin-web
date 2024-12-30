import CdTabsV2, { Tab } from "@molecules/Tabs/CdTabs/CdTabs/CdTabs";
import { CdContentHeading } from "@organisms/index";
import { useState } from "react";
import EwrList from "./EwrList";
import EmergencyWorkRequest from "@modules/emergency-work-request/EmergencyWorkRequest";

const EWRDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("");

  const ewrViewTabs: Tab[] = [
    {
      id: "1",
      title: "EWR Dashboard",
      content: (
        <>
          <EmergencyWorkRequest />
        </>
      ),
    },
    {
      id: "2",
      title: "All EWR",
      content: (
        <>
          <EwrList />
        </>
      ),
    },
  ];

  return (
    <div className="page-body">
      <CdContentHeading
        headingText="My Emergency Work Requests"
        breadcrumPath={["Emergency Work Requests"]}
        backIconDisabled
      />
      <CdTabsV2 getActiveTab={setActiveTab} tabs={ewrViewTabs} />
    </div>
  );
};

export default EWRDashboard;
