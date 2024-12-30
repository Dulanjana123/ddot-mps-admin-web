import {
  CdButton,
  CdContainer,
  CdDateInput,
  CdSelectInput,
  CdTextAreaInput,
  CdTextInput,
} from "@atoms/index";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "@enums/components/Container";
import translatedFormValidation from "@hooks/useTranslatedFormValidation";
import { CdLoadingButton } from "@molecules/index";
import { useAppDispatch } from "@store/hooks";
import { setTab, updateForm } from "@store/reducers/watchLockFormWizard";
import React from "react";
import { Controller } from "react-hook-form";
import { Col, Row } from "reactstrap";
import useWatchLockDetailInitForm from "./form-schema/add-watch-lock-area-schema";

const AddWatchLockAreaDetailsForm: React.FC = () => {
  const { control, errors, handleSubmit, isSubmitting, reset } =
    useWatchLockDetailInitForm();
  const dispatch = useAppDispatch();

  const onSubmit = (data) => {
    dispatch(updateForm({ step: "watchLockAreaDetails", data }));
    dispatch(
      setTab({
        tab: 2,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row className="d-flex align-items-baseline">
        <Col xs={12} md={6}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CdSelectInput
                options={[
                  { key: "watch", value: "Watch" },
                  { key: "lock", value: "Lock" },
                ]}
                onSelect={(e) => field.onChange(e.target.value)}
                label="Category"
                invalid={!!errors.category}
                feedback={errors.category?.message}
                required
                id="category"
              />
            )}
          />
        </Col>
        <Col xs={12} md={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <CdTextInput
                id="name"
                label="Name"
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.name}
                feedback={translatedFormValidation(errors.name?.message)}
                required
              />
            )}
          />
        </Col>
        <Col xs={12} md={6}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <CdDateInput
                id="startDate"
                onChange={(e) => field.onChange(e.target.value)}
                label="Start Date"
                invalid={!!errors.startDate}
                feedback={translatedFormValidation(errors.startDate?.message)}
                required
              />
            )}
          />
        </Col>
        <Col xs={12} md={6}>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <CdDateInput
                id="endDate"
                onChange={(e) => field.onChange(e.target.value)}
                label="End Date"
                invalid={!!errors.endDate}
                feedback={translatedFormValidation(errors.endDate?.message)}
                required
              />
            )}
          />
        </Col>
        <Col xs={12} md={12}>
          <Controller
            name="areaDescription"
            control={control}
            render={({ field }) => (
              <CdTextAreaInput
                id="areaDescription"
                label="Area Description"
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.areaDescription}
                feedback={translatedFormValidation(
                  errors.areaDescription?.message
                )}
                required
              />
            )}
          />
        </Col>
        <Col xs={12} md={12}>
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <CdTextAreaInput
                id="reason"
                label="Reason"
                onChange={(e) => field.onChange(e.target.value)}
                invalid={!!errors.reason}
                feedback={translatedFormValidation(errors.reason?.message)}
                required
              />
            )}
          />
        </Col>
      </Row>
      <CdContainer
        className="mt-4"
        flex
        alignItems={AlignItems.baseline}
        justifyContent={JustifyContent.end}
        flexDirection={FlexDirection.row}
        gap="1.5rem"
      >
        <CdButton
          id={"clear"}
          text="Clear"
          type={ButtonTypes.reset}
          color={Variant.tertiary}
          size={ButtonSizes.md}
          onClick={() => reset()}
        />
        <CdLoadingButton
          isLoading={isSubmitting}
          color={Variant.primary}
          text="Next"
          size={ButtonSizes.md}
          type={ButtonTypes.submit}
          disabled={isSubmitting}
          id={"next-button"}
        />
      </CdContainer>
    </form>
  );
};

export default AddWatchLockAreaDetailsForm;
