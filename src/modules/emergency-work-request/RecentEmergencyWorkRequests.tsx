import CdCard from "@atoms/Card/CdCard";
import { CdContainer } from "@atoms/index";
import { recentewrIndex } from "@data/datagrid-data/ewr-datagrids";
import { ProcessingMode } from "@enums/components/datagrid-enum";
import { GridInterfaceCode } from "@enums/grid-interface-code";
import { GetPaginatedListDto } from "@interfaces/request/paginated-list-dto";
import { EwrResponseDto } from "@interfaces/response/ewr-response-dto";
import { GridInitialState } from "@interfaces/shared/mui-pro.interface";
import CdDataGrid from "@organisms/DataGrid/CdDataGrid";
import { ewrService } from "@services/api/ewr-service";
import { useEffect, useState } from "react";
import CardHeaderCommon from "@common-elements/CardHeaderCommon/CardHeaderCommon";
import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import { getVariantForEwrStatus } from "@utils/ewr-utils";
import { CdBadge } from "@atoms/index";

interface EwrRow {
  requestId: string;
  status: string;
  [key: string]: any;
}

const USER_ID = 1;

const initialState: GridInitialState = {
  pagination: { paginationModel: { pageSize: 10, page: 0 } },
};

const RecentEmergencyWorkRequests = ({startDate, endDate, utilityFilter, wardFilter, emergencyTypeFilter}: {
  startDate: string;
  endDate: string;
  utilityFilter: string | null;
  wardFilter: string | null;
  emergencyTypeFilter: string | null;
}) => {
  const [rows, setRows] = useState<EwrResponseDto[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const handlePaginationChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
    setPaginatedRequest((prev) => ({
      ...prev,
      pagingAndSortingInfo: {
        ...prev.pagingAndSortingInfo,
        paging: {
          pageNo: newPaginationModel.page + 1,
          pageSize: newPaginationModel.pageSize,
        },
      },
    }));
  };

  const [paginatedRequest, setPaginatedRequest] = useState<GetPaginatedListDto>({
    pagingAndSortingInfo: {
      paging: {
        pageNo: 1,
        pageSize: paginationModel.pageSize,
      },
    },
    filters: {
      startDate,
      endDate,
      ...(utilityFilter ? { utilityCompany: utilityFilter } : {}),
      ...(wardFilter ? { ward: wardFilter } : {}),
      ...(emergencyTypeFilter ? { emergencyType: emergencyTypeFilter } : {}),
    },
  });

  useEffect(() => {
    setPaginatedRequest((prev) => ({
      ...prev,
      pagingAndSortingInfo: {
        paging: {
          pageNo: paginationModel.page + 1,
          pageSize: paginationModel.pageSize,
        },
      },
      filters: {
        startDate,
        endDate,
        ...(utilityFilter && { utilityCompany: utilityFilter }),
        ...(wardFilter && { ward: wardFilter }),
        ...(emergencyTypeFilter && { emergencyType: emergencyTypeFilter }),
      },
    }));
  }, [startDate, endDate, utilityFilter, wardFilter, emergencyTypeFilter, paginationModel]);

  useEffect(() => {
    setPaginatedList();
  }, [paginatedRequest]);

  const setPaginatedList = async () => {
    setLoading(true);
    try {
      const response = await ewrService.getPaginatedList(paginatedRequest);
      const ewrList: EwrResponseDto[] = response.data?.entities || [];
      setRowCount(response.data?.pagination?.length || 0);
      setRows(ewrList);
    } catch (error) {
      setRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  const updatedColumns = recentewrIndex.columns.map((col) => {
    if (col.field === "status") {
      return {
        ...col,
        headerClassName: "text-center super-app-theme--header",
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
      };
    }
    return { ...col, headerClassName: "super-app-theme--header flex-grow-1", minWidth: 100 };
  });

  return (
    <CdContainer fluid className="flex-grow-1 overflow-auto">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <CdRow>
          <CdCol md="12">
            <CdCard>
              <CardHeaderCommon headClass="mb-3" title={"Recent Emergency Work Requests"} />
                <CdDataGrid
                  height={650}
                  columns={updatedColumns}
                  rows={rows}
                  setRows={setRows}
                  getRowId={(row: EwrRow) => row.requestId}
                  initialState={initialState}
                  paginationModel={paginationModel}
                  onPaginationModelChange={handlePaginationChange}
                  pageSizeOptions={[10, 25, 100]}
                  rowCount={rowCount}
                  paginationMode={ProcessingMode.Server}
                  enableStateSave={true}
                  userId={USER_ID}
                  interfaceId={GridInterfaceCode.EWRIndex}
                  autoHeight={false}
                  hideToolbar={true}
                />
            </CdCard>
          </CdCol>
        </CdRow>
      )}
    </CdContainer>
  );
};

export default RecentEmergencyWorkRequests;