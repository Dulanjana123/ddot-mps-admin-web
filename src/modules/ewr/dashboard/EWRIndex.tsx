import CdCard from "@atoms/Card/CdCard";
import { CdContainer } from "@atoms/index";
import CdBaseMap from "@atoms/Map/CdBaseMap";
import { ewrIndex } from "@data/datagrid-data/ewr-datagrids";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "@enums/components/Container";
import { ProcessingMode } from "@enums/components/datagrid-enum";
import { ToastVariant } from "@enums/components/snackbar-enum";
import { GridInterfaceCode } from "@enums/grid-interface-code";
import { usePrompt } from "@hooks/usePrompt";
import { FilterItems } from "@interfaces/components/datagrid";
import { Coordinate } from "@interfaces/components/map-data";
import {
  EwrAssignInitialDto,
  EwrBulkAssignDto,
} from "@interfaces/request/ewr-assign-dto";
import { EwrFiltersDto } from "@interfaces/request/ewr-filters-dto";
import { GetPaginatedListDto } from "@interfaces/request/paginated-list-dto";
import { EwrResponseDto } from "@interfaces/response/ewr-response-dto";
import { GridInitialState } from "@interfaces/shared/mui-pro.interface";
import { useGridApiRef } from "@mui/x-data-grid-pro";
import CdDataGrid from "@organisms/DataGrid/CdDataGrid";
import { ewrService } from "@services/api/ewr-service";
import { getResponseMessage } from "@utils/get-response";
import { formatDateDefault } from "@utils/helper/format-date";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";
import { H3 } from "src/AbstractElements";
import AssignReassignForm from "../detail-work-request/tabs/AssignReassignForm";
import QuickFilters from "./QuickFilters";

// Keep this hardcoded values until Authentication completed
const USER_ID = 1;

const initialState: GridInitialState = {
  pagination: { paginationModel: { pageSize: 5 } },
};

const EWRIndex = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [mapCoordinates, setMapCoordinates] = useState<Coordinate[]>();

  const [filterItems, setFilterItems] = useState<FilterItems>();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [isDirty, setIsDirty] = useState(false);
  const [isLoadingEwrAssign, setIsLoadingEwrAssign] = useState(false);

  const [paginatedRequest, setPaginatedRequest] = useState<GetPaginatedListDto>(
    {
      pagingAndSortingInfo: {
        paging: {
          pageNo: 1,
          pageSize: paginationModel.pageSize,
        },
      },
    }
  );

  const [assignFormInitial, setAssignFormInitial] =
    useState<EwrAssignInitialDto>();

  const ewrIndexApiRef = useGridApiRef();

  const navigate = useNavigate();

  useEffect(() => {
    const filters: EwrFiltersDto = {};
    filterItems?.items.forEach((item) => {
      if (item.field.includes("Date")) {
        const dateValue = formatDateDefault(item.value);
        if (dateValue !== "N/A") {
          filters[item.field] = dateValue;
        }
      } else {
        filters[item.field] = item.value;
      }
    });
    setPaginatedRequest({
      ...paginatedRequest,
      filters: filters,
      pagingAndSortingInfo: {
        paging: {
          pageNo: paginationModel.page + 1,
          pageSize: paginationModel.pageSize,
        },
      },
    });
  }, [paginationModel, filterItems]);

  useEffect(() => {
    setPaginatedList();
  }, [paginatedRequest]);

  const onFilterChange = (event: FilterItems) => {
    setFilterItems(event);
  };

  const setPaginatedList = async () => {
    await ewrService.getPaginatedList(paginatedRequest).then((response) => {
      const ewrList: EwrResponseDto[] = response.data?.entities || [];
      generateCoordinates(ewrList);
      setRowCount(response.data?.pagination?.length || 0);
      setRows(ewrList);
    });
  };

  const generateCoordinates = (ewrList: EwrResponseDto[]) => {
    const coordinates = ewrList.map((row) => ({
      x: Number(row.xCoord),
      y: Number(row.yCoord),
    }));
    setMapCoordinates(coordinates);
  };

  const onRowClick = (data: any) => {
    if (data.row.requestId)
      navigate(`/ewr/detail-work-request?id=${data.row.requestId}`);
  };

  const onAssignHandler: SubmitHandler<any> = async (assignEwrData) => {
    const selectedRowIds = Array.from(
      ewrIndexApiRef.current.getSelectedRows().keys()
    ).map((id) => Number(id));

    if (selectedRowIds.length > 0 && isDirty) {
      const ewrBulkAssignRequest: EwrBulkAssignDto = {
        ewrApplicationIds: selectedRowIds,
        assigneeId: parseInt(assignEwrData.assigneeId),
        ewrStatusId: parseInt(assignEwrData.ewrStatusId),
        inspStatusId: parseInt(assignEwrData.inspStatusId),
        comments: assignEwrData.comments,
      };
      const response = await ewrService.updateEwrBulkAssigning(
        ewrBulkAssignRequest
      );
      if (response) {
        setPaginatedList();
        ewrIndexApiRef.current.setRowSelectionModel([]);
        enqueueSnackbar(getResponseMessage(response.message), {
          variant: response.success ? ToastVariant.Success : ToastVariant.Error,
        });
        setIsLoadingEwrAssign(false);
        setAssignFormInitial({
          assigneeId: "",
          inspStatusId: "",
          ewrStatusId: "",
          comments: "",
        });
        setIsDirty(false);
      }
    }
  };

  usePrompt({
    isDirty,
  });

  return (
    <CdContainer fluid>
      <Row>
        <Col md="3" className="d-flex flex-column">
          <CdCard className="w-100">
            {mapCoordinates && <CdBaseMap coordinates={mapCoordinates} />}
          </CdCard>
        </Col>
        <Col md="9" className="d-flex flex-column">
          <CdCard className="w-100">
            <CardBody>
              <CdContainer
                flex
                alignItems={AlignItems.baseline}
                justifyContent={JustifyContent.end}
                flexDirection={FlexDirection.row}
                className="pb-2"
              >
                <QuickFilters setFilterItems={setFilterItems} />
              </CdContainer>
              <div>
                <CdDataGrid
                  height={550}
                  apiRef={ewrIndexApiRef}
                  columns={ewrIndex.columns}
                  rows={rows}
                  setRows={setRows}
                  disableColumnFilter={true}
                  getRowId={(row: any) => row?.requestId}
                  initialState={initialState}
                  headerFilters={true}
                  hideToolbar={true}
                  filterMode={ProcessingMode.Server}
                  onFilterChange={onFilterChange}
                  onRowClick={onRowClick}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  pageSizeOptions={[10, 25, 100]}
                  rowCount={rowCount}
                  paginationMode={ProcessingMode.Server}
                  headerFilterMenu={null} // null need to be passed to disable the default filter header menu
                  enableStateSave={true}
                  userId={USER_ID}
                  interfaceId={GridInterfaceCode.EWRIndex}
                  checkboxSelection
                  autoHeight={false}
                />
              </div>
            </CardBody>
          </CdCard>
        </Col>
      </Row>
      <CdCard>
        <CardBody>
          <H3 className="mb-2">Assign / Reassign</H3>
          <AssignReassignForm
            onSubmit={onAssignHandler}
            isLoading={isLoadingEwrAssign}
            setIsDirty={setIsDirty}
            isDirty={isDirty}
            bulkAssigningEnable
            formInitial={assignFormInitial}
          />
        </CardBody>
      </CdCard>
    </CdContainer>
  );
};

export default EWRIndex;
