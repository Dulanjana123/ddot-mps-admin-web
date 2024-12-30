import CdRow from "@atoms/Base/CdRow";
import {
  CdButton,
  CdContainer,
  CdDateInput,
  CdDropzone,
  CdInputLabel,
  CdMobileInput,
  CdNumberInput,
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
import { SWOPreviewDto } from "@interfaces/request/swo-dto";
import { SwoViolationTypeOption } from "@interfaces/response/swo-response-dto";
import { CdLoadingButton } from "@molecules/index";
import { swoService } from "@services/api/swo-service";
import { setActiveTab, setSWOData } from "@store/reducers/mps/swoWizardSlice";
import { useAppDispatch, useAppSelector } from "@store/state-hooks";
import { isUSMobileNoValid } from "@utils/phoneNumberValidation";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { H3 } from "src/AbstractElements";
import { z } from "zod";

type SwoPreviewFormProps = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  isDirty: boolean;
  setIsDirty: (args: boolean) => void;
};

const useInitForm = () => {
  const swoPreviewFormSchema = z.object({
    swoNumber: z.string().min(1, "SWO Number is required."),
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
    swoFiles: z.array(z.instanceof(File)).refine((files) => files.length >= 1, {
      message: "At least one file is required.",
    }),
    inspectionDate: z.string().pipe(z.string().min(1, "Date is required.")),
    hoursSpent: z.number(),
    minutesSpent: z.number(),
    inspectionInternalNotes: z
      .string()
      .transform((value) => value.trim())
      .pipe(z.string().min(1, "Internal Note is required.")),
    externalNotes: z.string().transform((value) => value.trim()),
    inspectionFiles: z
      .array(z.instanceof(File))
      .refine((files) => files.length >= 1, {
        message: "At least one file is required",
      }),
  });

  const defaultValues: SWOPreviewDto = {
    swoNumber: "",
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
    inspectionDate: "",
    inspectionInternalNotes: "",
    externalNotes: "",
    inspectionFiles: [],
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
    resolver: zodResolver(swoPreviewFormSchema),
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

const SWOPreviewForm: FC<SwoPreviewFormProps> = ({
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

  const dispatch = useAppDispatch();

  const [swoPreviewEditDisabled, setSwoPreviewEditDisabled] = useState(true);

  const [violationTypeOptions, setViolationTypeOptions] =
    useState<OptionType[]>();

  const [btnActionType, setBtnActionType] = useState<FormWizardActionTypes>();

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
        inspectionDate: swoData.inspectionDate ?? "",
        hoursSpent: Number(swoData.hoursSpent),
        minutesSpent: Number(swoData.minutesSpent),
        inspectionInternalNotes: swoData.inspectionInternalNotes ?? "",
        externalNotes: swoData.externalNotes ?? "",
      });
      setSwoPreviewEditDisabled(true);
    }
  }, [swoData, reset]);

  const handleEditEnable = () => {
    setSwoPreviewEditDisabled(false);
  };

  // Separate functions for the two actions
  const handleSaveAsDraft = () => {
    handleSubmit((data) =>
      onSubmit({ ...data, actionType: FormWizardActionTypes.SaveDraft })
    )();
    setBtnActionType(FormWizardActionTypes.SaveDraft);
  };

  const handleFinalSubmit = () => {
    handleSubmit((data) =>
      onSubmit({ ...data, actionType: FormWizardActionTypes.Submit })
    )();
    setBtnActionType(FormWizardActionTypes.Submit);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <CdRow sm="2">
        <div>
          <CdContainer
            className="p-0"
            flex
            alignItems={AlignItems.baseline}
            justifyContent={JustifyContent.spaceBetween}
            flexDirection={FlexDirection.row}
          >
            <H3 className="mb-3">Violation Details</H3>
            <CdButton
              onClick={handleEditEnable}
              type={ButtonTypes.button}
              color={Variant.primary}
            >
              Edit
            </CdButton>
          </CdContainer>

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
                readonly
              />
            )}
          />
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
                  required={!swoPreviewEditDisabled}
                  disabled={swoPreviewEditDisabled}
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
                required={!swoPreviewEditDisabled}
                readonly={swoPreviewEditDisabled}
              />
            )}
          />
          {inspectorsList && (
            <Controller
              name="issuedBy"
              control={control}
              render={({ field }) => (
                <CdSelectInput
                  label="Issued By"
                  id={"swo-inspector"}
                  options={inspectorsList}
                  value={field.value}
                  onSelect={(event) =>
                    dispatch(
                      setSWOData({
                        ...swoData,
                        inspectorId: event.target.value,
                      })
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
                required={!swoPreviewEditDisabled}
                readonly={swoPreviewEditDisabled}
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
                required={!swoPreviewEditDisabled}
                readonly={swoPreviewEditDisabled}
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
                required={!swoPreviewEditDisabled}
                readonly={swoPreviewEditDisabled}
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
                required={!swoPreviewEditDisabled}
                id="workSiteForemanPhone"
                readonly={swoPreviewEditDisabled}
              />
            )}
          />
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
                required={!swoPreviewEditDisabled}
                readonly={swoPreviewEditDisabled}
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
                required={!swoPreviewEditDisabled}
                readonly={swoPreviewEditDisabled}
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
                feedback={translatedFormValidation(
                  errors.internalNotes?.message
                )}
                required={!swoPreviewEditDisabled}
                readonly={swoPreviewEditDisabled}
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
                required={!swoPreviewEditDisabled}
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
                  const fileArray = incomingFiles.map(
                    (extFile) => extFile.file
                  );
                  field.onChange(fileArray);
                }}
                note="Upload your files here"
                invalid={!!errors.swoFiles}
                feedback={translatedFormValidation(errors.swoFiles?.message)}
                readonly={swoPreviewEditDisabled}
              />
            )}
          />
        </div>
        <div>
          <H3 className="mb-3">Inspection Details</H3>
          <CdRow xs="1" md="2" className="d-flex align-items-baseline">
            <Controller
              name="inspectionDate"
              control={control}
              render={({ field }) => (
                <CdDateInput
                  id="inspectionDate"
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Inspection Date"
                  value={field.value}
                  invalid={!!errors.inspectionDate}
                  feedback={translatedFormValidation(
                    errors.inspectionDate?.message
                  )}
                  required
                />
              )}
            />
            <div>
              <CdInputLabel id="" labelText="Hours Spent" required />
              <CdRow xs="1" md="2">
                <Controller
                  name="hoursSpent"
                  control={control}
                  render={({ field }) => (
                    <CdNumberInput
                      id="hoursSpent"
                      placeHolder="HH"
                      defaultValue={field.value}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      invalid={!!errors.hoursSpent}
                      feedback={translatedFormValidation(
                        errors.hoursSpent?.message
                      )}
                    />
                  )}
                />
                <Controller
                  name="minutesSpent"
                  control={control}
                  render={({ field }) => (
                    <CdNumberInput
                      id="minutesSpent"
                      placeHolder="MM"
                      defaultValue={field.value}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      invalid={!!errors.minutesSpent}
                      feedback={translatedFormValidation(
                        errors.minutesSpent?.message
                      )}
                    />
                  )}
                />
              </CdRow>
            </div>
          </CdRow>
          <Controller
            name="inspectionInternalNotes"
            control={control}
            render={({ field }) => (
              <CdTextAreaInput
                id="inspectionInternalNotes"
                label="Internal Notes"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.inspectionInternalNotes}
                feedback={translatedFormValidation(
                  errors.inspectionInternalNotes?.message
                )}
                required
              />
            )}
          />
          <Controller
            name="externalNotes"
            control={control}
            render={({ field }) => (
              <CdTextAreaInput
                id="externalNotes"
                label="External Notes"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.externalNotes}
                feedback={translatedFormValidation(
                  errors.externalNotes?.message
                )}
              />
            )}
          />
          <Controller
            name="inspectionFiles"
            control={control}
            render={({ field }) => (
              <CdDropzone
                id="inspectionFiles"
                label="Document Upload"
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
                  const fileArray = incomingFiles.map(
                    (extFile) => extFile.file
                  );
                  field.onChange(fileArray);
                }}
                note="Upload your files here"
                invalid={!!errors.inspectionFiles}
                feedback={translatedFormValidation(
                  errors.inspectionFiles?.message
                )}
              />
            )}
          />
        </div>
      </CdRow>

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
          onClick={() => dispatch(setActiveTab(3))}
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
            isLoading={
              (isSubmitting || isLoading) &&
              btnActionType === FormWizardActionTypes.SaveDraft
            }
            text="Save as Draft"
            size={ButtonSizes.md}
            type={ButtonTypes.button}
            disabled={isSubmitting || isLoading}
            onClick={handleSaveAsDraft}
            id={"save-button"}
          />
          <CdLoadingButton
            color={Variant.primary}
            isLoading={
              (isSubmitting || isLoading) &&
              btnActionType === FormWizardActionTypes.Submit
            }
            text="Submit"
            size={ButtonSizes.md}
            type={ButtonTypes.button}
            disabled={isSubmitting || isLoading}
            onClick={handleFinalSubmit}
            id={"submit-button"}
          />
        </CdContainer>
      </CdContainer>
    </form>
  );
};

export default SWOPreviewForm;
