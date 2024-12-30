import React, { ReactNode } from "react";
import { TabContent, TabContentProps } from "reactstrap";

interface CdTabContentProps extends TabContentProps {
  activeTab: string | number;
  children: ReactNode;
}

export const CdTabContent: React.FC<CdTabContentProps> = ({
  activeTab,
  children,
  ...props
}) => {
  return (
    <TabContent activeTab={activeTab} {...props}>
      {children}
    </TabContent>
  );
};
