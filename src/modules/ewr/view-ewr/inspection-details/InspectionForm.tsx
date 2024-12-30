import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import {
  CdButton,
  CdContainer,
  CdDatePicker,
  CdDropzone,
  CdInputLabel,
  CdNumberInput,
  CdTextAreaInput,
} from "@atoms/index";
import { ExtFile } from "@dropzone-ui/react";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import { DateFormat } from "@enums/date-format-types";
import { FormAction } from "@enums/form-action";
import { zodResolver } from "@hookform/resolvers/zod";
import translatedFormValidation from "@hooks/useTranslatedFormValidation";
import { InspectionDetailsDto } from "@interfaces/request/ewr-inspection-dto";
import { CdLoadingButton } from "@molecules/index";
import { formatDate } from "@utils/format-date-utils";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type InspectionFormProps = {
  onSubmit: (data: any) => void;
  formAction: FormAction;
  initialData?: InspectionDetailsDto;
  onToggle?: () => void;
  isSubmitting?: boolean;
};

const InspectionDocumentDtoSchema = z.object({
  documentId: z.number(),
  documentName: z.string(),
  documentType: z.string().nullable(),
  documentPath: z.string().nullable(),
  cloudPath: z.string().nullable(),
  documentSize: z.number().nullable(),
  createdDate: z.string().nullable(),
});

const useInspectioninitForm = () => {
  const InspectionDetailsSchema = z.object({
    inspectionDate: z
      .date()
      .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
        message: "Inspection date is required and must be a valid date",
      }),
    hoursSpent: z
      .number()
      .min(0, { message: "Hours spent must be greater than or equal to 0" }),
    minutesSpent: z
      .number()
      .min(0, { message: "Minutes spent must be greater than or equal to 0" }),
    internalNotes: z.string().transform((value) => value.trim()),
    externalNotes: z.string().transform((value) => value.trim()),
    files: z
      .array(z.union([z.instanceof(File), InspectionDocumentDtoSchema]))
      .refine((files) => files.length >= 1, {
        message: "At least one file is required",
      }),
  });

  type FormFields = z.infer<typeof InspectionDetailsSchema>;

  const initialValues = {
    inspectionDate: new Date(),
    internalNotes: "",
    externalNotes: "",
    files: [],
    hoursSpent: undefined,
    minutesSpent: undefined,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormFields>({
    defaultValues: initialValues,
    resolver: zodResolver(InspectionDetailsSchema),
  });

  return { control, handleSubmit, errors, setValue };
};

const InspectionForm: React.FC<InspectionFormProps> = ({
  onSubmit,
  formAction,
  initialData,
  onToggle,
  isSubmitting,
}) => {
  const { control, handleSubmit, errors, setValue } = useInspectioninitForm();

  useEffect(() => {
    if (initialData && formAction === FormAction.Update) {
      setValue(
        "inspectionDate",
        initialData.inspectionDate
          ? new Date(
              formatDate(initialData?.inspectionDate, DateFormat.YYYY_MM_DD)
            )
          : new Date()
      );
      setValue("hoursSpent", initialData?.hoursSpent ?? 0);
      setValue("minutesSpent", initialData?.minutesSpent ?? 0);
      setValue("internalNotes", initialData?.internalNotes ?? "");
      setValue("externalNotes", initialData?.externalNotes ?? "");
      setValue("files", initialData?.files ?? []);
    }
  }, [initialData]);

  return (
    <CdContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CdRow>
          <CdCol xs={12} md={6}>
            <Controller
              name="inspectionDate"
              control={control}
              render={({ field }) => (
                <CdDatePicker
                  id={"inspectionDate"}
                  label="Inspection Date"
                  placeholderText="Select a date"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
          </CdCol>
        </CdRow>
        <CdRow>
          <CdInputLabel labelText={"Hours Spent (HH:MM)"} />
          <CdCol xs={12} md={6}>
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
          </CdCol>
          <CdCol xs={12} md={6}>
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
          </CdCol>
        </CdRow>
        <CdRow>
          <CdCol>
            <Controller
              name="internalNotes"
              control={control}
              render={({ field }) => (
                <CdTextAreaInput
                  id="internalNotes"
                  label="Internal Notes (Optional)"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  invalid={!!errors.internalNotes}
                  feedback={translatedFormValidation(
                    errors.internalNotes?.message
                  )}
                />
              )}
            />
          </CdCol>
        </CdRow>
        <CdRow>
          <CdCol>
            <Controller
              name="externalNotes"
              control={control}
              render={({ field }) => (
                <CdTextAreaInput
                  id="externalNotes"
                  label="External Notes (Optional)"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  invalid={!!errors.externalNotes}
                  feedback={translatedFormValidation(
                    errors.externalNotes?.message
                  )}
                />
              )}
            />
          </CdCol>
        </CdRow>
        <CdRow>
          <CdCol>
            <Controller
              name="files"
              control={control}
              render={({ field }) => (
                <CdDropzone
                  id="files"
                  label="Document Upload"
                  required
                  files={
                    field.value?.map((file) => {
                      if (file instanceof File) {
                        return {
                          id: file.name,
                          name: file.name,
                          size: file.size,
                          type: file.type,
                        };
                      } else {
                        return {
                          id: file.documentId,
                          name: file.documentName,
                          size: file?.documentSize ?? undefined,
                          type: file?.documentType ?? undefined,
                        };
                      }
                    }) || []
                  }
                  onChange={(incomingFiles: ExtFile[]) => {
                    const fileArray = incomingFiles.map(
                      (extFile) => extFile.file
                    );
                    field.onChange(fileArray);
                  }}
                  note="Upload your files here"
                  invalid={!!errors.files}
                  feedback={translatedFormValidation(errors.files?.message)}
                />
              )}
            />
          </CdCol>
        </CdRow>
        <CdRow className="mt-3">
          <CdCol className="d-flex justify-content-between gap-3">
            <CdButton
              className="w-25"
              outline
              onClick={onToggle}
              disabled={isSubmitting}
            >
              Cancel
            </CdButton>
            <CdLoadingButton
              className="w-25"
              color={Variant.primary}
              isLoading={isSubmitting || false}
              text="Save"
              size={ButtonSizes.md}
              type={ButtonTypes.submit}
              disabled={isSubmitting}
              id={"save-button"}
            />
          </CdCol>
        </CdRow>
      </form>
    </CdContainer>
  );
};

export default InspectionForm;
