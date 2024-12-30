import {
  CdCheckboxInput,
  CdContainer,
  CdEmailInput,
  CdInputLabel,
  CdMobileInput,
  CdTextInput,
} from "@atoms/index";
import { AgencyCategoryCode } from "@enums/agency-category-code";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "@enums/components/Container";
import { FormAction } from "@enums/form-action";
import { zodResolver } from "@hookform/resolvers/zod";
import translatedFormValidation from "@hooks/useTranslatedFormValidation";
import { ReviewerAgencyDto } from "@interfaces/request/reviewer-agency-dto";
import { CdLoadingButton } from "@molecules/index";
import { isUSMobileNoValid } from "@utils/phoneNumberValidation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Col, Row } from "reactstrap";
import { z } from "zod";

type ReviewerAgencyFormProps = {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  buttonText?: string;
  formInitial: ReviewerAgencyDto;
  formAction?: FormAction;
  setIsDirty?: (args: boolean) => void;
};

const initForm = () => {
  const CreateReviewerAgencySchema = z.object({
    agencyCategoryCode: z.string(),
    agencyCode: z
      .string()
      .transform((value) => value.trim())
      .pipe(z.string().min(1, "Agency Code is required."))
      .pipe(z.string().max(30, "Maximum character length is exceeded.")),
    agencyName: z
      .string()
      .transform((value) => value.trim())
      .pipe(z.string().min(1, "Agency Name is required.")),
    agencyAddress: z.string().transform((value) => value.trim()),
    agencyTelephone: z
      .string()
      .min(1, "Agency Telephone is required.")
      .refine((val) => isUSMobileNoValid(val), {
        message: "Invalid Phone Number.",
      }),
    contactName: z
      .string()
      .transform((value) => value.trim())
      .pipe(z.string().min(1, "Contact Person Name is required.")),
    contactTelephone: z
      .string()
      .min(1, "Contact Person Mobile Number is required.")
      .refine((val) => isUSMobileNoValid(val), {
        message: "Invalid Mobile Number.",
      }),
    contactEmail: z
      .string()
      .transform((value) => value.trim())
      .pipe(z.string().min(1, "Contact Person Email is required."))
      .pipe(z.string().email({ message: "Invalid Email Address." })),
    isActive: z.boolean(),
  });

  type FormFields = z.infer<typeof CreateReviewerAgencySchema>;

  const initialValues = {
    agencyCategoryCode: AgencyCategoryCode.ReviewingAgency,
    agencyCode: "",
    agencyName: "",
    agencyAddress: "",
    agencyTelephone: "",
    contactName: "",
    contactTelephone: "",
    contactEmail: "",
    isActive: true,
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<FormFields>({
    defaultValues: initialValues,
    resolver: zodResolver(CreateReviewerAgencySchema),
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

const ReviewerAgencyForm: React.FC<ReviewerAgencyFormProps> = ({
  onSubmit,
  isLoading,
  buttonText,
  formInitial,
  formAction,
  setIsDirty,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
  } = initForm();

  const formValues = watch();

  useEffect(() => {
    if (formInitial) {
      reset({
        agencyCategoryCode:
          formInitial.agencyCategoryCode || AgencyCategoryCode.ReviewingAgency,
        agencyCode: formInitial.agencyCode || "",
        agencyName: formInitial.agencyName || "",
        agencyAddress: formInitial.agencyAddress || "",
        agencyTelephone: formInitial.agencyTelephone || "",
        contactName: formInitial.contactName || "",
        contactTelephone: formInitial.contactTelephone || "",
        contactEmail: formInitial.contactEmail || "",
        isActive: formInitial.isActive || true,
      });
    }
  }, [formInitial, reset]);

  useEffect(() => {
    if (setIsDirty) {
      if (
        formValues.agencyAddress !== "" ||
        formValues.agencyCode !== "" ||
        formValues.agencyName !== "" ||
        formValues.agencyTelephone !== "" ||
        formValues.contactName !== "" ||
        formValues.contactEmail !== "" ||
        formValues.contactTelephone !== ""
      ) {
        setIsDirty(true);
      } else {
        setIsDirty(false);
      }
    }
  }, [formValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row xs="1" md="2" className="d-flex align-items-baseline">
        <Col>
          <Controller
            name="agencyCode"
            control={control}
            render={({ field }) => (
              <CdTextInput
                id="agencyCode"
                label="Agency Code"
                value={field.value}
                disabled={formAction === FormAction.View}
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.agencyCode}
                feedback={translatedFormValidation(errors.agencyCode?.message)}
                required
              />
            )}
          />
          <Controller
            name="agencyName"
            control={control}
            render={({ field }) => (
              <CdTextInput
                id="agencyName"
                label="Agency Name"
                value={field.value}
                disabled={formAction === FormAction.View}
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.agencyName}
                feedback={translatedFormValidation(errors.agencyName?.message)}
                required
              />
            )}
          />
          <Controller
            name="agencyAddress"
            control={control}
            render={({ field }) => (
              <CdTextInput
                id="agencyAddress"
                label="Agency Address"
                value={field.value}
                disabled={formAction === FormAction.View}
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.agencyAddress}
                feedback={translatedFormValidation(
                  errors.agencyAddress?.message
                )}
              />
            )}
          />
          <Controller
            name="agencyTelephone"
            control={control}
            render={({ field }) => (
              <CdMobileInput
                label="Agency Telephone"
                className="mobile-input"
                defaultValue={field.value}
                disabled={formAction === FormAction.View}
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.agencyTelephone}
                placeHolder="(XXX) XXX-XXXX"
                feedback={translatedFormValidation(
                  errors.agencyTelephone?.message
                )}
                required
                id="agencyTelephone"
              />
            )}
          />
        </Col>
        <Col>
          <Controller
            name="contactName"
            control={control}
            render={({ field }) => (
              <CdTextInput
                label="Contact Person Name"
                id="contactName"
                value={field.value}
                disabled={formAction === FormAction.View}
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.contactName}
                feedback={translatedFormValidation(errors.contactName?.message)}
                required
              />
            )}
          />
          <Controller
            name="contactTelephone"
            control={control}
            render={({ field }) => (
              <CdMobileInput
                label="Contact Person Mobile Number"
                className="mobile-input"
                defaultValue={field.value}
                disabled={formAction === FormAction.View}
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.contactTelephone}
                placeHolder="(XXX) XXX-XXXX"
                feedback={translatedFormValidation(
                  errors.contactTelephone?.message
                )}
                required
                id="contactTelephone"
              />
            )}
          />
          <Controller
            name="contactEmail"
            control={control}
            render={({ field }) => (
              <CdEmailInput
                id="contactEmail"
                label="Contact Person Email"
                value={field.value}
                disabled={formAction === FormAction.View}
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.contactEmail}
                feedback={translatedFormValidation(
                  errors.contactEmail?.message
                )}
                required
              />
            )}
          />
        </Col>
      </Row>
      <CdContainer
        className="mt-2 p-0"
        flex
        justifyContent={JustifyContent.start}
        flexDirection={FlexDirection.row}
      >
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <CdCheckboxInput
              id="active"
              disabled={formAction === FormAction.View}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        <CdInputLabel
          style={{ marginLeft: "5px" }}
          id="active"
          labelText="Active"
        />
      </CdContainer>
      {formAction !== FormAction.View && buttonText && (
        <CdContainer
          flex
          alignItems={AlignItems.baseline}
          justifyContent={JustifyContent.end}
          flexDirection={FlexDirection.row}
        >
          <CdLoadingButton
            color={Variant.primary}
            isLoading={isSubmitting || isLoading}
            text={buttonText}
            size={ButtonSizes.md}
            type={ButtonTypes.submit}
            disabled={isSubmitting || isLoading}
            id={"save-button"}
          />
        </CdContainer>
      )}
    </form>
  );
};

export default ReviewerAgencyForm;
