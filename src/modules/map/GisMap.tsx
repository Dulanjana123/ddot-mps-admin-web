import CdGisMap from "@atoms/Map/CdGisMap";
import Breadcrumbs from "@common-elements/Breadcrumbs/Breadcrumbs";
import React from "react";
import { Card, CardBody, Container } from "reactstrap";

const GisMap: React.FC = () => {
  return (
    <div className="page-body">
      <Breadcrumbs mainTitle={"Map-Info Lookup"} parent="Map" />
      <Container fluid>
        <Card>
          <CardBody>
            <CdGisMap latitude={38.889805} longitude={-77.009056} />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default GisMap;
