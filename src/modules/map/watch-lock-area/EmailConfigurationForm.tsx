import {
  CdButton,
  CdCheckboxInput,
  CdContainer,
  CdEmailInput,
  CdInputLabel,
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
import { setTab, updateForm } from "@store/reducers/watchLockFormWizard";
import { useAppDispatch } from "@store/state-hooks";
import React, { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Col, Row } from "reactstrap";
import useEmailConfigInitForm from "./form-schema/email-config-schema";
import { MdDeleteForever } from "react-icons/md";

const EmailConfigForm: React.FC = ({}) => {
  const [isEmailDuplicated, setIsEmailDuplicated] = useState<boolean>(false);
  const { control, errors, handleSubmit, isSubmitting } =
    useEmailConfigInitForm();
  const dispatch = useAppDispatch();

  const { fields, append, remove } = useFieldArray({
    name: "emails" as never,
    control,
  });

  const onSubmit = (data) => {
    if (data.emails.length > 0) {
      const uniqueEmails = new Set(data.emails);
      if (uniqueEmails.size !== data.emails.length) {
        setIsEmailDuplicated(true);
        return;
      }
      setIsEmailDuplicated(false);
    }

    dispatch(
      updateForm({
        step: "emailConfig",
        data,
      })
    );

    dispatch(
      setTab({
        tab: 3,
      })
    );
  };

  const goBack = () => {
    dispatch(
      setTab({
        tab: 1,
      })
    );
  };

  const addEmailInputField = () => {
    if (fields.length < 10) {
      append("");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row className="d-flex align-items-baseline">
        <Col xs={12} md={6}>
          <CdInputLabel id={"send-email-label"} labelText={"Send Email For:"} />
          <CdContainer flex className="g-0" gap="2rem">
            <Controller
              name="newSubmission"
              control={control}
              render={({ field }) => (
                <CdCheckboxInput
                  id={"new-submission"}
                  label="New Submission"
                  className="ms-2"
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <Controller
              name="approval"
              control={control}
              render={({ field }) => (
                <CdCheckboxInput
                  id={"approval"}
                  label="Approval"
                  className="ms-2"
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </CdContainer>
        </Col>
        <Col xs={12} md={6}>
          <CdInputLabel id={"email-me-label"} labelText={"Send Email To:"} />
          <Controller
            name="emailMe"
            control={control}
            render={({ field }) => (
              <CdCheckboxInput
                id={"email-me"}
                label="Me"
                className="ms-2"
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </Col>

        <CdInputLabel
          id={"others-emails-label"}
          labelText={
            "Other's Email Addresses: (Note: You can add upto 10 email addresses.)"
          }
        />
        <div className="my-3">
          <CdButton
            id={"add-email-btn"}
            color={Variant.primary}
            outline
            type={ButtonTypes.button}
            onClick={addEmailInputField}
            text="Add"
          />
        </div>

        {fields.map((field, index) => (
          <Col key={field.id} xs={12} md={6}>
            <Controller
              name={`emails.${index}`}
              control={control}
              render={({ field }) => (
                <>
                  <Row>
                    <Col xs={10}>
                      <CdEmailInput
                        id={`email-${index}`}
                        label={`Email Address ${index + 1}`}
                        onChange={(e) => field.onChange(e.target.value)}
                        invalid={!!errors?.emails?.[index]}
                        feedback={translatedFormValidation(
                          errors?.emails?.[index]?.message
                        )}
                      />
                    </Col>
                    <Col
                      className="mb-3 g-0"
                      xs={2}
                      style={{ display: "flex", alignItems: "end" }}
                    >
                      <MdDeleteForever
                        fontSize={30}
                        color="#800000"
                        style={{ cursor: "pointer" }}
                        onClick={() => remove(index)}
                      />
                    </Col>
                  </Row>
                </>
              )}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <span className="error-text">
            {isEmailDuplicated && "*Email addresses can not be duplicated."}
          </span>
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
          id={"back-btn"}
          text="Back"
          type={ButtonTypes.button}
          size={ButtonSizes.md}
          color={Variant.light}
          onClick={goBack}
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

export default EmailConfigForm;
