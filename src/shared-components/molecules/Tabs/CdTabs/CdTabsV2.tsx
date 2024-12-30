import { Card, CardBody, Col, Nav, NavItem, NavLink } from "reactstrap";
import { Href } from "../../../../utils/Constant";

export interface TabV3 {
  key: number;
  code: string;
  title: string;
}

interface CdTabsV2Props {
  content: any;
  tabs: TabV3[];
  activeTab: number;
  changeActiveTab: (tab: number) => void;
}

const CdTabsV2 = ({ content, tabs, activeTab, changeActiveTab }: CdTabsV2Props) => {
  const onChangeActiveTab = (tab) => {
    changeActiveTab(tab);
  };
  return (
    <Col>
      <Card>
        <CardBody>
          <Nav tabs className="simple-wrapper">
            {tabs?.map((tab) => (
              <NavItem key={tab.key}>
                <NavLink
                  href={Href}
                  className={`txt-primary ${
                    activeTab === tab.key ? "active" : ""
                  }`}
                  onClick={() => onChangeActiveTab(tab.key)}
                >
                  {tab.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <>{content}</>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CdTabsV2;
