import React, { ReactNode } from 'react';
import { Nav, NavProps } from 'reactstrap';

interface CdNavProps extends NavProps {
  children: ReactNode;
  className?: string;
}

export const CdNav: React.FC<CdNavProps> = ({ children, className, ...props }) => {
  return (
    <Nav className={className} {...props}>
      {children}
    </Nav>
  );
};
