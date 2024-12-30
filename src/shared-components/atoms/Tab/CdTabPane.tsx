import React, { ReactNode } from "react";
import { TabPane, TabPaneProps } from "reactstrap";

interface CdTabPaneProps extends TabPaneProps {
  tabId: string | number;
  children: ReactNode;
}

export const CdTabPane: React.FC<CdTabPaneProps> = ({
  tabId,
  children,
  ...props
}) => {
  return (
    <TabPane tabId={tabId} {...props}>
      {children}
    </TabPane>
  );
};
