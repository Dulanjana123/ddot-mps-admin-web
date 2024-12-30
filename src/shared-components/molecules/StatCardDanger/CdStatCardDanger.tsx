import CdCardBody from '@atoms/Card/CardBody';
import CdCard from '@atoms/Card/CdCard';
import { CdLink, CdTypography } from '@atoms/index';
import React from 'react';

interface StatCardProps {
  count: number;
  description: string;
  linkText: string;
  onLinkClick: () => void;
  bgColor?: string; 
  textColor?: string; 
}

const CdStatCardDanger: React.FC<StatCardProps> = ({count,description,linkText,onLinkClick,bgColor, textColor = 'text-danger'}) => {
  return (
    <CdCard className={`border border-danger rounded text-center shadow-sm p-3`}
            style={{ backgroundColor: bgColor }} 
            >
      <CdCardBody>
        <CdTypography className="fs-1 fw-bold mb-2 ${textColor}">{count}</CdTypography>
        <CdTypography className="fs-5 text-dark mb-3">{description}</CdTypography>
        <CdLink 
          id="stat-link" 
          text={linkText} 
          href="#" 
          noUnderline={false}
          onClick={onLinkClick}>
          
        </CdLink>
      </CdCardBody>
    </CdCard>
  );
};

export default CdStatCardDanger;


