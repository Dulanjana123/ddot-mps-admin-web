import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import {
  CdButton,
  CdContainer,
  CdLink,
  CdSelectInput,
  CdTextAreaInput,
} from "@atoms/index";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "@enums/components/Container";
import { zodResolver } from "@hookform/resolvers/zod";
import translatedFormValidation from "@hooks/useTranslatedFormValidation";
import { OptionType } from "@interfaces/components/select";
import { EwrAssignInitialDto } from "@interfaces/request/ewr-assign-dto";
import {
  EwrStatusOption,
  InspStatusOption,
  UserOption,
} from "@interfaces/response/ewr-response-dto";
import { CdLoadingButton } from "@molecules/index";
import { ewrService } from "@services/api/ewr-service";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type AssignReassignFormProps = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  isDirty: boolean;
  setIsDirty: (args: boolean) => void;
  bulkAssigningEnable?: boolean;
  isNoCheckedItemsRemaining?: boolean;
  formInitial?: EwrAssignInitialDto;
  onCancelHandler?: () => void;
};

const useInitForm = () => {
  const ewrAssignFormSchema = z.object({
    assigneeId: z.string(),
    inspStatusId: z.string(),
    ewrStatusId: z.string(),
    comments: z.string().optional(),
  });

  const defaultValues = {
    assigneeId: "",
    inspStatusId: "",
    ewrStatusId: "",
    comments: "",
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
    resolver: zodResolver(ewrAssignFormSchema),
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

const AssignReassignForm: FC<AssignReassignFormProps> = ({
  onSubmit,
  isLoading,
  isDirty,
  setIsDirty,
  bulkAssigningEnable = false,
  formInitial,
  onCancelHandler,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useInitForm();

  const [assigneeNameOptions, setAssigneeNameOptions] =
    useState<OptionType[]>();

  const [inspectionStatusOptions, setInspectionStatusOptions] =
    useState<OptionType[]>();

  const [ewrStatusOptions, setEwrStatusOptions] = useState<OptionType[]>();

  const formValues = watch();

  useEffect(() => {
    if (formInitial) {
      reset({
        assigneeId: formInitial.assigneeId ?? "",
        inspStatusId: formInitial.inspStatusId ?? "",
        ewrStatusId: formInitial.ewrStatusId ?? "",
        comments: formInitial.comments ?? "",
      });
    }
  }, [reset]);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (
      formValues.assigneeId !== "" ||
      formValues.ewrStatusId !== "" ||
      formValues.inspStatusId !== "" ||
      formValues.comments !== ""
    ) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [formValues]);

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

  const onResetChanges = () => {
    reset({
      assigneeId: "",
      inspStatusId: "",
      ewrStatusId: "",
      comments: "",
    });
    if (onCancelHandler) {
      onCancelHandler();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CdRow sm="2">
        <CdCol sm={bulkAssigningEnable ? 6 : 8}>
          <CdRow sm={bulkAssigningEnable ? 1 : 3}>
            {assigneeNameOptions && (
              <Controller
                name="assigneeId"
                control={control}
                render={({ field }) => (
                  <CdSelectInput
                    options={assigneeNameOptions}
                    onSelect={(e) => field.onChange(e.target.value)}
                    label="Assignee Name"
                    value={field.value}
                    invalid={!!errors.assigneeId}
                    feedback={errors.assigneeId?.message}
                    id="category"
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
                    label="Inspection Status"
                    value={field.value}
                    invalid={!!errors.inspStatusId}
                    feedback={errors.inspStatusId?.message}
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
                    label="EWR Status"
                    value={field.value}
                    invalid={!!errors.ewrStatusId}
                    feedback={errors.ewrStatusId?.message}
                    id="category"
                  />
                )}
              />
            )}
          </CdRow>
        </CdCol>
        <CdCol sm={bulkAssigningEnable ? 12 : 8}>
          <Controller
            name="comments"
            control={control}
            render={({ field }) => (
              <CdTextAreaInput
                id="comments"
                label="Comments"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.comments}
                feedback={translatedFormValidation(errors.comments?.message)}
              />
            )}
          />
        </CdCol>
      </CdRow>

      <CdContainer
        className="mt-3"
        flex
        alignItems={AlignItems.baseline}
        justifyContent={JustifyContent.flexEnd}
        flexDirection={FlexDirection.row}
        gap="10px"
      >
        <CdButton type={ButtonTypes.reset} onClick={onResetChanges} outline>
          Cancel
        </CdButton>
        <CdLoadingButton
          color={Variant.primary}
          isLoading={isSubmitting || isLoading}
          text="Assign / Reassign"
          size={ButtonSizes.md}
          type={ButtonTypes.submit}
          disabled={!isDirty || isSubmitting || isLoading}
          id={"assign-button"}
        />
      </CdContainer>
    </form>
  );
};

export default AssignReassignForm;
