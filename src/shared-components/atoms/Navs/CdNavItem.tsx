import React, { ReactNode } from 'react';
import { NavItem, NavItemProps } from 'reactstrap';

interface CdNavItemProps extends NavItemProps {
  children: ReactNode;
}

export const CdNavItem: React.FC<CdNavItemProps> = ({ children, ...props }) => {
  return <NavItem {...props}>{children}</NavItem>;
};
