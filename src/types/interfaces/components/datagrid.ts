import {
  GridColDef,
  GridInitialState,
} from "@interfaces/shared/mui-pro.interface";

export interface FilterItems {
  items: FilterItem[];
}

export interface FilterItem {
  id?: number;
  field: string;
  operator?: string;
  value: string;
  fromInput?: string;
}

export interface StateView {
  label: string;
  value: GridInitialState;
}

export interface DatagridViewState {
  views: { [id: string]: StateView };
  newViewLabel: string;
  activeViewId: string | null;
  isMenuOpened: boolean;
  menuAnchorEl: HTMLElement | null;
}

export interface DatagridFixedData {
  title?: string;
  columns: GridColDef[];
}
