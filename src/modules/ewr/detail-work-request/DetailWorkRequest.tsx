import Breadcrumbs from "@common-elements/Breadcrumbs/Breadcrumbs";
import { CdTabsV2, Tab } from "@molecules/Tabs/CdTabs/CdTabs/CdTabs";
import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import EmergencyWorkRequestInformation from "./tabs/EmergencyWorkRequestInformation";
import LocationInformation from "./tabs/LocationInformation";
import TrackingInformation from "./tabs/TrackingInformation";
import InspectionDetails from "./tabs/InspectionDetails";
import AssignReassign from "./tabs/AssignReassign";
import { useLocation } from "react-router-dom";
import { ewrService } from "@services/api/ewr-service";
import { EwrResponseDto } from "@interfaces/response/ewr-response-dto";

const DetailWorkRequest: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const agencyId = Number(queryParams.get("id"));

  const [ewrRequest, setEwrRequest] = useState<EwrResponseDto>();

  const tabs: Tab[] = [
    {
      id: "1",
      title: "Emergency Work Request Information",
      content: <EmergencyWorkRequestInformation data={ewrRequest} />,
    },
    {
      id: "2",
      title: "Location Information",
      content: <LocationInformation data={ewrRequest} />,
    },
    {
      id: "3",
      title: "Tracking Information",
      content: <TrackingInformation data={ewrRequest} />,
    },
    {
      id: "4",
      title: "Inspection Details",
      content: <InspectionDetails data={ewrRequest} />,
    },
    {
      id: "5",
      title: "Assign / Reassign",
      content: <AssignReassign data={ewrRequest} />,
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await ewrService.getById(agencyId).then((response) => {
      setEwrRequest(response.data);
    });
  };

  return (
    <div className="page-body">
      <Breadcrumbs
        mainTitle="Inspection Details"
        parent="Emergency Work Requests"
      />

      <div>
        <Card>
          <CardBody>{ewrRequest && <CdTabsV2 tabs={tabs} />}</CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DetailWorkRequest;
