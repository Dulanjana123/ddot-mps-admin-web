import Breadcrumbs from "@common-elements/Breadcrumbs/Breadcrumbs";
import { FormWizard } from "@interfaces/components/formWizard";
import React from "react";
import { Card, CardBody, Container } from "reactstrap";
import AddWatchLockAreaDetailsForm from "./AddWatch&LockAreaDetailsForm";
import EmailConfigForm from "./EmailConfigurationForm";
import InteractiveGisMap from "./InteractiveGISMap";
import { useAppDispatch, useAppSelector } from "@store/state-hooks";
import { setTab } from "@store/reducers/watchLockFormWizard";
import ReviewForm from "./ReviewForm";
import { CdFormWizardV2 } from "@organisms/index";

const WatchLockAreaFormWizard: React.FC = () => {
  const activeTab = useAppSelector(
    (state) => state.watchLockWizard.formData.tab
  );
  const dispatch = useAppDispatch();

  const toggle = (tab: number) => {
    if (activeTab !== tab)
      dispatch(
        setTab({
          tab: tab,
        })
      );
  };

  const formSteps: FormWizard[] = [
    {
      id: "watch-lock-area-details",
      label: "Watch/Lock area details",
      content: <AddWatchLockAreaDetailsForm />,
    },
    {
      id: "email-config",
      label: "Email configuration",
      content: <EmailConfigForm />,
    },
    {
      id: "interactive-map",
      label: "Interactive map",
      content: <InteractiveGisMap />,
    },
    {
      id: "review-submit",
      label: "Review & submit",
      content: <ReviewForm />,
    },
  ];

  return (
    <div className="page-body">
      <Breadcrumbs mainTitle={"Watch & Lock Area"} parent="Map" />
      <Container fluid>
        <Card>
          <CardBody>
            <CdFormWizardV2
              steps={formSteps}
              goToTab={toggle}
              activeTab={activeTab}
              showLabel
              isTabClickEnabled={false}
            />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default WatchLockAreaFormWizard;
