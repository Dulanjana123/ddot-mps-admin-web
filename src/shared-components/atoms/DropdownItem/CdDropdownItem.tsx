import React from "react";
import { DropdownItem, DropdownItemProps } from "reactstrap";

interface CdDropdownItemProps extends DropdownItemProps {
  className?: string;
  onClick?: () => void; 
}

const CdDropdownItem: React.FC<CdDropdownItemProps> = ({ className, onClick, children, ...props }) => {
  return (
    <DropdownItem {...props} className={className} onClick={onClick}>
      {children}
    </DropdownItem>
  );
};

export default CdDropdownItem;
