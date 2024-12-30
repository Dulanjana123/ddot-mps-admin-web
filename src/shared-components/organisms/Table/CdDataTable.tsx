import React, { CSSProperties } from "react";
import { Table } from "reactstrap";
import { CdTableHeader } from "@atoms/index";
import { CdTableBody } from "@atoms/index";
import { CdTableFooter } from "@atoms/index";
import { CdTableHeaderRow } from "@molecules/index";
import { CdTableDataRow } from "@molecules/index";

type DataTableProps = {
  headers: string[];
  data: any[][];
  className?: string;
  style?: CSSProperties;
  bordered?: boolean;
  hover?: boolean;
  striped?: boolean;
  onRowClick?: (data: any) => void;
  control?: any;
  feedback?: string;
  responsive?: boolean;
  small?: boolean;
};

const CdDataTable: React.FC<DataTableProps> = ({
  headers,
  data,
  className,
  style,
  bordered,
  hover,
  striped,
  onRowClick,
  control,
  feedback,
  responsive,
  small,
}) => {
  return (
    <Table
      striped={striped}
      hover={hover}
      bordered={bordered}
      className={className}
      style={style}
      responsive={responsive}
      size={small ? "sm" : ""}
    >
      <CdTableHeader>
        <CdTableHeaderRow headers={headers} />
      </CdTableHeader>
      <CdTableBody>
        {data.map((rowData, index) => (
          <CdTableDataRow
            key={index}
            data={rowData}
            onClick={onRowClick}
            control={control}
          />
        ))}
      </CdTableBody>
      <CdTableFooter style={{ color: "red" }}>{feedback}</CdTableFooter>
    </Table>
  );
};

export default CdDataTable;
