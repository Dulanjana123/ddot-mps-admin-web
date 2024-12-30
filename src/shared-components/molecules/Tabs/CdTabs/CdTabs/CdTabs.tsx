import { CdNav } from "@atoms/Tab/CdNav";
import { CdNavItem } from "@atoms/Tab/CdNavItem";
import { CdNavLink } from "@atoms/Tab/CdNavLink";
import { CdTabContent } from "@atoms/Tab/CdTabContent";
import { CdTabPane } from "@atoms/Tab/CdTabPane";
import React, { useState } from "react";

export interface Tab {
  id: string;
  title: string;
  iconClass?: string;
  content: React.ReactNode;
}

interface CdTabsV2Props {
  tabs: Tab[];
  getActiveTab?: (tab: string) => void; // Return active tab
}

export const CdTabsV2: React.FC<CdTabsV2Props> = ({ tabs, getActiveTab }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || "1"); // Default to the first tab

  return (
    <div className="cdtab-parent">
      <CdNav className="mb-0" tabs>
        {tabs.map((tab) => (
          <CdNavItem key={tab.id}>
            <CdNavLink
              active={activeTab === tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (getActiveTab) getActiveTab(tab.id.toString());
              }}
              iconClass={tab?.iconClass}
              activeTabColor="white"
            >
              {tab.title}
            </CdNavLink>
          </CdNavItem>
        ))}
      </CdNav>

      <CdTabContent activeTab={activeTab} className="tab-content">
        {tabs.map((tab) => (
          <CdTabPane key={tab.id} tabId={tab.id} className="cdtab">
            {tab.content}
          </CdTabPane>
        ))}
      </CdTabContent>
    </div>
  );
};
export default CdTabsV2;
