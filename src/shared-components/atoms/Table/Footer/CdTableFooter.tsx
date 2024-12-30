import React, { CSSProperties } from 'react';

type TableFooterProps = {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

const CdTableFooter: React.FC<TableFooterProps> = ({ children, className, style }) => {
  return (
    <tfoot className={className} style={style}>
      {children}
    </tfoot>
  );
};

export default CdTableFooter;
