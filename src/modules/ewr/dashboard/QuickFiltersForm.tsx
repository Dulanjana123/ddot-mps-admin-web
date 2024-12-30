import CdRow from "@atoms/Base/CdRow";
import {
  CdButton,
  CdContainer,
  CdDateInput,
  CdSelectInput,
  CdTextInput,
} from "@atoms/index";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "@enums/components/Container";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilterItems } from "@interfaces/components/datagrid";
import { OptionType } from "@interfaces/components/select";
import { EwrQuickFilterDto } from "@interfaces/request/ewr-quick-filter-dto";
import {
  EwrStatusOption,
  InspStatusOption,
  UserOption,
} from "@interfaces/response/ewr-response-dto";
import { CdLoadingButton } from "@molecules/index";
import { ewrService } from "@services/api/ewr-service";
import { FC, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type QuickFiltersFormProps = {
  setFilterItems: (args: FilterItems) => void;
  setQuickFiltersApplied: (arg: boolean) => void;
  setModalOpen: (arg: boolean) => void;
};

const useInitForm = () => {
  const EwrAdvancedSearchSchema = z.object({
    requestNumber: z.string(),
    location: z.string(),
    effectiveDate: z.string(),
    expirationDate: z.string(),
    assignedInspectorId: z.string(),
    inspStatusId: z.string(),
    ewrStatusId: z.string(),
    ward: z.string(),
    utilityCompany: z.string(),
  });

  const initialValues: EwrQuickFilterDto = {
    requestNumber: "",
    location: "",
    effectiveDate: "",
    expirationDate: "",
    assignedInspectorId: "",
    inspStatusId: "",
    ewrStatusId: "",
    ward: "",
    utilityCompany: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(EwrAdvancedSearchSchema),
  });

  return {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  };
};

