import { StateView } from "@interfaces/components/datagrid";
import { IconButton, MenuItem } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid-pro";
import { JustifyContent } from "@utils/Constant";

function ViewListItem(props: {
  view: StateView;
  viewId: string;
  selected: boolean;
  onDelete: (viewId: string) => void;
  onSelect: (viewId: string) => void;
}) {
  const { view, viewId, selected, onDelete, onSelect, ...other } = props;

  return (
    <MenuItem selected={selected} onClick={() => onSelect(viewId)} {...other} sx={{justifyContent:"space-between", gap:3}}>
      {view.label}
      <IconButton
        edge="end"
        aria-label="delete"
        size="small"
        onClick={(event) => {
          event.stopPropagation();
          onDelete(viewId);
        }}
      >
        <GridDeleteIcon />
      </IconButton>
    </MenuItem>
  );
}

export default ViewListItem;
