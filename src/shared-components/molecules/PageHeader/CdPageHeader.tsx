import { CdCol } from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import CdContainer from "@atoms/Container/CdContainer";
import CdTypography from "@atoms/Typography/CdTypography";
import { SVG } from "leaflet";
import React from "react";
import { Link } from "react-feather";
import { Col, Breadcrumb, BreadcrumbItem } from "reactstrap";

interface CdPageHeaderProps {
  mainTitle?: string;
  subTitle?: string;
  parent?: string;
}

const CdPageHeader: React.FC<CdPageHeaderProps> = ({
  mainTitle,
  subTitle,
  parent,
}) => {
  return (
    <div className="mt-10">
      <CdRow className="small">
        <Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>{parent}</BreadcrumbItem>
          <BreadcrumbItem active>{mainTitle}</BreadcrumbItem>
        </Breadcrumb>
      </CdRow>
      <CdRow>
        <CdTypography className="h5">{mainTitle}</CdTypography>
        {subTitle && <CdTypography className="fw-light h6">{subTitle}</CdTypography>}
      </CdRow>
    </div>
  );
};

export default CdPageHeader;
