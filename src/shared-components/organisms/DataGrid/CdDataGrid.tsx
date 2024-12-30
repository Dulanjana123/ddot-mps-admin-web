import { DatagridStateDto, DatagridStateRequest } from '@interfaces/request/datagrid-state-dto';
import {
  ApiRefType,
  DataGridProProps,
  GridColDef,
  GridColumnGroupingModel,
  GridDensity,
  GridInitialState,
  GridPinnedRowsProp,
  GridRowOrderChangeParams,
} from '@interfaces/shared/mui-pro.interface';
import { CdColumnMenu } from '@molecules/index';
import { DataGridPro, GridColumnVisibilityModel, GridRowClassNameParams, GridToolbarProps } from '@mui/x-data-grid-pro';
import { datagridStateService } from '@services/api/datagrid-state-service';
import React, { useEffect, useState } from 'react';
import CustomToolbar from './CustomToolbar';
import { Density, ProcessingMode } from '@enums/components/datagrid-enum';

export interface RowHighLight {
  highlightField: string;
  highlightRows: any[];
}

interface DataGridProps extends DataGridProProps {
  apiRef?: ApiRefType;
  rows: any;
  setRows?: (args: any) => void;
  getRowId?: any;
  getRowClassName?: any;
  columns: GridColDef[];
  rowCount?: number;
  initialState?: GridInitialState;
  pinnedRows?: GridPinnedRowsProp;
  hideToolbar?: boolean;
  height?: number;
  checkboxSelection?: boolean;
  disableRowSelectionOnClick?: boolean;
  columnMenuSlots?: any;
  columnMenuSlotProps?: any;
  disableColumnFilter?: boolean;
  disableColumnSelector?: boolean;
  disableDensitySelector?: boolean;
  disableColumnMenu?: boolean;
  columnGroupingModel?: GridColumnGroupingModel;
  density?: GridDensity;
  getDetailPanelHeight?: any;
  getDetailPanelContent?: any;
  rowReordering?: boolean;
  treeData?: boolean;
  getTreeDataPath?: DataGridProProps['getTreeDataPath'];
  onRowClick?: (args: any) => void;
  headerFilters?: boolean;
  filterMode?: ProcessingMode;
  onFilterChange?: (args: any) => void;
  pageSizeOptions?: any;
  pagination?: boolean;
  paginationModel?: any;
  onPaginationModelChange?: (args: any) => void;
  paginationMode?: ProcessingMode;
  headerFilterMenu?: any;
  enableStateSave?: boolean;
  tableState?: GridToolbarProps;
  setTableState?: (args: GridToolbarProps) => void;
  showQuickFilter?: boolean;
  userId?: number;
  interfaceId?: number;
  exportAll?: () => void;
  columnVisibilityModel?: any;
  onColumnVisibilityModelChange?: (arg: GridColumnVisibilityModel) => void;
  getRowHeight?: (args: any) => number;
  autoHeight?: boolean;
  highlightRow?: RowHighLight;
}

const updateRowPosition = (initialIndex: number, newIndex: number, rows: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        const rowsClone = [...rows];
        const row = rowsClone.splice(initialIndex, 1)[0];
        rowsClone.splice(newIndex, 0, row);
        resolve(rowsClone);
      },
      Math.random() * 500 + 100,
    ); // simulate network latency
  });
};

