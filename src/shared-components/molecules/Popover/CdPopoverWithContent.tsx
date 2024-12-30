import React, { ReactElement, ReactNode, useState } from 'react';
import { CdPopover, CdPopoverBody, CdPopoverHeader } from '@atoms/index';
import type { Placement } from '@popperjs/core';
import { CdPopoverProps } from '@atoms/Popover/CdPopover';

interface ChildProps {
    className: string;
    id: string;
    onClick?: () => void;
}

interface PopoverWithContentProps extends Omit<CdPopoverProps, 'target'> {
    popoverTitle?: string;
    popoverContent: string | ReactNode;
    children: ReactElement<ChildProps>;
    placement?: Placement;
}

const PopoverWithContent: React.FC<PopoverWithContentProps> = ({ 
        children, 
        popoverTitle, 
        popoverContent, 
        placement="auto", 
        ...props 
    }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            {React.cloneElement(children, { onClick: toggle })}
            <CdPopover
                {...props}
                placement={placement}
                target={children.props.id} 
                isOpen={isOpen} 
                toggle={toggle}
            >
                <CdPopoverHeader>{popoverTitle ?? ''}</CdPopoverHeader>
                <CdPopoverBody>
                    {popoverContent}
                </CdPopoverBody>
            </CdPopover>
        </>
    );
};

export default PopoverWithContent;