import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import CdCardBody from "@atoms/Card/CardBody";
import CdCard from "@atoms/Card/CdCard";
import {
  CdBadge,
  CdButton,
  CdContainer,
  CdDatePicker,
  CdLink,
  CdModal,
  CdSelectInput,
  CdTypography,
} from "@atoms/index";
import CdBaseMap from "@atoms/Map/CdBaseMap";
import { CommonMarkerPopupTemplate } from "@constants/arcgis-map-constants/pop-ups";
import { SelectionDatesOptions } from "@constants/selection-dates-options";
import { AlignItems, JustifyContent } from "@enums/components/Container";
import { ProcessingMode } from "@enums/components/datagrid-enum";
import { DateFormat } from "@enums/date-format-types";
import { GridInterfaceCode } from "@enums/grid-interface-code";
import { Coordinate } from "@interfaces/components/map-data";
import { OptionType } from "@interfaces/components/select";
import { EwrFiltersDto } from "@interfaces/request/ewr-filters-dto";
import { GetPaginatedListDto } from "@interfaces/request/paginated-list-dto";
import {
  EwrEmergencyCauseOption,
  EwrEmergencyTypeOption,
  EwrResponseDto,
  EwrStatusOption,
  SwoStatusOption,
  UserOption,
} from "@interfaces/response/ewr-response-dto";
import {
  GridColDef,
  GridInitialState,
} from "@interfaces/shared/mui-pro.interface";
import { CdSearchBox } from "@molecules/index";
import { useGridApiRef } from "@mui/x-data-grid-pro";
import CdColumnMenuPopup from "@organisms/DataGrid/CdColumnMenuPopup";
import CdFilterCheckboxItemsList, {
  FilterOnCheckedModel,
} from "@organisms/DataGrid/CdFilterCheckboxItemsList";
import CdFilterPopup from "@organisms/DataGrid/CdFilterPopup";
import { CdDataGrid } from "@organisms/index";
import { ewrService } from "@services/api/ewr-service";
import {
  generateColumnVisibilityModel,
  getVisibleRowsCount,
} from "@utils/datagrid-utils";
import {
  getVariantForEwrStatus,
  getVariantForSwoStatus,
  setDatesFromList,
} from "@utils/ewr-utils";
import { formatDate } from "@utils/format-date-utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignReassignForm from "../detail-work-request/tabs/AssignReassignForm";
import { SubmitHandler } from "react-hook-form";
import {
  EwrAssignDto,
  EwrAssignInitialDto,
  EwrBulkAssignDto,
} from "@interfaces/request/ewr-assign-dto";
import { enqueueSnackbar } from "notistack";
import { getResponseMessage } from "@utils/get-response";
import { ToastVariant } from "@enums/components/snackbar-enum";

// Keep this hardcoded values until Authentication completed
const USER_ID = 1;

