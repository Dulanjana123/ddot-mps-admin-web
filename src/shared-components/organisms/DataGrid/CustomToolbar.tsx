import { DatagridViewState } from "@interfaces/components/datagrid";
import {
  Button,
  ClickAwayListener,
  Fade,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import {
  GridCsvExportMenuItemProps,
  GridDeleteIcon,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarProps,
  useGridApiContext,
} from "@mui/x-data-grid-pro";
import { datagridReducer } from "@utils/datagrid-utils";
import React, { FC, useEffect } from "react";
import NewViewListButton from "./NewViewListButton";
import ViewListItem from "./ViewListItem";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

interface CustomToolbarProps extends GridToolbarProps {
  tableState?: GridToolbarProps;
  setTableState?: (args: GridToolbarProps) => void;
  enableStateSave?: boolean;
  exportAll?: () => void;
}

const initialState: DatagridViewState = {
  views: {},
  newViewLabel: "",
  isMenuOpened: false,
  menuAnchorEl: null,
  activeViewId: null,
};

const CustomToolbar: FC<CustomToolbarProps> = ({
  tableState,
  setTableState,
  enableStateSave,
  exportAll,
}) => {
  const apiRef = useGridApiContext();
  const [state, dispatch] = React.useReducer(datagridReducer, initialState);

  // Sync tableState prop with local state on mount or tableState changes
  useEffect(() => {
    if (tableState) {
      dispatch({ type: "setState", value: tableState });
    }
  }, [tableState]);

  const createNewView = () => {
    if (setTableState) {
      const viewId = `view_${Date.now()}`;
      setTableState({
        ...tableState,
        activeViewId: viewId,
        views: {
          ...state.views,
          [viewId]: {
            label: state.newViewLabel,
            value: apiRef.current.exportState(),
          },
        },
        newViewLabel: "",
      });
    }
  };

  const handleNewViewLabelChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: "setNewViewLabel", label: event.target.value });
  };

  const handleDeleteView = React.useCallback(
    (viewId: string) => {
      dispatch({ type: "deleteView", id: viewId });
      if (setTableState) {
        const updatedViews = Object.fromEntries(
          Object.entries(state.views).filter(([id]) => id !== viewId)
        );

        // Set the active view: if the deleted view was active, set another view as active
        let newActiveViewId: string | null;
        if (state.activeViewId === viewId) {
          const remainingViewIds = Object.keys(updatedViews);
          newActiveViewId =
            remainingViewIds.length > 0 ? remainingViewIds[0] : null;
        } else {
          newActiveViewId = state.activeViewId;
        }

        // Update parent state via setTableState
        setTableState({
          ...tableState,
          views: updatedViews,
          activeViewId: newActiveViewId,
          newViewLabel: "", // Reset new view label
        });
      }
    },
    [state.views, state.activeViewId, setTableState, tableState]
  );

  const handleSetActiveView = (viewId: string) => {
    apiRef.current.restoreState(state.views[viewId].value);
    dispatch({ type: "setActiveView", id: viewId });
  };

  const handlePopperAnchorClick = (event: React.MouseEvent) => {
    dispatch({
      type: "togglePopper",
      element: event.currentTarget as HTMLElement,
    });
    event.stopPropagation();
  };

  const handleClosePopper = () => {
    dispatch({ type: "closePopper" });
  };

  const isNewViewLabelValid = React.useMemo(() => {
    if (state.newViewLabel.length === 0) {
      return false;
    }

    return Object.values(state.views).every(
      (view) => view.label !== state.newViewLabel
    );
  }, [state.views, state.newViewLabel]);

  const canBeMenuOpened = state.isMenuOpened && Boolean(state.menuAnchorEl);
  const popperId = canBeMenuOpened ? "transition-popper" : undefined;

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      dispatch({ type: "closePopper" });
    } else if (event.key === "Escape") {
      dispatch({ type: "closePopper" });
    }
  };

  const GridCsvExportMenuItem = (props: GridCsvExportMenuItemProps) => {
    const { hideMenu, options, ...other } = props;

    return (
      <Button
        startIcon={<FileDownloadOutlinedIcon />}
        variant="text"
        sx={{ textTransform: "none", padding: "0", margin: "0 8px" }} // Adjust styles as needed
        onClick={exportAll} // Attach the exportAll handler here
        {...other}
      >
        EXPORT
      </Button>
    );
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      {exportAll ? <GridCsvExportMenuItem /> : <GridToolbarExport />}
      {enableStateSave && (
        <>
          <Button
            aria-describedby={popperId}
            type="button"
            size="small"
            id="custom-view-button"
            aria-controls={state.isMenuOpened ? "custom-view-menu" : undefined}
            aria-expanded={state.isMenuOpened ? "true" : undefined}
            aria-haspopup="true"
            onClick={handlePopperAnchorClick}
          >
            Custom view ({Object.keys(state.views).length})
          </Button>
          <ClickAwayListener onClickAway={handleClosePopper}>
            <Popper
              id={popperId}
              open={state.isMenuOpened}
              anchorEl={state.menuAnchorEl}
              role={undefined}
              transition
              placement="bottom-start"
              sx={{ zIndex: "modal" }}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <MenuList
                      autoFocusItem={state.isMenuOpened}
                      id="custom-view-menu"
                      aria-labelledby="custom-view-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {Object.entries(state.views).map(([viewId, view]) => (
                        <ViewListItem
                          key={viewId}
                          view={view}
                          viewId={viewId}
                          selected={viewId === state.activeViewId}
                          onDelete={handleDeleteView}
                          onSelect={handleSetActiveView}
                        />
                      ))}
                    </MenuList>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </ClickAwayListener>
          <NewViewListButton
            label={state.newViewLabel}
            onLabelChange={handleNewViewLabelChange}
            onSubmit={createNewView}
            isValid={isNewViewLabelValid}
          />
        </>
      )}
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
