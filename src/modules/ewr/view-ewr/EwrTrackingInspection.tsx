import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import { CdBadge, CdContainer, CdTypography } from "@atoms/index";
import { ProcessingMode } from "@enums/components/datagrid-enum";
import { DateFormat } from "@enums/date-format-types";
import { PaginatedResponseData } from "@interfaces/api-response.interface";
import { GetPaginatedListDto } from "@interfaces/request/paginated-list-dto";
import { EwrResponseDto } from "@interfaces/response/ewr-response-dto";
import { GridColDef } from "@mui/x-data-grid-pro";
import { CdDataGrid } from "@organisms/index";
import { ewrService } from "@services/api/ewr-service";
import { formatBoolResponse } from "@utils/boolean-format-utils";
import { getVariantForEwrStatus } from "@utils/ewr-utils";
import { formatDate } from "@utils/format-date-utils";
import { useEffect, useState } from "react";

interface EwrTrackingInspectionProps {
  requestId: number | undefined;
  locationId: number | undefined;
  startDate?: string | null;
  endDate?: string | null;
  ewrNo?: string | null;
  assignedInspector?: string | null;
  constructionPermitNo?: number | null;
  noiNo?: number | null;
  swoNo?: number | null;
  isPsNeed?: boolean | null;
}

const EwrInspectionDetails: React.FC<EwrTrackingInspectionProps> = ({
  requestId,
  locationId,
  startDate,
  endDate,
  ewrNo,
  assignedInspector,
  constructionPermitNo,
  noiNo,
  swoNo,
  isPsNeed,
}) => {
  const [rowCount, setRowCount] = useState(0);
  const [rows, setRows] = useState<any[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  useEffect(() => {
    if (requestId) {
      const paginatedRequest: GetPaginatedListDto = {
        pagingAndSortingInfo: {
          paging: {
            pageNo: paginationModel.page + 1,
            pageSize: paginationModel.pageSize,
          },
        },
        filters: {
          locationId: locationId,
          exceptEwrRequestId: requestId,
        },
      };
      setPaginatedList(paginatedRequest);
    }
  }, [paginationModel, requestId]);

  const setPaginatedList = async (request: GetPaginatedListDto) => {
    const response = await ewrService.getConflictedList(request);
    if (response) {
      const conflictList: EwrResponseDto[] = response.data?.entities || [];
      setRowCount(response.data?.pagination?.length ?? 0);
      setRows(conflictList);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "requestNumber",
      headerClassName: "super-app-theme--header",
      headerName: "Request Number",
      type: "string",
      flex: 1,
    },
    {
      field: "effectiveDate",
      headerClassName: "super-app-theme--header",
      headerName: "Requested Date",
      type: "date",
      valueFormatter: (param: string) =>
        formatDate(param, DateFormat.MM_DD_YYYY),
      flex: 1,
    },
    {
      field: "emergencyType",
      headerClassName: "super-app-theme--header",
      headerName: "Emergency Type",
      type: "string",
      flex: 1,
    },
    {
      field: "emergencyCause",
      headerClassName: "super-app-theme--header",
      headerName: "Emergency Cause",
      type: "string",
      flex: 1,
    },
    {
      field: "assignedInspector",
      headerClassName: "super-app-theme--header",
      headerName: "Inspector",
      type: "string",
      flex: 1,
    },

    {
      field: "creationDate",
      headerClassName: "super-app-theme--header",
      headerName: "Creation Date",
      type: "date",
      valueFormatter: (param: string) =>
        formatDate(param, DateFormat.MM_DD_YYYY),
      flex: 1,
    },
    {
      field: "status",
      headerClassName: "super-app-theme--header",
      headerName: "Status",
      type: "string",
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
  ];

  return (
    <>
      <CdContainer className="g-0 p-4" fluid>
        <CdRow className="mb-3">
          <CdCol xs={12} md={2}>
            <CdTypography className="m-0 ewr-text-key">
              {"Start Date"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {formatDate(startDate, DateFormat.MM_DD_YYYY)}
            </CdTypography>
          </CdCol>
          <CdCol xs={12} md={2}>
            <CdTypography className="m-0 ewr-text-key">
              {"End Date"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {formatDate(endDate, DateFormat.MM_DD_YYYY)}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol>
            <CdTypography className="m-0 ewr-text-key">
              {"Assigned Inspector"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {assignedInspector ?? "-"}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol xs={12} md={4}>
            <CdTypography className="m-0 ewr-text-key">
              {"Linked Construction Permit Number"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {constructionPermitNo ?? "-"}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol>
            <CdTypography className="m-0 ewr-text-key">
              {"Linked NOI Number"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {noiNo ?? "-"}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol>
            <CdTypography className="m-0 ewr-text-key">
              {"Linked SWO Number"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {swoNo ?? "-"}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdRow className="mb-3">
          <CdCol>
            <CdTypography className="m-0 ewr-text-key">
              {"Is PS need to add construction work"}
            </CdTypography>
            <CdTypography className="ewr-text-value">
              {formatBoolResponse(isPsNeed)}
            </CdTypography>
          </CdCol>
        </CdRow>
        <CdTypography className="h5 p-2">
          Conflicting Emergency Work Requests
        </CdTypography>
        <CdTypography className="h6 p-1">
          Other EWRs in the same location
        </CdTypography>
        <CdDataGrid
          height={635}
          rows={rows}
          setRows={setRows}
          disableColumnFilter={true}
          getRowId={(row: any) => row?.requestId}
          columns={columns}
          hideToolbar={true}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 100]}
          rowCount={rowCount}
          paginationMode={ProcessingMode.Server}
          enableStateSave={true}
          autoHeight={false}
        />
      </CdContainer>
    </>
  );
};

export default EwrInspectionDetails;
