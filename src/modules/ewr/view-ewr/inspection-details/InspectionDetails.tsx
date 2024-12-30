import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import { CdButton, CdContainer, CdModal, CdTypography } from "@atoms/index";
import { ButtonSizes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import { Density, ProcessingMode } from "@enums/components/datagrid-enum";
import { ModalSize } from "@enums/components/modal-enum";
import { DateFormat } from "@enums/date-format-types";
import { EwrNoteTypes } from "@enums/ewr-status-types";
import { InspectionResponseDto } from "@interfaces/response/inspection-response-dto";
import { GridColDef } from "@mui/x-data-grid-pro";
import { CdDataGrid } from "@organisms/index";
import { formatDate } from "@utils/format-date-utils";
import { hoursToMinutes, minsToHours } from "@utils/format-time-utils";
import { useEffect, useState } from "react";
import InspectionForm from "./InspectionForm";
import { FormAction } from "@enums/form-action";
import {
  InspectionDetailsDto,
  InspectionDto,
} from "@interfaces/request/ewr-inspection-dto";
import { MasterDetailPanel } from "./InspectionTableComponents";
import { inspectionService } from "@services/api/inspection-service";
import { useAppDispatch } from "@store/state-hooks";
import { setSystemMessage } from "@store/reducers/systemMessageSlice";
import { SystemMessageTypes } from "@enums/components/SystemMessageEnum";
import { ApplicationTypeCode } from "@enums/application-type-code";
import { InspectionStatus } from "@enums/inspection-status";
import { GetPaginatedListDto } from "@interfaces/request/paginated-list-dto";
interface InpectionTableData extends InspectionDetailsDto {
  id: number;
}
interface InspectionDetailProps {
  ewrNo?: string | null;
  ewrApplicationId?: number;
}

const InspectionDetail: React.FC<InspectionDetailProps> = ({
  ewrNo,
  ewrApplicationId,
}) => {
  const dispatch = useAppDispatch();
  const [tableData, setTableData] = useState<InpectionTableData[]>([]);
  const [inspectionData, setInspectionData] = useState<InspectionResponseDto[]>(
    []
  );
  const [rowCount, setRowCount] = useState(0);
  const [totalInspectionTime, setTotalInspectionTime] = useState<number>(0);
  const [isFormSubmitLoading, setIsFormSubmitLoading] =
    useState<boolean>(false);
  const [selectedInspectionRow, setSelectedInspectionRow] = useState<{
    selectedRow: InpectionTableData;
    noteType: EwrNoteTypes;
  } | null>(null);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<{
    isopen: boolean;
    formType: FormAction;
  }>({
    isopen: false,
    formType: FormAction.Add,
  });
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    if (inspectionData.length > 0) {
      const filteredData: InpectionTableData[] = inspectionData.map(
        (_inspection, index) => {
          return {
            id: index + 1,
            createdDate: formatDate(
              _inspection.createdDate,
              DateFormat.MM_DD_YYYY_SLASH
            ),
            inspectionDate: _inspection.inspectionDate
              ? formatDate(
                  _inspection.inspectionDate,
                  DateFormat.MM_DD_YYYY_SLASH
                )
              : null,
            inspector: _inspection.inspector,
            hoursSpent: minsToHours(_inspection.minutesSpent).hours,
            minutesSpent: minsToHours(_inspection.minutesSpent).minutes,
            externalNotes: _inspection.externalNotes,
            internalNotes: _inspection.internalNotes,
            files: _inspection?.documents ?? null,
          };
        }
      );

      setTableData(filteredData);
    }
  }, [inspectionData]);

  useEffect(() => {
    if (tableData.length > 0) {
      const totalInspectionTime = tableData.reduce(
        (total, item) =>
          total +
          ((item.minutesSpent ?? 0) + hoursToMinutes(item?.hoursSpent ?? 0)),
        0
      );

      setTotalInspectionTime(totalInspectionTime);
    }
  }, [tableData]);

  useEffect(() => {
    if (ewrApplicationId) {
      const paginatedRequest: GetPaginatedListDto = {
        pagingAndSortingInfo: {
          paging: {
            pageNo: paginationModel.page + 1,
            pageSize: paginationModel.pageSize,
          },
        },
        filters: {
          ewrRequestId: ewrApplicationId,
        },
      };
      getInspectionData(paginatedRequest);
    }
  }, [paginationModel, ewrApplicationId]);

  const getInspectionData = (paginatedReuqest: GetPaginatedListDto) => {
    if (ewrApplicationId) {
      inspectionService
        .getPaginatedList(paginatedReuqest)
        .then((response) => {
          if (response.success && response.data) {
            setInspectionData(response.data.entities);
            setRowCount(response.data?.pagination?.length ?? 0);
          } else {
            dispatch(
              setSystemMessage({
                type: SystemMessageTypes.Error,
                message: response.message,
              })
            );
          }
        })
        .catch(() => {
          dispatch(
            setSystemMessage({
              type: SystemMessageTypes.Error,
              message: "ERROR_OCCURED",
            })
          );
        });
    } else {
      dispatch(
        setSystemMessage({
          type: SystemMessageTypes.Error,
          message: "ERROR_OCCURED",
        })
      );
    }
  };

  const toggleNoteModal = () => {
    setShowModel((prevState) => !prevState);
  };

  const toggleAddModal = (formType: FormAction = FormAction.Add) => {
    setAddModalOpen((prevState) => ({
      isopen: !prevState.isopen,
      formType: formType,
    }));
  };

  const columns: GridColDef[] = [
    {
      field: "createdDate",
      headerClassName: "super-app-theme--header",
      headerName: "Date Added",
      type: "string",
      flex: 1,
    },
    {
      field: "inspectionDate",
      headerClassName: "super-app-theme--header",
      headerName: "Inspection Date",
      type: "string",
      flex: 1,
    },
    {
      field: "inspector",
      headerClassName: "super-app-theme--header",
      headerName: "Inspector",
      type: "string",
      flex: 1,
    },
    {
      field: "minSpent",
      headerClassName: "super-app-theme--header",
      headerName: "Hours Spent",
      type: "string",
      flex: 1,
      renderCell: (params) => {
        return (
          <CdTypography>
            {`${params.row.hoursSpent} h ${params.row.minutesSpent} min`}
          </CdTypography>
        );
      },
    },
    {
      field: "externalNotes",
      headerClassName: "super-app-theme--header",
      headerName: "External Notes",
      type: "string",
      flex: 1,
      renderCell: (params) => {
        return (
          <CdButton
            size={ButtonSizes.sm}
            color={Variant.link}
            onClick={() => {
              toggleNoteModal();
              setSelectedInspectionRow({
                selectedRow: params.row,
                noteType: EwrNoteTypes.External,
              });
            }}
            id="external-note-btn"
            text={"View"}
          />
        );
      },
    },
    {
      field: "internalNotes",
      headerClassName: "super-app-theme--header",
      headerName: "Internal Notes",
      type: "string",
      flex: 1,
      renderCell: (params) => {
        return (
          <CdButton
            size={ButtonSizes.sm}
            color={Variant.link}
            onClick={() => {
              toggleNoteModal();
              setSelectedInspectionRow({
                selectedRow: params.row,
                noteType: EwrNoteTypes.Internal,
              });
            }}
            id="external-note-btn"
            text={"View"}
          />
        );
      },
    },
    {
      field: "files",
      headerClassName: "super-app-theme--header",
      headerName: "Uploaded Files",
      sortable: false,
      filterable: false,
      editable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <CdTypography>
            {params.row.files && params.row.files.length > 0
              ? `${params.row.files.length} Files for View`
              : "No files uploaded"}
          </CdTypography>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerClassName: "super-app-theme--header",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <CdButton
            size={ButtonSizes.sm}
            color={Variant.link}
            onClick={() => {
              toggleAddModal(FormAction.Update);
              setSelectedInspectionRow({
                selectedRow: params.row,
                noteType: EwrNoteTypes.Internal,
              });
            }}
            id="edit-inspection-btn"
            text={"Edit"}
          />
        );
      },
    },
  ];

  const handleAddInspection = async (formData: any) => {
    try {
      setIsFormSubmitLoading(true);
      const request: InspectionDto = {
        applicationId: ewrApplicationId,
        applicationTypeCode: ApplicationTypeCode.EWR,
        inspectedBy: 1, // should replace with user id
        inspStatusId: InspectionStatus.Open,
        inspectionDate: formData.inspectionDate,
        minutesSpent:
          hoursToMinutes(formData.hoursSpent) + formData.minutesSpent,
        internalNotes: formData.internalNotes,
        externalNotes: formData.externalNotes,
      };
      const { success, data } = await inspectionService.createInspection(
        request
      );
      if (success && data) {
        const newInspectionData: InpectionTableData = {
          id: tableData.length + 1,
          createdDate: formatDate(
            data.createdDate,
            DateFormat.MM_DD_YYYY_SLASH
          ),
          inspectionDate: formatDate(
            data.inspectionDate,
            DateFormat.MM_DD_YYYY_SLASH
          ),
          inspector: data.inspector,
          hoursSpent: minsToHours(data.minutesSpent).hours,
          minutesSpent: minsToHours(data.minutesSpent).minutes,
          externalNotes: data.externalNotes,
          internalNotes: data.internalNotes,
          files: data?.documents ?? formData.files,
        };
        setTableData((prevState) => [...prevState, newInspectionData]);
        toggleAddModal();
      }
    } catch (error) {
      dispatch(
        setSystemMessage({
          type: SystemMessageTypes.Error,
          message: "ERROR_OCCURED",
        })
      );
    } finally {
      setIsFormSubmitLoading(false);
    }
  };

  return (
    <>
      <CdContainer className="g-0 p-4" fluid>
        <CdRow className="mb-3">
          <CdCol>
            <CdTypography className="h6">
              Previous Inspection Details
            </CdTypography>
            <CdTypography>{`${minsToHours(totalInspectionTime).hours}h ${
              minsToHours(totalInspectionTime).minutes
            }min Spent in Inspections`}</CdTypography>
          </CdCol>
          <CdCol className="d-flex justify-content-end align-items-center">
            <CdButton onClick={() => toggleAddModal(FormAction.Add)}>
              Add Inspection
            </CdButton>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol xs={12}>
            <CdDataGrid
              rows={tableData}
              setRows={setTableData}
              rowCount={rowCount}
              columns={columns}
              hideToolbar
              density={Density.Compact}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10, 25, 100]}
              paginationMode={ProcessingMode.Server}
              getDetailPanelContent={({ row }) =>
                MasterDetailPanel(
                  row.inspectionDate,
                  row.hoursSpent,
                  row.minutesSpent,
                  row.internalNotes,
                  row.externalNotes,
                  row.files
                )
              }
              getDetailPanelHeight={({ row }) => "auto"}
            />
          </CdCol>
        </CdRow>
      </CdContainer>

      <CdModal
        showFooter={false}
        toggle={toggleNoteModal}
        isOpen={showModel}
        title={`EWR | ${ewrNo} | ${formatDate(
          selectedInspectionRow?.selectedRow.inspectionDate,
          DateFormat.MM_DD_YYYY
        )} | ${selectedInspectionRow?.selectedRow.inspector}`}
        body={
          <>
            <CdTypography className="modal-sub-heading">
              {selectedInspectionRow?.noteType == EwrNoteTypes.External
                ? "External Notes"
                : "Internal Notes"}
            </CdTypography>
            <CdTypography className="modal-body-text">
              {selectedInspectionRow?.noteType == EwrNoteTypes.External
                ? selectedInspectionRow.selectedRow.externalNotes
                : selectedInspectionRow?.selectedRow.internalNotes}
            </CdTypography>
          </>
        }
        id={"notes-modal"}
      />
      <CdModal
        size={ModalSize.lg}
        id="add-inspection"
        title={
          addModalOpen.formType == FormAction.Add
            ? "Add Inspection Details"
            : "Edit Inspection Details"
        }
        isOpen={addModalOpen.isopen}
        toggle={toggleAddModal}
        showFooter={false}
        backdrop="static"
        body={
          <InspectionForm
            onSubmit={(data) => {
              handleAddInspection(data);
            }}
            formAction={
              addModalOpen.formType == FormAction.Add
                ? FormAction.Add
                : FormAction.Update
            }
            initialData={selectedInspectionRow?.selectedRow}
            onToggle={toggleAddModal}
            isSubmitting={isFormSubmitLoading}
          />
        }
      />
    </>
  );
};

export default InspectionDetail;
