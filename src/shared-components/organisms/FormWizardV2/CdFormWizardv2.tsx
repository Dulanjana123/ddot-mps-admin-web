import React, { useEffect, useMemo, useState } from "react";
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { FormWizard } from "@interfaces/components/formWizard";
import { CdCircularProgressBar, CdContainer } from "@atoms/index";

type FormWizardProps = {
  steps: FormWizard[];
  showLabel?: boolean;
  activeTab: number;
  goToTab: (page: number) => void;
  isTabClickEnabled?: boolean;
};

const CdFormWizardV2: React.FC<FormWizardProps> = ({
  steps,
  showLabel = false,
  activeTab = 1,
  goToTab,
  isTabClickEnabled = true,
}) => {
  const [isMobileSize, setIsMobileSize] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setIsMobileSize(true);
      } else {
        setIsMobileSize(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const wizardBar = useMemo(
    () => (
      <CdContainer className="wizard-bar">
        <Nav tabs className="wizard-nav">
          {steps.map((item, key) => (
            <NavItem
              key={item.id}
              style={{
                cursor: !item.isDisabled ? "pointer" : undefined,
              }}
              className="wizard-nav-item"
            >
              <NavLink
                id={item.id}
                className={classnames("wizard-step", {
                  active: activeTab === key + 1,
                })}
                onClick={
                  isTabClickEnabled
                    ? () => {
                        goToTab(key + 1);
                      }
                    : undefined
                }
                disabled={item?.isDisabled}
              >
                <span className="wizard-step-circle">{key + 1}</span>
                {showLabel && (
                  <span className="wizard-step-label">{item.label}</span>
                )}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </CdContainer>
    ),
    [steps, activeTab, showLabel]
  );

  const wizardContent = (
    <TabContent activeTab={activeTab}>
      {steps.map((item, key) => (
        <TabPane key={item.id} tabId={key + 1}>
          <Row>
            <Col sm="12">{item.content}</Col>
          </Row>
        </TabPane>
      ))}
    </TabContent>
  );

  const progressBar = useMemo(
    () => (
      <>
        <Row className="g-0 mb-3">
          <Col xs={6} className="progressbar-col">
            <div className="progressbar-container">
              <CdCircularProgressBar
                minValue={0}
                maxValue={steps.length}
                value={activeTab}
                text={`${activeTab} of ${steps.length}`}
                strokeWidth={10}
              />
            </div>
          </Col>
          <Col xs={6} className="progressbar-label">
            <h5>{steps[activeTab - 1].label}</h5>
          </Col>
        </Row>
        <hr />
      </>
    ),
    [steps, activeTab]
  );

  const renderWizardView = isMobileSize ? progressBar : wizardBar;

  return (
    <CdContainer className="wizard-container">
      {renderWizardView}
      {wizardContent}
    </CdContainer>
  );
};

export default CdFormWizardV2;
