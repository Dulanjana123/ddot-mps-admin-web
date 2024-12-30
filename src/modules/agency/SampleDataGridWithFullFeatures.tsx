import { CdButton, CdContainer } from "@atoms/index";
import Breadcrumbs from "@common-elements/Breadcrumbs/Breadcrumbs";
import { ProcessingMode } from "@enums/components/datagrid-enum";
import { FilterItems } from "@interfaces/components/datagrid";
import {
  DataGridProProps,
  GridColDef,
  GridColumnGroupingModel,
  GridInitialState,
  GridPinnedRowsProp,
  GridToolbarProps,
} from "@interfaces/shared/mui-pro.interface";
import CdDataGrid from "@organisms/DataGrid/CdDataGrid";
import { useCallback, useEffect, useState } from "react";
import { Card, CardBody, Container } from "reactstrap";

const columns: GridColDef[] = [
  {
    field: "expense",
    headerName: "Expense",
    width: 160,
    editable: true,
    flex: 1,
    minWidth: 100,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 120,
    editable: false,
    flex: 1,
    minWidth: 100,
  },
  {
    field: "dueAt",
    headerName: "Due at",
    type: "date",
    width: 120,
    editable: true,
    flex: 1,
    minWidth: 100,
  },
  {
    field: "isPaid",
    headerName: "Is paid?",
    type: "boolean",
    width: 140,
    editable: true,
    flex: 1,
    minWidth: 100,
  },
  {
    field: "paymentMethod",
    headerName: "Payment method",
    type: "singleSelect",
    valueOptions: ["Credit card", "Wire transfer", "Cash"],
    width: 160,
    editable: true,
    flex: 1,
    minWidth: 100,
    preProcessEditCellProps: (params) => {
      const isPaidProps = params.otherFieldsProps!.isPaid;
      const hasError = isPaidProps.value && !params.props.value;
      return { ...params.props, error: hasError };
    },
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    filterable: false,
    editable: false,
    flex: 1,
    minWidth: 100,
    renderCell: (params) => {
      return (
        <CdContainer>
          <CdButton
            id="edit"
            onClick={() => {
              alert("Row ID is" + params.row.id);
            }}
          >
            Edit
          </CdButton>
        </CdContainer>
      );
    },
  },
];

const initialState: GridInitialState = {
  pinnedColumns: { left: ["price"], right: ["action"] },
  pagination: { paginationModel: { pageSize: 5 } },
};

const pinnedRows: GridPinnedRowsProp = {
  top: [
    {
      id: 2,
      expense: "Rent",
      price: 50,
      dueAt: new Date(2021, 7, 1),
      isPaid: false,
      paymentMethod: "",
    },
  ],
  bottom: [],
};

const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: "Pricing",
    children: [{ field: "expense" }, { field: "price" }, { field: "dueAt" }],
  },
  {
    groupId: "Payment Info",
    children: [{ field: "isPaid" }, { field: "paymentMethod" }],
  },
];

function DetailPanelContent({ row: rowProp }: { row: any }) {
  return <div>{rowProp.expense}</div>;
}

