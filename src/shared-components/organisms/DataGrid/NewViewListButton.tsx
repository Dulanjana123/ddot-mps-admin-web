import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid-pro";
import React from "react";

function NewViewListButton(props: {
  label: string;
  onLabelChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: () => void;
  isValid: boolean;
}) {
  const { label, onLabelChange, onSubmit, isValid } = props;
  const [isAddingView, setIsAddingView] = React.useState(false);

  const handleSubmitForm: React.FormEventHandler = (event) => {
    onSubmit();
    setIsAddingView(false);
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Button
        endIcon={<GridAddIcon />}
        size="small"
        onClick={() => setIsAddingView(true)}
      >
        Save current view
      </Button>
      <Dialog onClose={() => setIsAddingView(false)} open={isAddingView}>
        <form onSubmit={handleSubmitForm}>
          <DialogTitle>New custom view</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              value={label}
              onChange={onLabelChange}
              margin="dense"
              size="small"
              label="Custom view label"
              variant="standard"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={() => setIsAddingView(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Create view
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default NewViewListButton;
