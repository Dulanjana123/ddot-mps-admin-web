import React from 'react';
import { PopoverBody, PopoverBodyProps } from "reactstrap";

interface CdPopoverBodyProps extends PopoverBodyProps {
    children: React.ReactNode
};

const CdPopoverBody: React.FC<CdPopoverBodyProps> = ({ children, ...props }) => {
    return <PopoverBody {...props}>{children}</PopoverBody>;
};

export default CdPopoverBody;
