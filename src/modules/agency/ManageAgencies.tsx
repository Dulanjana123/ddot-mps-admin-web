import { CdActionPopover, CdButton, CdContainer } from "@atoms/index";
import Breadcrumbs from "@common-elements/Breadcrumbs/Breadcrumbs";
import { agencyDataGridActions } from "@data/datagrid-data/action-data";
import { Variant } from "@enums/components/CommonEnum";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "@enums/components/Container";
import { ProcessingMode } from "@enums/components/datagrid-enum";
import { FilterItems } from "@interfaces/components/datagrid";
import { GetPaginatedListDto } from "@interfaces/request/paginated-list-dto";
import { ReviewerAgencyDto } from "@interfaces/request/reviewer-agency-dto";
import {
  GridColDef,
  GridInitialState,
} from "@interfaces/shared/mui-pro.interface";
import CdDataGrid from "@organisms/DataGrid/CdDataGrid";
import { reviewerAgencyService } from "@services/api/reviewer-agency-service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Container } from "reactstrap";
import { downloadAsCSV } from "@utils/helper/download-as-csv";
import { GridColumnVisibilityModel } from "@mui/x-data-grid-pro";
import { GridInterfaceCode } from "@enums/grid-interface-code";

// Keep this hardcoded values until Authentication completed
const USER_ID = 1;

const initialState: GridInitialState = {
  pagination: { paginationModel: { pageSize: 5 } },
};

const columns: GridColDef[] = [
  {
    field: "agencyCode",
    headerName: "Agency Code",
    type: "string",
    width: 160,
    editable: false,
    flex: 1,
    minWidth: 100,
  },
  {
    field: "agencyName",
    headerName: "Agency Name",
    type: "string",
    width: 120,
    editable: false,
    flex: 1,
    minWidth: 100,
  },
  {
    field: "agencyAddress",
    headerName: "Agency Address",
    type: "string",
    width: 120,
    editable: false,
    flex: 1,
    minWidth: 100,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    filterable: false,
    editable: false,
    width: 100,
    renderCell: (params) => {
      return (
        <CdActionPopover
          itemId={params.row.agencyId}
          actions={agencyDataGridActions}
        />
      );
    },
  },
];

const ManageAgencies = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const [filterItems, setFilterItems] = useState<FilterItems>();
  const [filters, setFilters] = useState({});

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    const filtersApplied = {};
    filterItems?.items.forEach((item) => {
      filtersApplied[item.field] = item.value;
    });
    setFilters(filtersApplied);
  }, [filterItems]);

  useEffect(() => {
    const paginatedRequest: GetPaginatedListDto = {
      pagingAndSortingInfo: {
        paging: {
          pageNo: paginationModel.page + 1,
          pageSize: paginationModel.pageSize,
        },
      },
      filters: filters,
    };
    setPaginatedList(paginatedRequest);
  }, [paginationModel, filters]);

  const onFilterChange = (event: FilterItems) => {
    setFilterItems(event);
  };

  const setPaginatedList = async (request: GetPaginatedListDto) => {
    const response = await reviewerAgencyService.getPaginatedList(request);
    const agencyList: ReviewerAgencyDto[] = response.data?.entities || [];
    setRowCount(response.data?.pagination?.length || 0);
    setRows(agencyList);
  };

  // For Export Feature
  const csvHeaders = [
    { label: "Agency Code", key: "agencyCode" },
    { label: "Agency Name", key: "agencyName" },
    { label: "Agency Address", key: "agencyAddress" },
  ];

  const [columnsVisibilityModel, setColumnVisibilityMode] =
    useState<GridColumnVisibilityModel>({});

  const exportAll = async () => {
    const getAllRequest: GetPaginatedListDto = {
      pagingAndSortingInfo: {
        paging: {
          pageNo: 1,
          pageSize: rowCount,
        },
      },
      filters: filters,
    };
    const response = await reviewerAgencyService.getPaginatedList(
      getAllRequest
    );
    const agencyList: ReviewerAgencyDto[] = response.data?.entities || [];
    downloadAsCSV(agencyList, csvHeaders, columnsVisibilityModel, "Agency List");
  };

  const onColumnVisibilityModelChange = (
    newModal: GridColumnVisibilityModel
  ) => {
    setColumnVisibilityMode(newModal);
  };

  return (
    <div className="page-body">
      <Breadcrumbs mainTitle={"Reviewer Agency Index"} parent="Agency" />
      <Container fluid>
        <Card>
          <CardBody>
            <CdContainer
              flex
              alignItems={AlignItems.baseline}
              justifyContent={JustifyContent.end}
              flexDirection={FlexDirection.row}
            >
              <Link to="/agency/add">
                <CdButton color={Variant.primary} id="add_new">
                  Add New
                </CdButton>
              </Link>
            </CdContainer>
            <CdContainer className="p-0 mt-3">
              <CdDataGrid
                height={500}
                rows={rows}
                setRows={setRows}
                disableColumnFilter={true}
                getRowId={(row: any) => row?.agencyId}
                columns={columns}
                rowReordering={true}
                initialState={initialState}
                headerFilters={true}
                hideToolbar={true}
                filterMode={ProcessingMode.Server}
                onFilterChange={onFilterChange}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10, 25, 100]}
                rowCount={rowCount}
                paginationMode={ProcessingMode.Server}
                headerFilterMenu={null} // null need to be passed to disable the default filter header menu
                enableStateSave={true}
                userId={USER_ID}
                interfaceId={GridInterfaceCode.AgencyIndex}
                exportAll={exportAll}
                onColumnVisibilityModelChange={onColumnVisibilityModelChange}
              />
            </CdContainer>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ManageAgencies;
