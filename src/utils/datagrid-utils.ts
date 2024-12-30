import { DatagridViewState } from "@interfaces/components/datagrid";
import { GridColDef, GridInitialState, GridToolbarProps } from "@interfaces/shared/mui-pro.interface";

type ViewActions =
  | { type: "setState"; value: GridToolbarProps }   
  | { type: "createView"; value: GridInitialState }
  | { type: "deleteView"; id: string }
  | { type: "setNewViewLabel"; label: string }
  | { type: "setActiveView"; id: string | null }
  | { type: "togglePopper"; element: HTMLElement }
  | { type: "closePopper" };

export const datagridReducer: React.Reducer<DatagridViewState, ViewActions> = (
  state,
  action
) => {
  switch (action.type) {
    case "setState": {
      return {
        ...state,
        ...action.value,
      };
    }
    case "createView": {
      const id = Math.random().toString();

      return {
        ...state,
        activeViewId: id,
        newViewLabel: "",
        views: {
          ...state.views,
          [id]: { label: state.newViewLabel, value: action.value },
        },
      };
    }

    case "deleteView": {
      const views = Object.fromEntries(
        Object.entries(state.views).filter(([id]) => id !== action.id)
      );

      let activeViewId: string | null;
      if (state.activeViewId !== action.id) {
        activeViewId = state.activeViewId;
      } else {
        const viewIds = Object.keys(state.views);

        if (viewIds.length === 0) {
          activeViewId = null;
        } else {
          activeViewId = viewIds[0];
        }
      }

      return {
        ...state,
        views,
        activeViewId,
      };
    }

    case "setActiveView": {
      return {
        ...state,
        activeViewId: action.id,
        isMenuOpened: false,
      };
    }

    case "setNewViewLabel": {
      return {
        ...state,
        newViewLabel: action.label,
      };
    }

    case "togglePopper": {
      return {
        ...state,
        isMenuOpened: !state.isMenuOpened,
        menuAnchorEl: action.element,
      };
    }

    case "closePopper": {
      return {
        ...state,
        isMenuOpened: false,
      };
    }

    default: {
      return state;
    }
  }
};

export const generateColumnVisibilityModel = (columns: GridColDef[], defaultVisibleColumns: string[]) => {
  return columns.reduce(
    (visibilityModel, column) => {
      if (defaultVisibleColumns.includes(column.field)){
        visibilityModel[column.field] = true;
      }else {
        visibilityModel[column.field] = false;
      }
      
      return visibilityModel;
    },
    {} as Record<string, boolean>,
  );
};

export const getVisibleRowsCount = (currentPage: number, totalRowsCount: number, pageSize: number) => {
  return currentPage == Math.floor(totalRowsCount / pageSize) ? Math.floor(totalRowsCount % pageSize) : pageSize;
};
