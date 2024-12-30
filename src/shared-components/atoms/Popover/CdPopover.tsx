import React from 'react';
import { Popover, PopoverProps } from "reactstrap";

export interface CdPopoverProps extends PopoverProps {
    children: React.ReactNode;
}

const CdPopover: React.FC<CdPopoverProps> = ({ children, ...props }) => {
    return (
        <Popover {...props} flip>
            {children}
        </Popover>
    );
};

export default CdPopover;
