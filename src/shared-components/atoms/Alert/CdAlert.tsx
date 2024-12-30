import React, { ReactNode } from "react";
import { Alert, AlertProps } from "reactstrap";

interface CdAlertProps extends AlertProps {
  children?: ReactNode;
}

const CdAlert: React.FC<CdAlertProps> = ({ children, ...props }) => {
  return <Alert {...props}>{children}</Alert>;
};

export default CdAlert;
