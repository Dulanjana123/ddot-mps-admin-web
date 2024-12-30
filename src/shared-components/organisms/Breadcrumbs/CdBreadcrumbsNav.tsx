import { CdBreadcrumb } from '@molecules/index';
import React from 'react';

interface CdBreadcrumbNavProps {
  items: string[];
}

const CdBreadcrumbNav: React.FC<CdBreadcrumbNavProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <CdBreadcrumb items={items} />
    </nav>
  );
};

export default CdBreadcrumbNav;
