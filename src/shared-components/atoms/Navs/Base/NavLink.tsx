import React, { ReactNode } from "react";
import { NavLink, NavLinkProps } from "reactstrap";

interface CdNavLinkItemProps extends NavLinkProps {
  children?: ReactNode;
}

export const CdNavLinkItem: React.FC<CdNavLinkItemProps> = ({
  children,
  ...props
}) => {
  return <NavLink {...props}>{children}</NavLink>;
};
