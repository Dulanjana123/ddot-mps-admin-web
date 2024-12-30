import React, { ReactNode } from "react";
import { CardFooterProps, CardFooter } from "reactstrap";

interface CdCardFooterProps extends CardFooterProps {
  children?: ReactNode;
}

export const CdCardFooter: React.FC<CdCardFooterProps> = ({
  children,
  ...props
}) => {
  return <CardFooter {...props}>{children}</CardFooter>;
};
export default CdCardFooter;
