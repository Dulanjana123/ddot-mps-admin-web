import { Divider, IconButton, List, ListItem, Popover } from "@mui/material";
import { GridMoreVertIcon } from "@mui/x-data-grid-pro";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FeatherIcons } from "src/AbstractElements";
import { datagridActionType } from "src/types/modules/DatagridActionTypes";

type ActionPopoverProps = {
  itemId: number;
  anchorOrigin?: any;
  transformOrigin?: any;
  actions: datagridActionType[];
}

const CdActionPopover : React.FC<ActionPopoverProps> = ({
  itemId,
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOrigin={
    vertical: "top",
    horizontal: "right",
  },
  actions
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <GridMoreVertIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <List className="px-2">
          {actions.map((data, index) => (
            <div key={index}>
              <ListItem key={index}>
                <Link
                  to={data.link + `?id=${itemId}`}
                  className="d-flex align-items-center gap-3 popover-listItem"
                >
                  <FeatherIcons className="popover-icon" iconName={data.icon} />
                  <span>{data.name}</span>
                </Link>
              </ListItem>
              {actions.length > index + 1 && (
                <Divider sx={{ bgcolor: "black" }} />
              )}
            </div>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default CdActionPopover;
