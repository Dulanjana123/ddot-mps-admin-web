import React, { ReactNode } from 'react';
import { Dropdown, DropdownProps } from 'reactstrap';

interface CdDropdownProps extends DropdownProps{
  className?: string;
  children: ReactNode;
}

const CdDropdown: React.FC<CdDropdownProps> = ({ className, children, ...props }) => {
  return (
    <Dropdown {...props}  className={className}>
      {children}
    </Dropdown>
  );
};

export default CdDropdown;
