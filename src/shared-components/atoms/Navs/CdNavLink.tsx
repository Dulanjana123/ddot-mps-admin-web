import React from 'react';
import { NavLink, NavLinkProps } from 'reactstrap';

interface CdNavLinkProps extends NavLinkProps {
  href?: string;
  active: boolean;
  iconClass?: string;
  children: React.ReactNode;
  activeTabColor?: string;
}

export const CdNavLink: React.FC<CdNavLinkProps> = ({
  href,
  active,
  iconClass = '',
  children,
  activeTabColor,
  ...props
}) => {
  return (
    <NavLink
      href={href}
      active={active}
      style={{
        backgroundColor: active && activeTabColor ? activeTabColor : undefined,
        cursor: 'pointer',
        ...props.style,
      }}
      {...props}
    >
      {iconClass && <i className={iconClass}></i>}
      {children}
    </NavLink>
  );
};
