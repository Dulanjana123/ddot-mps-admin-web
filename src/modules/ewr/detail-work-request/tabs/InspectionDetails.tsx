import CdRow from "@atoms/Base/CdRow";
import { CdButton, CdContainer, CdModal } from "@atoms/index";
import { ApplicationTypeCode } from "@enums/application-type-code";
import { Variant } from "@enums/components/CommonEnum";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "@enums/components/Container";
import { ProcessingMode } from "@enums/components/datagrid-enum";
import { ModalSize } from "@enums/components/modal-enum";
import { ToastVariant } from "@enums/components/snackbar-enum";
import { FormAction } from "@enums/form-action";
import { DetailWorkRequestProps } from "@interfaces/components/ewr-props";
import {
  InspectionDetailsDto,
  InspectionDto,
} from "@interfaces/request/ewr-inspection-dto";
import { GetPaginatedListDto } from "@interfaces/request/paginated-list-dto";
import { GridColDef } from "@interfaces/shared/mui-pro.interface";
import CdDataGrid from "@organisms/DataGrid/CdDataGrid";
import { inspectionService } from "@services/api/inspection-service";
import { getResponseMessage } from "@utils/get-response";
import { formatDateDefault } from "@utils/helper/format-date";
import { minsToHours } from "@utils/helper/mins-to-hours";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { H3, H5 } from "src/AbstractElements";
import InspectionForm from "../../view-ewr/inspection-details/InspectionForm";
import { calculateTotalHoursSpent } from "@utils/helper/inspection-details";

// Keep this hardcoded values until Authentication completed
const USER_ID = 1;

