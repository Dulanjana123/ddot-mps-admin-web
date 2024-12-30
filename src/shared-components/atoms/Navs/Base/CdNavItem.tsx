import React, { ReactNode } from "react";
import { NavItem, NavProps } from "reactstrap";

interface CdNavItemProps extends NavProps {
  children?: ReactNode;
}

export const CdNavItem: React.FC<CdNavItemProps> = ({ children, ...props }) => {
  return <NavItem {...props}>{children}</NavItem>;
};
