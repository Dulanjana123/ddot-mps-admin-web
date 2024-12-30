import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { GridColumnMenuItemProps } from '@mui/x-data-grid-pro';

const CdColumnMenuItem: React.FC<GridColumnMenuItemProps> = ({ handler, text, icon }) => {
  return (
    <MenuItem onClick={handler}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  );
};

export default CdColumnMenuItem;
