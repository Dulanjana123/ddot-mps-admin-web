import CdRow from "@atoms/Base/CdRow";
import { CdContainer, CdNumberInput, CdTextInput } from "@atoms/index";
import { ewrIndex } from "@data/datagrid-data/ewr-datagrids";
import { ProcessingMode } from "@enums/components/datagrid-enum";
import { GridInterfaceCode } from "@enums/grid-interface-code";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterItems } from "@interfaces/components/datagrid";
import { DetailWorkRequestProps } from "@interfaces/components/ewr-props";
import { EwrFiltersDto } from "@interfaces/request/ewr-filters-dto";
import { GetPaginatedListDto } from "@interfaces/request/paginated-list-dto";
import { EwrResponseDto } from "@interfaces/response/ewr-response-dto";
import CdDataGrid from "@organisms/DataGrid/CdDataGrid";
import { ewrService } from "@services/api/ewr-service";
import { formatDateDefault } from "@utils/helper/format-date";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { H3 } from "src/AbstractElements";
import { z } from "zod";

// Keep this hardcoded values until Authentication completed
const USER_ID = 1;

const useInitForm = () => {
  const trackingInfoFormSchema = z.object({
    submittedBy: z.string(),
    assignedInspector: z.string(),
    linkedConstructionPermitNumber: z.string(),
    linkedNoiNumber: z.string(),
    linkedSwoNumber: z.string(),
  });

  const defaultValues = {
    submittedBy: "",
    assignedInspector: "",
    linkedConstructionPermitNumber: "",
    linkedNoiNumber: "",
    linkedSwoNumber: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(trackingInfoFormSchema),
  });

  return {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  };
};

const TrackingInformation: React.FC<DetailWorkRequestProps> = ({ data }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = useInitForm();

  const [rows, setRows] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const [filterItems, setFilterItems] = useState<FilterItems>();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const onFilterChange = (event: FilterItems) => {
    setFilterItems(event);
  };

  const setPaginatedList = async (request: GetPaginatedListDto) => {
    await ewrService.getPaginatedList(request).then((response) => {
      const ewrList: EwrResponseDto[] = response.data?.entities || [];
      setRowCount(response.data?.pagination?.length ?? 0);
      setRows(ewrList);
    });
  };

  const loadData = () => {
    if (data) {
      setValue("submittedBy", data.appliedBy);
      setValue("assignedInspector", data.assignedInspector);
      setValue(
        "linkedConstructionPermitNumber",
        (data.cpApplicationId ?? "").toString()
      );
      setValue("linkedNoiNumber", (data.noiApplicationId ?? "").toString());
      setValue("linkedSwoNumber", (data.swoApplicationId ?? "").toString());
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const filters: EwrFiltersDto = {
      locationId: data?.locationId,
      exceptEwrRequestId: data?.requestId,
    };
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
  }, [paginationModel, filterItems, data]);

  return (
    <form>
      <CdRow sm="2">
        <Controller
          name="submittedBy"
          control={control}
          render={({ field }) => (
            <CdTextInput
              id="submittedBy"
              label="Submitted By"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              invalid={!!errors.submittedBy}
              feedback={errors.submittedBy?.message}
              disabled
            />
          )}
        />
        <Controller
          name="assignedInspector"
          control={control}
          render={({ field }) => (
            <CdTextInput
              id="assignedInspector"
              label="Assigned Inspector"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              invalid={!!errors.assignedInspector}
              feedback={errors.assignedInspector?.message}
              disabled
            />
          )}
        />
        <Controller
          name="linkedConstructionPermitNumber"
          control={control}
          render={({ field }) => (
            <CdTextInput
              id="linkedConstructionPermitNumber"
              label="Linked Construction Permit Number"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              invalid={!!errors.linkedConstructionPermitNumber}
              feedback={errors.linkedConstructionPermitNumber?.message}
              disabled
            />
          )}
        />
        <Controller
          name="linkedNoiNumber"
          control={control}
          render={({ field }) => (
            <CdTextInput
              id="linkedNoiNumber"
              label="Linked NOI Number"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              invalid={!!errors.linkedNoiNumber}
              feedback={errors.linkedNoiNumber?.message}
              disabled
            />
          )}
        />
        <Controller
          name="linkedSwoNumber"
          control={control}
          render={({ field }) => (
            <CdTextInput
              id="linkedSwoNumber"
              label="Linked SWO Number"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              invalid={!!errors.linkedSwoNumber}
              feedback={errors.linkedSwoNumber?.message}
              disabled
            />
          )}
        />
      </CdRow>
      <H3 className="mt-2">Conflicting Emergency Work Requests</H3>
      <CdContainer className="p-0 mt-3">
        <CdDataGrid
          height={500}
          columns={ewrIndex.columns}
          rows={rows}
          setRows={setRows}
          disableColumnFilter={true}
          getRowId={(row: any) => row?.requestId}
          rowReordering={true}
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
          interfaceId={GridInterfaceCode.TrackingInfoConflictingEWRsIndex}
        />
      </CdContainer>
    </form>
  );
};

export default TrackingInformation;
