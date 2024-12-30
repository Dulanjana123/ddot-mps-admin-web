import React from 'react';
import { PopoverHeader, PopoverHeaderProps } from "reactstrap";

interface CdPopoverHeaderProps extends PopoverHeaderProps {
    children: React.ReactNode;
};

const CdPopoverHeader: React.FC<CdPopoverHeaderProps> = ({ children, ...props }) => {
    return <PopoverHeader {...props}>{children}</PopoverHeader>;
};

export default CdPopoverHeader;
