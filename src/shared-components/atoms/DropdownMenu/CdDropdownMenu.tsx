import React from 'react';
import { DropdownMenu, DropdownMenuProps } from 'reactstrap';

interface CdDropdownMenuProps extends DropdownMenuProps   {
  className?: string;
}

const CdDropdownMenu: React.FC<CdDropdownMenuProps> = ({ className, ...props }) => {
  return (
    <DropdownMenu {...props} className={className} 
    />
  );
};

export default CdDropdownMenu;
