import CdTypography from "@atoms/Typography/CdTypography";
import CdPageHeader from "@molecules/PageHeader/CdPageHeader";
import React from "react";
import SWOLeftSidebar from "./components/SWOLeftSidebar";
import CdCard from "@atoms/Card/CdCard";
import SWOTabContent from "./components/SWOTabContent";
import CdRow from "@atoms/Base/CdRow";

const StopWorkOrder = () => {
  return (
    <div className="page-body mb-3">
      <CdPageHeader
        mainTitle="Create Stop Work Order"
        subTitle="Stop Work Orders Creation Wizard"
        parent="Stop Work Order"
      />

      <CdCard className="mt-3">
        <div className="d-flex flex-row">
          <SWOLeftSidebar />
          <SWOTabContent />
        </div>
      </CdCard>
    </div>
  );
};

export default StopWorkOrder;
