import React, { CSSProperties } from "react";
import { CdCheckboxInput, CdContainer, CdTableRow } from "@atoms/index";
import { CdTableCell } from "@atoms/index";
import { TableCellType } from "@enums/TableCellType";
import { Controller } from "react-hook-form";
import { FlexDirection, JustifyContent } from "@enums/components/Container";

type TableDataRowProps = {
  data: any[];
  className?: string;
  style?: CSSProperties;
  onClick?: (data: any) => void;
  control?: any;
};

const CdTableDataRow: React.FC<TableDataRowProps> = ({
  data,
  className,
  style,
  onClick,
  control,
}) => {
  const renderCell = (cell: any) => {
    if (!cell) {
      return cell;
    }

    switch (cell.type) {
      case TableCellType.Checkbox:
        return (
          <CdContainer
            className="mt-2 p-0"
            flex
            justifyContent={JustifyContent.start}
            flexDirection={FlexDirection.row}
          >
            <Controller
              name={cell.key}
              control={control}
              render={({ field }) => (
                <CdCheckboxInput
                  disabled={!cell.isActive}
                  id={cell.id}
                  onChange={(e) => field.onChange(!e.target.checked)}
                />
              )}
            />
          </CdContainer>
        );
      default:
        return cell.name ?? cell;
    }
  };

  return (
    <CdTableRow
      className={className}
      style={style}
      onClick={() => onClick && onClick(data)}
    >
      {data.map((item, index) => (
        <CdTableCell key={index}>{renderCell(item)}</CdTableCell>
      ))}
    </CdTableRow>
  );
};

export default CdTableDataRow;
