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
  className?: string;
  borderColor?: string;
  style?: React.CSSProperties;
}

const CdStatCard: React.FC<StatCardProps> = ({count,description,linkText,onLinkClick,bgColor, textColor, borderColor, className, style = {}}) => {
  return (
    <CdCard className={`border ${borderColor} rounded text-center shadow-sm p-3 mb-3  ${className}`}
            style={{ backgroundColor: bgColor, ...style}} 
            >
      <CdCardBody >
        <CdTypography className={`fs-1 ${textColor} fw-bold mb-1`}>{count}</CdTypography>
        <CdTypography className="fs-5 text-dark mb-1" >{description}</CdTypography>
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

export default CdStatCard;