const EwrList = () => {
  const navigate = useNavigate();

  const ewrIndexColumns: GridColDef[] = [
    {
      field: "__check__",
      headerClassName: "super-app-theme--header p-0",
      headerName: "Selection",
      width: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "requestNumber",
      headerClassName: "super-app-theme--header",
      headerName: "Request Number",
      editable: false,
      flex: 1,
      minWidth: 70,
      renderCell: (params) => {
        return (
          <CdLink
            href={`/ewr/view/${params.row.requestId}`}
            id="link"
            text={params.row.requestNumber}
          />
        );
      },
    },
    {
      field: "location",
      headerClassName: "super-app-theme--header",
      headerName: "Location",
      type: "string",
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "ward",
      headerClassName: "super-app-theme--header",
      headerName: "Ward",
      type: "string",
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "emergencyType",
      headerClassName: "super-app-theme--header",
      headerName: "Emergency Tyep",
      type: "string",
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "creationDate",
      headerClassName: "super-app-theme--header",
      headerName: "Request Date",
      type: "string",
      valueFormatter: (param: string) =>
        formatDate(param, DateFormat.MM_DD_YYYY_SLASH),
      editable: false,
      flex: 1,
      minWidth: 130,
    },
    {
      field: "emergencyCause",
      headerClassName: "super-app-theme--header",
      headerName: "Emergency Cause",
      type: "string",
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "status",
      headerClassName: "super-app-theme--header",
      headerName: "Status",
      editable: false,
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <CdBadge
            id="badge"
            text={params.row.status}
            className="py-2 px-2 ms-2 w-100"
            color={getVariantForEwrStatus(params.row.status)}
          />
        );
      },
    },
    {
      field: "assignedInspector",
      headerClassName: "super-app-theme--header",
      headerName: "Assigned Inspector",
      type: "string",
      editable: false,
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <div
            className="text-decoration-underline"
            onClick={() => singleAssignReassignHandler(params.row.requestId)}
          >
            {params.row.assignedInspector}
          </div>
        );
      },
    },
    {
      field: "appliedBy",
      headerClassName: "super-app-theme--header",
      headerName: "Applied By",
      type: "string",
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "utilityCompany",
      headerClassName: "super-app-theme--header",
      headerName: "Utility Company",
      type: "string",
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "internalUtilityTrackingNumber",
      headerClassName: "super-app-theme--header",
      headerName: "Internal Utitlity Tracking Number",
      type: "string",
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "lastInspectionDate",
      headerClassName: "super-app-theme--header",
      headerName: "Last Inspection Date",
      type: "string",
      valueFormatter: (param: string) =>
        formatDate(param, DateFormat.MM_DD_YYYY_SLASH),
      editable: false,
      flex: 1,
      minWidth: 130,
    },
  ];

  const defaultVisibleColumns = [
    "__check__",
    "requestNumber",
    "location",
    "assignedInspector",
    "emergencyType",
    "emergencyCause",
    "status",
    "creationDate",
  ];

  const initialState: GridInitialState = {
    pinnedColumns: { left: ["__check__", "requestNumber"] },
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [requestedDate, setRequestedDate] = useState();

  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  const [rows, setRows] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [mapCoordinates, setMapCoordinates] = useState<Coordinate[]>();

  const [requestNumSearchText, setRequestNumSearchText] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStatusKey, setSelectedStatusKey] = useState("");

  const [selectedEmergencyType, setSelectedEmergencyType] = useState("");
  const [selectedEmergencyTypeKey, setSelectedEmergencyTypeKey] = useState("");

  const [selectedEmergencyCause, setSelectedEmergencyCause] = useState("");
  const [selectedEmergencyCauseKey, setSelectedEmergencyCauseKey] =
    useState("");

  const [datesSelectionKey, setDatesSelectionKey] = useState("");

  const [statusOptions, setStatusOptions] = useState<OptionType[]>([]);
  const [emergencyTypeOptions, setEmergencyTypeOptions] = useState<
    OptionType[]
  >([]);
  const [emergencyCauseOptions, setEmergencyCauseOptions] = useState<
    OptionType[]
  >([]);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

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

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(
    generateColumnVisibilityModel(ewrIndexColumns, defaultVisibleColumns)
  );

  const ewrIndexApiRef = useGridApiRef();

  const [filterOnSwoStatusModel, setFilterOnSwoStatusModel] = useState<
    FilterOnCheckedModel[]
  >([]);

  const [filterOnIssuedByModel, setFilterOnIssuedByModel] = useState<
    FilterOnCheckedModel[]
  >([]);

  const [isLoadingEwrAssign, setIsLoadingEwrAssign] = useState(false);

  const [assignFormInitial, setAssignFormInitial] =
    useState<EwrAssignInitialDto>();

  useEffect(() => {
    loadInitialFiltersData();
  }, []);

  const loadInitialFiltersData = async () => {
    const response = await ewrService.getIndexFiltersInfo();
    if (response) {
      const ewrStOptions: OptionType[] =
        response.data?.ewrStatuses.map((item: EwrStatusOption) => ({
          key: item.statusId,
          value: item.statusDesc,
        })) ?? [];
      setStatusOptions(ewrStOptions);

      const ewrEmerTypeOptions: OptionType[] =
        response.data?.ewrEmergencyTypes.map(
          (item: EwrEmergencyTypeOption) => ({
            key: item.emergencyTypeId,
            value: item.emergencyTypeDesc,
          })
        ) ?? [];
      setEmergencyTypeOptions(ewrEmerTypeOptions);
      const ewrEmerCauseOptions: OptionType[] =
        response.data?.ewrEmergencyCauses.map(
          (item: EwrEmergencyCauseOption) => ({
            key: item.emergencyCauseId,
            value: item.emergencyCauseDesc,
          })
        ) ?? [];
      setEmergencyCauseOptions(ewrEmerCauseOptions);
      const swoStatusOptions: OptionType[] =
        response.data?.swoStatuses.map((item: SwoStatusOption) => ({
          key: item.statusId,
          value: item.statusDesc,
        })) ?? [];
      setFilterOnSwoStatusModel(initializeMultiFilterModel(swoStatusOptions));
      const usersOptions: OptionType[] =
        response.data?.users.map((item: UserOption) => ({
          key: item.userId,
          value: item.fullName,
        })) ?? [];
      setFilterOnIssuedByModel(initializeMultiFilterModel(usersOptions));
    }
  };

  useEffect(() => {
    const filters: EwrFiltersDto = {
      requestNumber: requestNumSearchText,
      status: selectedStatus,
      emergencyType: selectedEmergencyType,
      emergencyCause: selectedEmergencyCause,
      requestedDate:
        requestedDate && formatDate(requestedDate, DateFormat.YYYY_MM_DD),
      swoStatusIds: getCheckedKeys(filterOnSwoStatusModel),
      issuedByIds: getCheckedKeys(filterOnIssuedByModel),
      startDate: startDate && formatDate(startDate, DateFormat.YYYY_MM_DD),
      endDate: endDate && formatDate(endDate, DateFormat.YYYY_MM_DD),
    };
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
  }, [
    paginationModel,
    requestNumSearchText,
    selectedStatus,
    selectedEmergencyType,
    selectedEmergencyCause,
    requestedDate,
    filterOnSwoStatusModel,
    filterOnIssuedByModel,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    setPaginatedList();
  }, [paginatedRequest]);

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
      x: row.latitude,
      y: row.longitude,
      requestNumber: row.requestNumber,
      status: row.status,
      startDate: formatDate(row.effectiveDate, DateFormat.MM_DD_YYYY_SLASH),
      endDate: formatDate(row.expirationDate, DateFormat.MM_DD_YYYY_SLASH),
      address: row.location,
      inspector: row.assignedInspector,
      emergencyType: row.emergencyType,
      requestId: row.requestId,
    }));
    setMapCoordinates(coordinates);
  };

  const setPopupTemplate = CommonMarkerPopupTemplate({
    title: "",
    content: function (feature: any) {
      const {
        requestNumber,
        status,
        startDate,
        endDate,
        address,
        inspector,
        emergencyType,
        requestId,
      } = feature.graphic.attributes;
      const div = document.createElement("div");
      div.innerHTML = `
          <div id='popup-header-section'>
          <p id='popup-heading'>EWR | ${requestNumber} | ${status}</p>
          <p id='popup-heading-text'>${startDate} - ${endDate}</p>
          <p id='popup-heading-text'>${address}</p>
          </div>
          <hr/>
          <p id='popup-key-text'>Assigned Inspector</p>
          <p id='popup-value-text'>${inspector}</p>
          <p id='popup-key-text'>Emergency Type</p>
          <p id='popup-value-text'>${emergencyType}</p>
          <hr/>
          <div id='popup-action'>
          <input type='button' id='view-request-btn' value='View Request'></input>
          </div>
          `;

      // Add the event listener after the button is added to the DOM
      setTimeout(() => {
        const button = div.querySelector("#view-request-btn");
        if (button) {
          button.addEventListener("click", () => {
            navigate(`/ewr/view/${requestId}`);
          });
        }
      }, 0);

      return div;
    },
  });

  const handleOnRequestNumSearch = (e: any) => {
    setRequestNumSearchText(e.target.value);
  };

  const handleOnStatusSelection = (e: any) => {
    const selectedKey = e.target.value;
    setSelectedStatusKey(selectedKey);
    setSelectedStatus(getOptionValueByKey(selectedKey, statusOptions));
  };

  const handleOnEmergencyTypeSelection = (e: any) => {
    const selectedKey = e.target.value;
    setSelectedEmergencyTypeKey(selectedKey);
    setSelectedEmergencyType(
      getOptionValueByKey(selectedKey, emergencyTypeOptions)
    );
  };

  const handleOnEmergencyCauseSelection = (e: any) => {
    const selectedKey = e.target.value;
    setSelectedEmergencyCauseKey(selectedKey);
    setSelectedEmergencyCause(
      getOptionValueByKey(selectedKey, emergencyCauseOptions)
    );
  };

  const handleOnDatesSelection = (e: any) => {
    const selectedKey = e.target.value;
    setDatesSelectionKey(selectedKey);
    setDatesFromList(selectedKey, setStartDate, setEndDate);
  };

  const getOptionValueByKey = (key: string, options: OptionType[]) => {
    const retrivedOption = options.find((option) => option.key == key);
    return retrivedOption?.value || "";
  };

  const getCheckedKeys = (data: FilterOnCheckedModel[]) => {
    const checkedKeysList = data
      .filter((item) => item.checked)
      .map((item) => Number(item.key));
    return checkedKeysList.length > 0 ? checkedKeysList : undefined;
  };

  const initializeMultiFilterModel = (options: OptionType[]) => {
    const multiFilterModel: FilterOnCheckedModel[] = options.map((option) => ({
      name: option.value,
      key: option.key.toString(),
      checked: false,
      variant: getVariantForSwoStatus(option.value),
    }));
    return multiFilterModel;
  };

  const handleRowSelectionChange = (selectionModel: any) => {
    const selectedRowIdsList = selectionModel.map((id: number) => id);
    setSelectedRowIds(selectedRowIdsList);
  };

  const singleAssignReassignHandler = (id: number) => {
    setSelectedRowIds([id]);
    setModalOpen(true);
  };

  const handleClearFilters = () => {
    setRequestNumSearchText("");
    setStartDate(undefined);
    setEndDate(undefined);
    setRequestedDate(undefined);
    setSelectedStatus("");
    setSelectedStatusKey("");
    setSelectedEmergencyType("");
    setSelectedEmergencyTypeKey("");
    setSelectedEmergencyCause("");
    setSelectedEmergencyCauseKey("");
    setDatesSelectionKey("");
    setRequestedDate(undefined);
    loadInitialFiltersData();
  };

  const filterAccordionItems = [
    {
      header: "Swo Status",
      body: (
        <CdFilterCheckboxItemsList
          filterCheckedModel={filterOnSwoStatusModel}
          setFilterOnCheckedModel={setFilterOnSwoStatusModel}
          enableBadgeLabal
        />
      ),
    },
    {
      header: "Issued By",
      body: (
        <CdFilterCheckboxItemsList
          searchBoxEnable
          searchBoxPlaceholder="Search for Names"
          filterCheckedModel={filterOnIssuedByModel}
          setFilterOnCheckedModel={setFilterOnIssuedByModel}
          enableSorting
        />
      ),
    },
    {
      header: "Start and End Date",
      body: (
        <div className="pt-3">
          <CdSelectInput
            id={"select-input"}
            onSelect={handleOnDatesSelection}
            placeHolder="Select from list"
            options={SelectionDatesOptions}
            value={datesSelectionKey}
          />
          <CdDatePicker
            id="date-picker"
            placeholderText="From"
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
          />
          <CdDatePicker
            id="date-picker"
            placeholderText="To"
            selected={endDate}
            onChange={(date: any) => setEndDate(date)}
          />
        </div>
      ),
    },
  ];

  const onAssignHandler: SubmitHandler<any> = async (assignEwrData) => {
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
        setModalOpen(false);
      }
    }
  };

  const onCancelHandler = () => {
    setModalOpen(false);
  };

  return (
    <CdContainer fluid>
      <CdCard>
        <CdCardBody>
          <CdContainer
            className="m-0 p-0"
            flex
            justifyContent={JustifyContent.spaceBetween}
            alignItems={AlignItems.center}
            fluid
          >
            <div>
              <CdTypography className="h5 pt-1">All Requests</CdTypography>
              <CdTypography className="p">
                Displaying{" "}
                {getVisibleRowsCount(
                  paginationModel.page,
                  rowCount,
                  paginationModel.pageSize
                )}
                /{rowCount} Requests
              </CdTypography>
            </div>
            <div>
              <CdButton
                onClick={() => setModalOpen(true)}
                disabled={selectedRowIds.length === 0}
              >
                Assign / Reassign Inspector
              </CdButton>
            </div>
          </CdContainer>

          <CdRow className="mt-3">
            <CdCol md="3">
              <CdSearchBox
                id=""
                onChange={handleOnRequestNumSearch}
                label="Request Number"
                placeHolder="Search by Request Number"
                value={requestNumSearchText}
              />
            </CdCol>
            <CdCol md="9">
              <CdRow md="6">
                <CdCol>
                  <CdSelectInput
                    id={"select-input"}
                    label="Status"
                    onSelect={handleOnStatusSelection}
                    placeHolder="All"
                    options={statusOptions}
                    value={selectedStatusKey}
                  />
                </CdCol>
                <CdCol md="2">
                  <CdSelectInput
                    id={"select-input"}
                    label="Emergency Type"
                    onSelect={handleOnEmergencyTypeSelection}
                    placeHolder="All"
                    options={emergencyTypeOptions}
                    value={selectedEmergencyTypeKey}
                  />
                </CdCol>
                <CdCol md="2">
                  <CdSelectInput
                    id={"select-input"}
                    label="Emergency Cause"
                    onSelect={handleOnEmergencyCauseSelection}
                    placeHolder="All"
                    options={emergencyCauseOptions}
                    value={selectedEmergencyCauseKey}
                  />
                </CdCol>
                <CdCol md="2">
                  <CdDatePicker
                    id="date-picker"
                    label="Request Date"
                    placeholderText="Date"
                    selected={requestedDate}
                    onChange={(date: any) => setRequestedDate(date)}
                  />
                </CdCol>
                <CdCol
                  md="2"
                  className="d-flex align-items-center justify-content-between pt-3"
                >
                  <CdFilterPopup
                    handleClearFilters={handleClearFilters}
                    accordionItems={filterAccordionItems}
                  />
                </CdCol>
                <CdCol
                  md="2"
                  className="d-flex align-items-center justify-content-between pt-3"
                >
                  <CdColumnMenuPopup
                    columns={ewrIndexColumns}
                    columnVisibilityModel={columnVisibilityModel}
                    setColumnVisibilityModel={setColumnVisibilityModel}
                  />
                </CdCol>
              </CdRow>
            </CdCol>
          </CdRow>
          <CdRow>
            <CdCol md="8" className="d-flex flex-column mt-2">
              <CdDataGrid
                height={635}
                apiRef={ewrIndexApiRef}
                columns={ewrIndexColumns}
                rows={rows}
                setRows={setRows}
                disableColumnFilter={true}
                getRowId={(row: any) => row?.requestId}
                headerFilters={false}
                hideToolbar={true}
                filterMode={ProcessingMode.Server}
                paginationModel={paginationModel}
                initialState={initialState}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10, 25, 100]}
                rowCount={rowCount}
                paginationMode={ProcessingMode.Server}
                enableStateSave={true}
                userId={USER_ID}
                interfaceId={GridInterfaceCode.EWRIndex}
                autoHeight={false}
                onColumnVisibilityModelChange={(newModel: any) =>
                  setColumnVisibilityModel(newModel)
                }
                columnVisibilityModel={columnVisibilityModel}
                disableColumnMenu
                checkboxSelection
                onRowSelectionModelChange={handleRowSelectionChange}
                disableRowSelectionOnClick
              />
            </CdCol>
            <CdCol md="4" className="d-flex flex-column mt-4">
              {mapCoordinates && (
                <CdBaseMap
                  coordinates={mapCoordinates}
                  zoomLevel={11}
                  centerToFirstPoint={false}
                  popupTemplate={setPopupTemplate}
                  calciteShellId="calcite-shell-ewr-home"
                  mapDivId="map-view-div-ewr-home"
                />
              )}
            </CdCol>
          </CdRow>
        </CdCardBody>
      </CdCard>
      <CdModal
        showFooter={false}
        id="modal"
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        title={"EWR | Multiple"}
        body={
          <>
            <CdTypography className="h5">
              Assign or Reassign Inspector{" "}
            </CdTypography>
            <CdTypography className="p mb-3">
              Add details for your EWR inspection work
            </CdTypography>
            <AssignReassignForm
              onSubmit={onAssignHandler}
              onCancelHandler={onCancelHandler}
              isLoading={isLoadingEwrAssign}
              setIsDirty={setIsDirty}
              isDirty={isDirty}
              bulkAssigningEnable
              formInitial={assignFormInitial}
            />
          </>
        }
      />
    </CdContainer>
  );
};

export default EwrList;
