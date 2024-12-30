import React, { ReactNode } from 'react';
import { DropdownToggle, DropdownToggleProps  } from 'reactstrap';

interface CdDropdownToggleProps extends DropdownToggleProps {
  className?: string;
  tag?: React.ElementType;
  [key: string]: any; // To allow passing `data-toggle` and other props if needed
  children: ReactNode;
}

const CdDropdownToggl: React.FC<CdDropdownToggleProps> = ({
  className,
  tag = 'div',
  children,
  ...props
}) => {
  return (
    <DropdownToggle className={className} tag={tag} {...props}>
      {children}
    </DropdownToggle>
  );
};

export default CdDropdownToggl;
