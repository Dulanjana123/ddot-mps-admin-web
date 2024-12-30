import React, { ReactNode } from "react";
import { Col, ColProps, Row, RowProps } from "reactstrap";

interface CdColProps extends ColProps {
  children?: ReactNode;
}

export const CdCol: React.FC<CdColProps> = ({ children, ...props }) => {
  return <Col {...props}>{children}</Col>;
};
export default CdCol;
