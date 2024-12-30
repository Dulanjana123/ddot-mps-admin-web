import { CdNav } from "@atoms/Navs/CdNav";
import { CdNavItem } from "@atoms/Navs/CdNavItem";
import { CdNavLink } from "@atoms/Navs/CdNavLink";
import { CdTabContent } from "@atoms/Tab/CdTabContent";
import { CdTabPane } from "@atoms/Tab/CdTabPane";
import React, { useEffect, useState } from "react";

export interface TabObj {
  id: string;
  title: string;
  iconClass?: string;
  tabClass?: string;
  content: React.ReactNode;
}

interface CdTabsProps {
  tabs: TabObj[];
  getActiveTab?: (tab: string) => void; // Return active tab
}

const CdTabsEwr: React.FC<CdTabsProps> = ({ tabs, getActiveTab }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || "1"); // Default to the first tab

  useEffect(() => {
    if (getActiveTab) {
      getActiveTab(activeTab);
    }
  }, [activeTab]);

  return (
    <div className="cdtab-parent">
      <CdNav className="mb-0" tabs>
        {tabs.map((tab) => (
          <CdNavItem key={tab.id}>
            <CdNavLink
              className={tab.tabClass}
              href={`#${tab.id}`}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
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

export default CdTabsEwr;