const CdDataGrid: React.FC<DataGridProps> = ({
  apiRef,
  rows,
  setRows,
  getRowId,
  getRowClassName,
  columns,
  rowCount,
  initialState,
  pinnedRows,
  checkboxSelection,
  disableRowSelectionOnClick,
  height,
  hideToolbar,
  columnMenuSlots,
  columnMenuSlotProps,
  disableColumnFilter,
  disableColumnSelector,
  disableDensitySelector,
  disableColumnMenu,
  density = Density.Standard,
  columnGroupingModel,
  getDetailPanelHeight,
  getDetailPanelContent,
  rowReordering = false,
  treeData = false,
  getTreeDataPath,
  onRowClick,
  headerFilters = false,
  filterMode = ProcessingMode.Client,
  onFilterChange,
  pageSizeOptions = [25, 50, 100],
  pagination = true,
  paginationModel,
  onPaginationModelChange,
  paginationMode = ProcessingMode.Client,
  headerFilterMenu = null,
  enableStateSave = false,
  showQuickFilter = false,
  userId,
  interfaceId,
  exportAll,
  columnVisibilityModel,
  onColumnVisibilityModelChange,
  getRowHeight,
  autoHeight = true,
  highlightRow,
  ...props
}) => {
  const [tableState, setTableState] = useState<GridToolbarProps>();
  const [settingsGridStateId, setSettingsGridStateId] = useState(0);

  useEffect(() => {
    if (userId && interfaceId) {
      const request: DatagridStateRequest = {
        userId: userId,
        interfaceId: interfaceId,
      };
      setDatagridState(request);
    }
  }, []);

  useEffect(() => {
    if (settingsGridStateId) {
      updateDatagridState(settingsGridStateId, {
        gridObjectJson: JSON.stringify(tableState),
      });
    }
  }, [tableState]);

  const updateDatagridState = async (settingsGridStateId: number, reqest: DatagridStateDto) => {
    await datagridStateService.updateDatagridState(settingsGridStateId, reqest);
  };

  const setDatagridState = async (request: DatagridStateRequest) => {
    const response = await datagridStateService.getDatagridStateByUserAndInterface({
      interfaceId: request.interfaceId,
      userId: request.userId,
    });
    if (response.success) {
      const gridState: Record<string, any> = response.data?.gridObjectJson ?? {};
      const jsonConvertedObj = JSON.parse(gridState.toString());
      setTableState(jsonConvertedObj);
      setSettingsGridStateId(response.data?.settingsGridStateId ?? 0);
    } else {
      await datagridStateService.createDatagridState({
        interfaceId: request.interfaceId,
        userId: request.userId,
        isActive: true,
        gridObjectJson: JSON.stringify(tableState),
      });
    }
  };

  const handleRowOrderChange = async (params: GridRowOrderChangeParams) => {
    const newRows = await updateRowPosition(params.oldIndex, params.targetIndex, rows);
    if (setRows) {
      setRows(newRows);
    }
  };

  const highlightRowClassName = (params: GridRowClassNameParams) => {
    if (!highlightRow) return '';

    const { highlightField, highlightRows } = highlightRow;
    return highlightRows.some((row) => row === params.row[highlightField]) ? 'highlight-row' : '';
  };

  return (
    <div style={{ height: height ? height : '100%', width: '100%' }}>
      <DataGridPro
        apiRef={apiRef}
        sx={{
          '& .super-app-theme--header': {
            backgroundColor: '#EDF1FA',
          },
          '.MuiTablePagination-displayedRows': {
            marginTop: '1em',
            marginBottom: '1em',
          },
          '.MuiTablePagination-selectLabel': {
            marginTop: '1em',
            marginBottom: '1em',
          },
          '.highlight-row': {
            backgroundColor: '#E7F1FF', // Highlight color
            '&:hover': {
              backgroundColor: '#7ba6e2', // Hover effect for highlighted rows
            },
          },
          height: height,
          borderRadius: '12px',
        }}
        hideFooterSelectedRowCount={true}
        getRowId={getRowId}
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        editMode="row"
        checkboxSelection={checkboxSelection}
        disableColumnMenu={disableColumnMenu}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        disableColumnFilter={disableColumnFilter}
        disableColumnSelector={disableColumnSelector}
        disableDensitySelector={disableDensitySelector}
        slots={{
          toolbar: hideToolbar ? null : CustomToolbar,
          columnMenu: CdColumnMenu,
          headerFilterMenu: headerFilterMenu,
        }}
        slotProps={{
          toolbar: {
            hidden: hideToolbar,
            tableState: tableState,
            setTableState: setTableState,
            showQuickFilter: showQuickFilter,
            enableStateSave,
            exportAll,
          },
          columnMenu: {
            slots: columnMenuSlots,
            slotProps: columnMenuSlotProps,
          },
        }}
        columnGroupingModel={columnGroupingModel}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}
        rowReordering={rowReordering} // row reordering doesn't work properly with pinned rows
        onRowOrderChange={handleRowOrderChange}
        onRowClick={onRowClick}
        initialState={{
          ...initialState,
          density: density,
        }}
        pinnedRows={pinnedRows}
        treeData={treeData}
        getTreeDataPath={getTreeDataPath}
        headerFilters={headerFilters}
        filterMode={filterMode} // `filterMode="server"` prop is not available when the `treeData` is enabled.
        onFilterModelChange={onFilterChange}
        pagination={pagination}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        paginationMode={paginationMode} // `rowCount` prop must be passed using `paginationMode='server'`
        getRowClassName={(params) => `${getRowClassName} ${highlightRowClassName(params)}`}
        localeText={{ noRowsLabel: 'No records found.' }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={onColumnVisibilityModelChange}
        getRowHeight={getRowHeight}
        autoHeight={autoHeight}
        {...props}
      />
    </div>
  );
};

export default CdDataGrid;
