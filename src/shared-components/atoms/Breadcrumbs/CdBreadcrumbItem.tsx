import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbItem } from 'reactstrap';

interface CdBreadcrumbItemProps {
  label: string;
  href?: string;
  active?: boolean;
}

const CdBreadcrumbItem: React.FC<CdBreadcrumbItemProps> = ({ label, href, active = false }) => {
  return (
    <BreadcrumbItem active={active}>
      {href ? (
        <Link to={active ? href : ''} className={`breadcrumb-item ${!active ? 'deactive' : ''}`}>
          {label}
        </Link>
      ) : (
        label
      )}
    </BreadcrumbItem>
  );
};

export default CdBreadcrumbItem;