const SampleDataGridWithFullFeatures = () => {
  const getDetailPanelContent = useCallback<
    NonNullable<DataGridProProps["getDetailPanelContent"]>
  >(({ row }) => <DetailPanelContent row={row} />, []);

  const getDetailPanelHeight = useCallback(() => 100, []);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  const [rows, setRows] = useState([
    {
      path: ["bill"], // path is mandatory to apply tree data. If not we can remove path
      id: 1,
      expense: "Bill total",
      price: 150,
      dueAt: new Date(2021, 6, 8),
      isPaid: false,
      paymentMethod: "",
    },
    {
      path: ["bill", "light"],
      id: 2,
      expense: "Light bill",
      price: 50,
      dueAt: new Date(2021, 6, 8),
      isPaid: false,
      paymentMethod: "",
    },
    {
      path: ["rent"],
      id: 3,
      expense: "Rent total",
      price: 50,
      dueAt: new Date(2021, 7, 1),
      isPaid: false,
      paymentMethod: "",
    },
    {
      path: ["rent", "home"],
      id: 4,
      expense: "Home Rent",
      price: 50,
      dueAt: new Date(2021, 7, 1),
      isPaid: false,
      paymentMethod: "",
    },
    {
      path: ["insurance"],
      id: 5,
      expense: "Total insurance",
      price: 70,
      dueAt: new Date(2021, 7, 4),
      isPaid: true,
      paymentMethod: "Wire transfer",
    },
    {
      path: ["insurance", "car"],
      id: 6,
      expense: "Car insurance",
      price: 50,
      dueAt: new Date(2021, 7, 4),
      isPaid: true,
      paymentMethod: "Wire transfer",
    },
    {
      path: ["bill", "water"],
      id: 7,
      expense: "Water bill",
      price: 60,
      dueAt: new Date(2021, 8, 8),
      isPaid: true,
      paymentMethod: "Credit card",
    },
    {
      path: ["fees"],
      id: 8,
      expense: "Total Fees",
      price: 20,
      dueAt: new Date(2021, 7, 15),
      isPaid: false,
      paymentMethod: "",
    },
    {
      path: ["fees", "school"],
      id: 9,
      expense: "School Fees",
      price: 20,
      dueAt: new Date(2021, 7, 15),
      isPaid: false,
      paymentMethod: "",
    },
    {
      path: ["insurance", "bike"],
      id: 10,
      expense: "Bike insurance",
      price: 35,
      dueAt: new Date(2021, 8, 4),
      isPaid: true,
      paymentMethod: "Cash",
    },
  ]);

  const [tableState, setTableState] = useState<GridToolbarProps>();

  useEffect(() => {
    setTableState({
      views: {
        "0.7043191431180014": {
          label: "name 1",
          value: {
            pinnedColumns: {
              left: [],
              right: ["action"],
            },
            columns: {
              columnVisibilityModel: {},
              orderedFields: [
                "__detail_panel_toggle__",
                "__reorder__",
                "expense",
                "price",
                "dueAt",
                "isPaid",
                "paymentMethod",
                "action",
              ],
            },
            filter: {
              filterModel: {
                items: [],
                logicOperator: "and",
                quickFilterValues: [],
                quickFilterLogicOperator: "and",
              },
            },
            sorting: {
              sortModel: [],
            },
            pagination: {
              meta: {},
              paginationModel: {
                page: 0,
                pageSize: 25,
              },
              rowCount: 5,
            },
          },
        },
      },
      activeViewId: "0.7043191431180014",
    });
  }, []);

  // to convert the data with paths to apply tree data
  const getTreeDataPath: DataGridProProps["getTreeDataPath"] = (row) =>
    row.path;

  const onFilterChange = (event: FilterItems) => {};

  return (
    <div className="page-body">
      <Breadcrumbs mainTitle={"View Reviewer Agencies"} parent="Agency" />
      <Container fluid>
        <Card>
          <CardBody>
            <CdContainer className="p-0 mt-3">
              <CdDataGrid
                rows={rows}
                setRows={setRows}
                columns={columns}
                columnGroupingModel={columnGroupingModel}
                getDetailPanelHeight={getDetailPanelHeight}
                getDetailPanelContent={getDetailPanelContent}
                rowReordering={true}
                initialState={initialState}
                // pinnedRows={pinnedRows}
                treeData={false}
                getTreeDataPath={getTreeDataPath}
                headerFilters={true}
                filterMode={ProcessingMode.Server}
                onFilterChange={onFilterChange}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 25]}
                rowCount={5}
                paginationMode={ProcessingMode.Server}
                headerFilterMenu={null} // null need to be passed to disable the default filter header menu
                enableStateSave={true}
                tableState={tableState}
                setTableState={setTableState}
                showQuickFilter={true}
              />
            </CdContainer>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default SampleDataGridWithFullFeatures;
