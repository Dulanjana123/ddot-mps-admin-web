import React, { ReactNode } from "react";
import { Row, RowProps } from "reactstrap";

interface CdRowProps extends RowProps {
  children?: ReactNode;
}

export const CdRow: React.FC<CdRowProps> = ({ children, ...props }) => {
  return <Row {...props}>{children}</Row>;
};
export default CdRow;
