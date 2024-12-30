import React, { CSSProperties } from 'react';

type TableBodyProps = {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

const CdTableBody: React.FC<TableBodyProps> = ({ children, className, style }) => {
  return (
    <tbody className={className} style={style}>
      {children}
    </tbody>
  );
};

export default CdTableBody;
