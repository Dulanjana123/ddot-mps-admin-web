import { CdBreadcrumbItem } from "@atoms/index";
import React from "react";
import { Breadcrumb } from "reactstrap";

interface CdBreadcrumbProps {
  items: string[];
}

const CdBreadcrumb: React.FC<CdBreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumb>
      <CdBreadcrumbItem label={"Home"} href="dashboard" active />
      {items.map((item, index) => (
        <CdBreadcrumbItem key={index} label={item} />
      ))}
    </Breadcrumb>
  );
};

export default CdBreadcrumb;
