import CdRow from "@atoms/Base/CdRow";
import {
  CdButton,
  CdContainer,
  CdDateInput,
  CdDropzone,
  CdLink,
  CdMobileInput,
  CdSelectInput,
  CdTextAreaInput,
  CdTextInput,
  CdTimeInput,
} from "@atoms/index";
import { ExtFile } from "@dropzone-ui/react";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "@enums/components/Container";
import { FormWizardActionTypes } from "@enums/form-action";
import { zodResolver } from "@hookform/resolvers/zod";
import translatedFormValidation from "@hooks/useTranslatedFormValidation";
import { OptionType } from "@interfaces/components/select";
import { SwoViolationTypeOption } from "@interfaces/response/swo-response-dto";
import { CdLoadingButton } from "@molecules/index";
import { swoService } from "@services/api/swo-service";
import { setActiveTab, setSWOData } from "@store/reducers/mps/swoWizardSlice";
import { useAppDispatch, useAppSelector } from "@store/state-hooks";
import { isUSMobileNoValid } from "@utils/phoneNumberValidation";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type ViolationDetailsFormProps = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  isDirty: boolean;
  setIsDirty: (args: boolean) => void;
};

const useInitForm = () => {
  const swoViolationFormSchema = z
    .object({
      swoNumber: z.string().min(1, "SWO Number is required."),
      confirmSwoNumber: z.string().min(1, "Confirm SWO Number is required."),
      violationReason: z.string().min(1, "Violation Reason is required."),
      violationComments: z.string().min(1, "Violation comments are required."),
      issuedBy: z.string(),
      issuedDate: z.string().min(1, "Issued date is required."),
      issuedTime: z.string().min(1, "Issued time is required."),
      workSiteForeman: z.string().min(1, "Work site foreman is required."),
      workSiteForemanPhone: z
        .string()
        .min(1, "Work site foreman phone number is required.")
        .refine((val) => isUSMobileNoValid(val), {
          message: "Invalid phone number.",
        }),
      weatherConditions: z.string().min(1, "Weather condition is required."),
      workSiteConditions: z.string().min(1, "Work site condition is required."),
      internalNotes: z.string().min(1, "Internal note is required."),
      swoFiles: z
        .array(z.instanceof(File))
        .refine((files) => files.length >= 1, {
          message: "At least one file is required.",
        }),
    })
    .refine((data) => data.swoNumber === data.confirmSwoNumber, {
      message: "SWO Number and Confirm SWO Number must match",
      path: ["confirmSwoNumber"],
    });

  const defaultValues = {
    swoNumber: "",
    confirmSwoNumber: "",
    violationReason: "",
    violationComments: "",
    issuedBy: "",
    issuedDate: "",
    issuedTime: "",
    workSiteForeman: "",
    workSiteForemanPhone: "",
    weatherConditions: "",
    workSiteConditions: "",
    internalNotes: "",
    swoFiles: [],
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
    resolver: zodResolver(swoViolationFormSchema),
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

const ViolationDetailsForm: FC<ViolationDetailsFormProps> = ({
  onSubmit,
  isLoading,
  isDirty,
  setIsDirty,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useInitForm();

  const { swoData, inspectorsList } = useAppSelector(
    (state) => state.swoWizard
  );

  const [violationTypeOptions, setViolationTypeOptions] =
    useState<OptionType[]>();

  const dispatch = useAppDispatch();

  const loadInitialData = async () => {
    const response = await swoService.getViolationTypes();
    if (response) {
      const violationTypesOptions: OptionType[] =
        response.data?.violationTypes.map((item: SwoViolationTypeOption) => ({
          key: item.violationTypeId,
          value: item.violationTypeDesc,
        })) ?? [];
      setViolationTypeOptions(violationTypesOptions);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (swoData) {
      reset({
        swoNumber: swoData.swoNumber ?? "",
        confirmSwoNumber: swoData.swoNumber ?? "",
        violationReason: swoData.violationReason ?? "",
        violationComments: swoData.violationComments ?? "",
        issuedBy: swoData.inspectorId ?? "",
        issuedDate: swoData.issuedDate ?? "",
        issuedTime: swoData.issuedTime ?? "",
        workSiteForeman: swoData.workSiteForeman ?? "",
        workSiteForemanPhone: swoData.workSiteForemanPhone ?? "",
        weatherConditions: swoData.weatherConditions ?? "",
        workSiteConditions: swoData.workSiteConditions ?? "",
        internalNotes: swoData.internalNotes ?? "",
      });
    }
  }, [swoData, reset]);

  // Separate functions for the two actions
  const handleSaveAsDraft = () => {
    handleSubmit((data) =>
      onSubmit({ ...data, actionType: FormWizardActionTypes.SaveDraft })
    )();
  };

  const handleNext = () => {
    handleSubmit((data) =>
      onSubmit({ ...data, actionType: FormWizardActionTypes.Next })
    )();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <CdRow sm="2">
        <Controller
          name="swoNumber"
          control={control}
          render={({ field }) => (
            <CdTextInput
              id="swoNumber"
              label="SWO Number"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              invalid={!!errors.swoNumber}
              feedback={translatedFormValidation(errors.swoNumber?.message)}
              required={swoData?.swoApplicationId == null}
              readonly={swoData?.swoApplicationId != null}
            />
          )}
        />
        <Controller
          name="confirmSwoNumber"
          control={control}
          render={({ field }) => (
            <CdTextInput
              id="confirmSwoNumber"
              label="Confirm SWO Number"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              invalid={!!errors.confirmSwoNumber}
              feedback={translatedFormValidation(
                errors.confirmSwoNumber?.message
              )}
              required={swoData?.swoApplicationId == null}
              readonly={swoData?.swoApplicationId != null}
            />
          )}
        />
      </CdRow>
      {violationTypeOptions && (
        <Controller
          name="violationReason"
          control={control}
          render={({ field }) => (
            <CdSelectInput
              options={violationTypeOptions}
              onSelect={(e) => field.onChange(e.target.value)}
              label="Violation Reason"
              value={field.value}
              invalid={!!errors.violationReason}
              feedback={errors.violationReason?.message}
              id="category"
              required
            />
          )}
        />
      )}
      <Controller
        name="violationComments"
        control={control}
        render={({ field }) => (
          <CdTextAreaInput
            id="violationComments"
            label="Violation Comments"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            invalid={!!errors.violationComments}
            feedback={translatedFormValidation(
              errors.violationComments?.message
            )}
            required
          />
        )}
      />
      <CdRow sm="3">
        {inspectorsList && (
          <Controller
            name="issuedBy"
            control={control}
            render={({ field }) => (
              <CdSelectInput
                label="Issued By"
                id={"swo-inspector"}
                options={inspectorsList}
                value={swoData?.inspectorId ?? ""}
                onSelect={(event) =>
                  dispatch(
                    setSWOData({ ...swoData, inspectorId: event.target.value })
                  )
                }
                disabled
              />
            )}
          />
        )}

        <Controller
          name="issuedDate"
          control={control}
          render={({ field }) => (
            <CdDateInput
              id="issuedDate"
              label="Issued Date"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              invalid={!!errors.issuedDate}
              feedback={translatedFormValidation(errors.issuedDate?.message)}
              required
            />
          )}
        />
        <Controller
          name="issuedTime"
          control={control}
          render={({ field }) => (
            <CdTimeInput
              id="issuedTime"
              label="Issued Time"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              invalid={!!errors.issuedTime}
              feedback={translatedFormValidation(errors.issuedTime?.message)}
              required
            />
          )}
        />
        <Controller
          name="workSiteForeman"
          control={control}
          render={({ field }) => (
            <CdTextInput
              id="workSiteForeman"
              label="Work Site Foreman"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              invalid={!!errors.workSiteForeman}
              feedback={translatedFormValidation(
                errors.workSiteForeman?.message
              )}
              required
            />
          )}
        />
        <Controller
          name="workSiteForemanPhone"
          control={control}
          render={({ field }) => (
            <CdMobileInput
              label="Work Site Foreman Phone"
              className="mobile-input"
              defaultValue={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              invalid={!!errors.workSiteForemanPhone}
              placeHolder="(XXX) XXX-XXXX"
              feedback={translatedFormValidation(
                errors.workSiteForemanPhone?.message
              )}
              required
              id="workSiteForemanPhone"
            />
          )}
        />
      </CdRow>
      <Controller
        name="weatherConditions"
        control={control}
        render={({ field }) => (
          <CdTextAreaInput
            id="weatherConditions"
            label="Weather Conditions"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            invalid={!!errors.weatherConditions}
            feedback={translatedFormValidation(
              errors.weatherConditions?.message
            )}
            required
          />
        )}
      />
      <Controller
        name="workSiteConditions"
        control={control}
        render={({ field }) => (
          <CdTextAreaInput
            id="workSiteConditions"
            label="Work Site Conditions"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            invalid={!!errors.workSiteConditions}
            feedback={translatedFormValidation(
              errors.workSiteConditions?.message
            )}
            required
          />
        )}
      />
      <Controller
        name="internalNotes"
        control={control}
        render={({ field }) => (
          <CdTextAreaInput
            id="internalNotes"
            label="Internal Notes"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            invalid={!!errors.internalNotes}
            feedback={translatedFormValidation(errors.internalNotes?.message)}
            required
          />
        )}
      />
      <Controller
        name="swoFiles"
        control={control}
        render={({ field }) => (
          <CdDropzone
            id="swoFiles"
            label="Upload Related Documents"
            required
            files={
              field.value?.map((file: File) => ({
                id: file.name,
                file,
                name: file.name,
                size: file.size,
                type: file.type,
              })) || []
            }
            onChange={(incomingFiles: ExtFile[]) => {
              const fileArray = incomingFiles.map((extFile) => extFile.file);
              field.onChange(fileArray);
            }}
            note="Upload your files here"
            invalid={!!errors.swoFiles}
            feedback={translatedFormValidation(errors.swoFiles?.message)}
          />
        )}
      />
      <CdContainer
        className="mt-3 p-0"
        flex
        alignItems={AlignItems.baseline}
        justifyContent={JustifyContent.spaceBetween}
        flexDirection={FlexDirection.row}
      >
        <CdButton
          id="back-button"
          text="Back"
          onClick={() => dispatch(setActiveTab(2))}
        />
        <CdContainer
          flex
          alignItems={AlignItems.baseline}
          justifyContent={JustifyContent.end}
          flexDirection={FlexDirection.row}
          gap="5px"
        >
          <CdLoadingButton
            color={Variant.primary}
            isLoading={isSubmitting || isLoading}
            text="Save as Draft"
            size={ButtonSizes.md}
            type={ButtonTypes.button}
            disabled={isSubmitting || isLoading}
            onClick={handleSaveAsDraft}
            id={"save-button"}
          />
          <CdButton
            color={Variant.primary}
            text="Next"
            size={ButtonSizes.md}
            type={ButtonTypes.button}
            disabled={isSubmitting || isLoading}
            onClick={handleNext}
            id={"next-button"}
          />
        </CdContainer>
      </CdContainer>
    </form>
  );
};

export default ViolationDetailsForm;
