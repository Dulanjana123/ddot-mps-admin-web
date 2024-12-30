import React, { ReactNode } from "react";
import { Nav, NavProps } from "reactstrap";

interface CdNavProps extends NavProps {
  children?: ReactNode;
}

export const CdNav: React.FC<CdNavProps> = ({ children, ...props }) => {
  return <Nav {...props}>{children}</Nav>;
};
