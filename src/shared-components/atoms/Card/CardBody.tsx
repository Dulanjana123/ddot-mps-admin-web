import React, { ReactNode } from "react";
import { CardBody, CardBodyProps } from "reactstrap";

interface CdCardBodyProps extends CardBodyProps {
  children?: ReactNode;
}

export const CdCardBody: React.FC<CdCardBodyProps> = ({
  children,
  ...props
}) => {
  return <CardBody {...props}>{children}</CardBody>;
};
export default CdCardBody;
