import CdCard from "@atoms/Card/CdCard";
import { CdContainer, CdDivider, CdTypography } from "@atoms/index";
import { ProcessingMode } from "@enums/components/datagrid-enum";
import { ToastVariant } from "@enums/components/snackbar-enum";
import { DateFormat } from "@enums/date-format-types";
import { EwrAssignDto } from "@interfaces/request/ewr-assign-dto";
import { InspectionDto } from "@interfaces/request/ewr-inspection-dto";
import { GetPaginatedListDto } from "@interfaces/request/paginated-list-dto";
import { GridColDef } from "@interfaces/shared/mui-pro.interface";
import { CdDataGrid } from "@organisms/index";
import { ewrService } from "@services/api/ewr-service";
import { inspectionService } from "@services/api/inspection-service";
import { formatDate } from "@utils/format-date-utils";
import { getResponseMessage } from "@utils/get-response";
import { minsToHours } from "@utils/helper/mins-to-hours";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import AssignReassignForm from "../detail-work-request/tabs/AssignReassignForm";

// Keep this hardcoded values until Authentication completed
const USER_ID = 1;

type EwrAssignmentDetailsProps = {
  ewrId?: number;
};

const EwrAssignmentDetails: React.FC<EwrAssignmentDetailsProps> = ({
  ewrId,
}) => {
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [rows, setRows] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const formInitial = {
    assigneeId: "",
    inspStatusId: "",
    ewrStatusId: "",
    comments: "",
  };

  const columns: GridColDef[] = [
    {
      field: "createdDate",
      headerClassName: "super-app-theme--header",
      headerName: "Date Added",
      type: "date",
      valueFormatter: (param: string) =>
        formatDate(param, DateFormat.MM_DD_YYYY_SLASH),
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
      field: "inspStatus",
      headerClassName: "super-app-theme--header",
      headerName: "Inspection Status",
      type: "string",
      flex: 1,
    },
    {
      field: "applicationStatus",
      headerClassName: "super-app-theme--header",
      headerName: "EWR Status",
      type: "string",
      flex: 1,
    },
    {
      field: "minutesSpent",
      headerClassName: "super-app-theme--header",
      headerName: "Total Hours Spent",
      type: "string",
      valueFormatter: (param: number) => minsToHours(param),
      flex: 1,
    },
    {
      field: "comments",
      headerClassName: "super-app-theme--header",
      headerName: "Comments",
      type: "string",
      flex: 1,
    },
  ];

  const setPaginatedList = async (request: GetPaginatedListDto) => {
    const response = await inspectionService.getPaginatedList(request);
    if (response) {
      const inspectionList: InspectionDto[] = response.data?.entities || [];
      setRowCount(response.data?.pagination?.length ?? 0);
      setRows(inspectionList);
    }
  };

  const onAssignHandler: SubmitHandler<any> = async (assignEwrData) => {
    const ewrAssignRequest: EwrAssignDto = {
      assigneeId: parseInt(assignEwrData.assigneeId),
      ewrStatusId: parseInt(assignEwrData.ewrStatusId),
      inspStatusId: parseInt(assignEwrData.inspStatusId),
      comments: assignEwrData.comments,
    };

    if (ewrId) {
      const response = await ewrService.updateEwrAssigning(
        ewrId,
        ewrAssignRequest
      );
      if (response) {
        enqueueSnackbar(getResponseMessage(response.message), {
          variant: response.success ? ToastVariant.Success : ToastVariant.Error,
        });
        setIsLoading(false);
        setIsDirty(false);
        // To reload
        const paginatedRequest: GetPaginatedListDto = {
          pagingAndSortingInfo: {
            paging: {
              pageNo: paginationModel.page + 1,
              pageSize: paginationModel.pageSize,
            },
          },
          filters: {
            ewrRequestId: ewrId,
          },
        };
        setPaginatedList(paginatedRequest);
      }
    }
  };

  useEffect(() => {
    if (ewrId) {
      const paginatedRequest: GetPaginatedListDto = {
        pagingAndSortingInfo: {
          paging: {
            pageNo: paginationModel.page + 1,
            pageSize: paginationModel.pageSize,
          },
        },
        filters: {
          ewrRequestId: ewrId,
        },
      };
      setPaginatedList(paginatedRequest);
    }
  }, [paginationModel, ewrId]);

  return (
    <CdContainer className="g-0 p-4" fluid>
      <CdCard className="p-3 bg-light text-black">
        <CdTypography className="h5 p-1">
          Assign or Reassign Inspector
        </CdTypography>
        <AssignReassignForm
          onSubmit={onAssignHandler}
          isLoading={isLoading}
          setIsDirty={setIsDirty}
          isDirty={isDirty}
          formInitial={formInitial}
        />
      </CdCard>

      <CdDivider />
      <CdTypography className="h5 p-2">
        Previous Assigned Inspectors
      </CdTypography>
      <CdDataGrid
        height={635}
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
        interfaceId={8}
        autoHeight={false}
      />
    </CdContainer>
  );
};

export default EwrAssignmentDetails;