const InspectionDetails: React.FC<DetailWorkRequestProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openedInspectionId, setOpenedInspectionId] = useState(0);

  const [totalHoursSpent, setTotalHoursSpent] = useState("0h 0m");

  const [rows, setRows] = useState<any[]>([]);

  const [filters, setFilters] = useState({
    ewrRequestId: data?.requestId,
  });

  const columns: GridColDef[] = [
    {
      field: "createdDate",
      headerName: "Date Added",
      type: "date",
      valueFormatter: (param: string) => formatDateDefault(param),
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "inspectionDate",
      headerName: "Inspection Date",
      type: "date",
      valueFormatter: (param: string) => formatDateDefault(param),
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "inspector",
      headerName: "Inspector",
      type: "string",
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "minutesSpent",
      headerName: "Hours Spent",
      type: "string",
      valueFormatter: (param: number) => minsToHours(param),
      align: "center",
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "internalNotes",
      headerName: "Internal Notes",
      type: "string",
      editable: false,
      flex: 1,
      minWidth: 300,
    },
    {
      field: "externalNotes",
      headerName: "External Notes",
      type: "string",
      editable: false,
      flex: 1,
      minWidth: 150,
    },
    {
      field: "uploadedFiles",
      headerName: "Uploaded Files",
      editable: false,
      flex: 1,
      minWidth: 150,
      type: "string",
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      editable: false,
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <CdButton
            className="btn btn-link fs-6"
            color={Variant.tertiary}
            onClick={() => {
              setOpenedInspectionId(params.row.inspDetailId);
              setModalOpen(true);
            }}
            id="view"
            text="View"
          />
        );
      },
    },
  ];

  const [rowCount, setRowCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [addModalOpen, setAddModalOpen] = useState(false);

  const uploadedDocColumns: GridColDef[] = [
    {
      field: "documentName",
      headerName: "Document Name",
      type: "string",
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "uploadedDate",
      headerName: "Uploaded Date",
      type: "date",
      editable: false,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "documentSize",
      headerName: "Document Size (KB)",
      type: "number",
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
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <CdButton
            className="btn btn-link fs-6"
            color={Variant.tertiary}
            onClick={() => {}}
            id="download"
            text="Download"
          />
        );
      },
    },
  ];

  const [uploadedDocRows, setUploadedDocRows] = useState<any[]>([
    {
      id: 1,
      documentName: "Document 01",
      documentSize: 50,
      uploadedDate: new Date(2024, 10, 8),
    },
    {
      id: 2,
      documentName: "Document 01",
      documentSize: 50,
      uploadedDate: new Date(2024, 10, 8),
    },
    {
      id: 3,
      documentName: "Document 01",
      documentSize: 50,
      uploadedDate: new Date(2024, 10, 8),
    },
    {
      id: 4,
      documentName: "Document 01",
      documentSize: 50,
      uploadedDate: new Date(2024, 10, 8),
    },
    {
      id: 5,
      documentName: "Document 01",
      documentSize: 50,
      uploadedDate: new Date(2024, 10, 8),
    },
  ]);

  const [uploadedDocRowCount, setUploadedDocRowRowCount] = useState(0);

  const [uploadedDocPaginationModel, setUploadedDocPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const [formInitial, setFormInitial] = useState<InspectionDetailsDto>({
    inspectionDate: "",
    internalNotes: "",
    externalNotes: "",
    files: [],
    hoursSpent: 0,
    minutesSpent: 0,
  });

  const setInspectionDetailsData = async (id: number) => {
    const response = await inspectionService.getInspection(id);
    setFormInitial({
      ...formInitial,
      inspectionDate: response.data?.inspectionDate,
      internalNotes: response.data?.internalNotes,
      externalNotes: response.data?.externalNotes,
      hoursSpent: Math.floor((response.data?.minutesSpent ?? 0) / 60),
      minutesSpent: (response.data?.minutesSpent ?? 0) % 60,
    });
  };

  const setPaginatedList = async (request: GetPaginatedListDto) => {
    const response = await inspectionService.getPaginatedList(request);
    if (response) {
      const inspectionList: InspectionDto[] = response.data?.entities || [];
      const totalHours = calculateTotalHoursSpent(inspectionList);
      setTotalHoursSpent(totalHours);
      setRowCount(response.data?.pagination?.length ?? 0);
      setRows(inspectionList);
    }
  };

  const onCreateHandler: SubmitHandler<InspectionDetailsDto> = async (
    createInspectionData
  ) => {
    const createInspectionRequest: InspectionDto = {
      applicationId: filters.ewrRequestId,
      inspectedBy: 1, // should replace with user id
      applicationTypeCode: ApplicationTypeCode.EWR,
      inspectionDate: createInspectionData?.inspectionDate ?? "",
      minutesSpent:
        (createInspectionData.hoursSpent || 0) * 60 +
        (createInspectionData.minutesSpent || 0),
      internalNotes: createInspectionData.internalNotes || "",
      externalNotes: createInspectionData?.externalNotes ?? "",
    };

    setIsLoading(true);
    const response = await inspectionService.createInspection(
      createInspectionRequest
    );
    if (response) {
      enqueueSnackbar(getResponseMessage(response.message), {
        variant: response.success ? ToastVariant.Success : ToastVariant.Error,
      });
      setIsLoading(false);
      setAddModalOpen(false);
    }
  };

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
  }, [paginationModel, filters, addModalOpen]);

  useEffect(() => {
    if (openedInspectionId !== 0) {
      setInspectionDetailsData(openedInspectionId);
    }
  }, [openedInspectionId]);

  return (
    <div>
      <CdContainer
        flex
        alignItems={AlignItems.baseline}
        justifyContent={JustifyContent.end}
        flexDirection={FlexDirection.row}
      >
        <CdButton
          color={Variant.primary}
          id="add_new"
          onClick={() => setAddModalOpen(true)}
        >
          Add Inspection
        </CdButton>
      </CdContainer>

      <CdRow md={3}>
        <H3>Previous Inspection Details</H3>
        <div>Total Hours Spent in Inspections: {totalHoursSpent}</div>
      </CdRow>

      <CdContainer className="p-0 mt-3">
        <CdDataGrid
          height={400}
          rows={rows}
          setRows={setRows}
          disableColumnFilter={true}
          getRowId={(row: any) => row?.inspDetailId}
          columns={columns}
          hideToolbar={true}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 100]}
          rowCount={rowCount}
          paginationMode={ProcessingMode.Server}
          enableStateSave={true}
          userId={USER_ID}
          interfaceId={7}
        />
      </CdContainer>
      <CdModal
        size={ModalSize.lg}
        id="modal"
        title={`Inspection details for Emergency Work Request #${data?.requestNumber}`}
        isOpen={modalOpen}
        showFooter={false}
        toggle={() => setModalOpen(!modalOpen)}
        body={
          <>
            <InspectionForm
              onSubmit={() => {}}
              formAction={FormAction.View}
              initialData={formInitial}
            />
            <H5>Uploaded Documents</H5>
            <CdContainer className="p-0 mt-3">
              <CdDataGrid
                height={250}
                rows={uploadedDocRows}
                setRows={setUploadedDocRows}
                disableColumnFilter={true}
                columns={uploadedDocColumns}
                hideToolbar={true}
                paginationModel={uploadedDocPaginationModel}
                onPaginationModelChange={setUploadedDocPaginationModel}
                pageSizeOptions={[5, 10, 25]}
                rowCount={uploadedDocRowCount}
                paginationMode={ProcessingMode.Server}
                enableStateSave={true}
                userId={USER_ID}
                interfaceId={8}
              />
            </CdContainer>
          </>
        }
      />
      <CdModal
        size={ModalSize.lg}
        id="add-inspection"
        title={"Add Inspection Details"}
        isOpen={addModalOpen}
        toggle={() => setAddModalOpen(!addModalOpen)}
        onClose={() => setAddModalOpen(false)}
        showFooter={false}
        body={
          <CdContainer
            height="520px"
            className="overflow-auto overflow-x-hidden"
          >
            <InspectionForm
              onSubmit={onCreateHandler}
              formAction={FormAction.Add}
            />
          </CdContainer>
        }
      />
    </div>
  );
};

export default InspectionDetails;
