import React, { CSSProperties } from 'react';

type TableHeaderProps = {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

const CdTableHeader: React.FC<TableHeaderProps> = ({ children, className, style }) => {
  return (
    <thead className={className} style={style}>
      {children}
    </thead>
  );
};

export default CdTableHeader;