const QuickFiltersForm: FC<QuickFiltersFormProps> = ({
  setFilterItems,
  setQuickFiltersApplied,
  setModalOpen,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useInitForm();
  const [assigneeNameOptions, setAssigneeNameOptions] =
    useState<OptionType[]>();

  const [inspectionStatusOptions, setInspectionStatusOptions] =
    useState<OptionType[]>();

  const [ewrStatusOptions, setEwrStatusOptions] = useState<OptionType[]>();

  const [isLoading, setIsLoading] = useState(false);

  const [emptyRequest, setEmptyRequest] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const response = await ewrService.getAssigningInfo();
    if (response) {
      const assigneeOptions: OptionType[] =
        response.data?.inspectors.map((item: UserOption) => ({
          key: item.userId,
          value: item.fullName,
        })) ?? [];
      const inspStatusOptions: OptionType[] =
        response.data?.inspStatuses.map((item: InspStatusOption) => ({
          key: item.inspStatusId,
          value: item.inspStatusDesc,
        })) ?? [];
      const ewrStOptions: OptionType[] =
        response.data?.ewrStatuses.map((item: EwrStatusOption) => ({
          key: item.statusId,
          value: item.statusDesc,
        })) ?? [];
      setAssigneeNameOptions(assigneeOptions);
      setInspectionStatusOptions(inspStatusOptions);
      setEwrStatusOptions(ewrStOptions);
    }
  };

  const onSubmitHandler: SubmitHandler<EwrQuickFilterDto> = async (
    filterData
  ) => {

    const typeModifiedFilterData = {
      ...filterData,
      ...(filterData.assignedInspectorId !== "" && {
        assignedIndpectorId: Number(filterData.assignedInspectorId),
      }),
      ...(filterData.inspStatusId !== "" && {
        inspStatusId: Number(filterData.inspStatusId),
      }),
      ...(filterData.ewrStatusId !== "" && {
        ewrStatusId: Number(filterData.ewrStatusId),
      }),
    };

    if (Object.values(filterData).every((value) => value === "")) {
      setEmptyRequest(true);
    } else {
      setEmptyRequest(false);
      const advancedFilterItems: FilterItems = {
        items: Object.keys(typeModifiedFilterData)
          .filter(
            (key) =>
              typeModifiedFilterData[key as keyof EwrQuickFilterDto] !== ""
          )
          .map((key) => ({
            field: key,
            value: typeModifiedFilterData[key],
          })),
      };
      setFilterItems(advancedFilterItems);
      setQuickFiltersApplied(true);
      setModalOpen(false);
    }
  };

  const handleResetForm = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {emptyRequest && (
        <div className="text-danger ">At leaset one field is required.</div>
      )}
      <CdRow sm="2">
        <Controller
          name="requestNumber"
          control={control}
          render={({ field }) => (
            <CdTextInput
              id="requestNumber"
              label="Emergency Request Number"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <CdTextInput
              id="location"
              label="Work Address Location"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        <Controller
          name="effectiveDate"
          control={control}
          render={({ field }) => (
            <CdDateInput
              id="effectiveDate"
              onChange={(e) => field.onChange(e.target.value)}
              label="Application Start Date"
              value={field.value}
            />
          )}
        />
        <Controller
          name="expirationDate"
          control={control}
          render={({ field }) => (
            <CdDateInput
              id="expirationDate"
              onChange={(e) => field.onChange(e.target.value)}
              label="Application End Date"
              value={field.value}
            />
          )}
        />
        {assigneeNameOptions && (
          <Controller
            name="assignedInspectorId"
            control={control}
            render={({ field }) => (
              <CdSelectInput
                options={assigneeNameOptions}
                onSelect={(e) => field.onChange(e.target.value)}
                value={field.value}
                label="Assigned Inspector"
                id="assignedInspectorId"
              />
            )}
          />
        )}
        {inspectionStatusOptions && (
          <Controller
            name="inspStatusId"
            control={control}
            render={({ field }) => (
              <CdSelectInput
                options={inspectionStatusOptions}
                onSelect={(e) => field.onChange(e.target.value)}
                value={field.value}
                label="Inspection Status"
                id="category"
              />
            )}
          />
        )}
        {ewrStatusOptions && (
          <Controller
            name="ewrStatusId"
            control={control}
            render={({ field }) => (
              <CdSelectInput
                options={ewrStatusOptions}
                onSelect={(e) => field.onChange(e.target.value)}
                value={field.value}
                label="EWR Status"
                id="ewr-status"
              />
            )}
          />
        )}
        <Controller
          name="ward"
          control={control}
          render={({ field }) => (
            <CdSelectInput
              options={[
                { key: "1", value: "Ward 1" },
                { key: "2", value: "Ward 2" },
                { key: "3", value: "Ward 3" },
                { key: "4", value: "Ward 4" },
                { key: "5", value: "Ward 5" },
                { key: "6", value: "Ward 6" },
                { key: "7", value: "Ward 7" },
                { key: "8", value: "Ward 8" },
              ]}
              onSelect={(e) => field.onChange(e.target.value)}
              value={field.value}
              label="Ward"
              id="wards"
            />
          )}
        />
        <Controller
          name="utilityCompany"
          control={control}
          render={({ field }) => (
            <CdTextInput
              id="uitilityCompany"
              label="Uitility Company"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </CdRow>
      <CdContainer
        flex
        alignItems={AlignItems.baseline}
        justifyContent={JustifyContent.end}
        flexDirection={FlexDirection.row}
        gap="10px"
      >
        <CdButton
          id="reset-btn"
          onClick={handleResetForm}
          type={ButtonTypes.reset}
        >
          Reset
        </CdButton>
        <CdLoadingButton
          color={Variant.primary}
          isLoading={isSubmitting || isLoading}
          text="Filter"
          size={ButtonSizes.sm}
          type={ButtonTypes.submit}
          disabled={isSubmitting || isLoading}
          id={"assign-button"}
        />
      </CdContainer>
    </form>
  );
};

export default QuickFiltersForm;
