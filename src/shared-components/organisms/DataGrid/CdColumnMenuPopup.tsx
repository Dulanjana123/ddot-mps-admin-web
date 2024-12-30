import { CdButton, CdCheckboxInput, CdDivider, CdTypography } from '@atoms/index';
import { GridColDef } from '@interfaces/shared/mui-pro.interface';
import { FormControlLabel, FormGroup, Menu } from '@mui/material';
import { FC, useState } from 'react';

type ColumnMenuPopupProps = {
  columns: GridColDef[];
  columnVisibilityModel: any;
  setColumnVisibilityModel: (args: any) => void;
};

const CdColumnMenuPopup: FC<ColumnMenuPopupProps> = ({ columns, columnVisibilityModel, setColumnVisibilityModel }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const toggleColumnVisibility = (field: string) => {
    setColumnVisibilityModel((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const getHeaderNameByField = (field: string): string | undefined => {
    const column = columns.find((col) => col.field === field);
    return column?.headerName;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CdButton text="Columns" className="w-100" onClick={handleClick} outline />
      <Menu sx={{ mt: 1 }} id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <CdTypography className="h6 px-3 pt-2">Columns</CdTypography>
        <CdDivider />
        <FormGroup sx={{ px: 3 }}>
          {Object.entries(columnVisibilityModel).map(([field, isVisible]) => (
            <FormControlLabel
              control={
                <CdCheckboxInput
                  id="check-box"
                  checked={isVisible ? true : false}
                  onChange={() => toggleColumnVisibility(field)}
                />
              }
              key={field}
              label={getHeaderNameByField(field)}
            />
          ))}
        </FormGroup>
      </Menu>
    </>
  );
};

export default CdColumnMenuPopup;
