import React, { CSSProperties } from 'react';
import { CdTableRow } from '@atoms/index';
import { CdTableCell } from '@atoms/index';

type TableHeaderRowProps = {
  headers: string[];
  className?: string;
  style?: CSSProperties;
};

const CdTableHeaderRow: React.FC<TableHeaderRowProps> = ({ headers, className, style }) => {
  return (
    <CdTableRow className={className} style={style}>
      {headers.map((header, index) => (
        <CdTableCell key={index} header>
          {header}
        </CdTableCell>
      ))}
    </CdTableRow>
  );
};

export default CdTableHeaderRow;
