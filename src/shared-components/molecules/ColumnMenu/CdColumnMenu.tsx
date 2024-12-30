import { GridColumnMenu, GridColumnMenuProps } from '@mui/x-data-grid-pro';
import React from 'react';

interface CdColumnMenuProps extends GridColumnMenuProps {
  slots?: any;
  slotProps?: any;
}

const CdColumnMenu: React.FC<CdColumnMenuProps> = (props) => {
  return <GridColumnMenu {...props} slots={props.slots} slotProps={props.slotProps} />;
};

export default CdColumnMenu;
