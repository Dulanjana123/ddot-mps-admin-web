import { CdButton, CdContainer } from "@atoms/index";
import { ButtonSizes, ButtonTypes } from "@enums/components/ButtonEnum";
import { Variant } from "@enums/components/CommonEnum";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "@enums/components/Container";
import { DateFormat } from "@enums/date-format-types";
import { CdLoadingButton } from "@molecules/index";
import { clearForm, setTab } from "@store/reducers/watchLockFormWizard";
import { useAppDispatch, useAppSelector } from "@store/state-hooks";
import { currentDateTime, formatDate } from "@utils/helper/format-date";
import React from "react";
import { Row, Table } from "reactstrap";

const ReviewForm: React.FC = () => {
  const { areaDescription, category, endDate, name, reason, startDate } =
    useAppSelector(
      (state) => state.watchLockWizard.formData.watchLockAreaDetails
    );
  const { approval, newSubmission, emailMe, emails } = useAppSelector(
    (state) => state.watchLockWizard.formData.emailConfig
  );

  const { coordinates, image } = useAppSelector(
    (state) => state.watchLockWizard.formData.interactiveMap
  );
  const formData = useAppSelector((state) => state.watchLockWizard.formData);
  const dispatch = useAppDispatch();

  const goBack = () => {
    dispatch(
      setTab({
        tab: 3,
      })
    );
  };

  const clearFormWizard = () => {
    dispatch(clearForm());
  };

  const isFormComplete = () => {
    const values = [
      approval,
      areaDescription,
      category,
      coordinates,
      endDate,
      name,
      newSubmission,
      reason,
      emailMe,
      startDate,
    ];

    return values.every(
      (value) => value !== null && value !== undefined && value !== ""
    );
  };

  const notifyEmailStatus = () => {
    if (newSubmission && approval) {
      return "New Submission, Approval";
    } else if (newSubmission) {
      return "New Submission";
    } else if (approval) {
      return "Approval";
    } else {
      return "";
    }
  };

  const onFormSubmit = () => {
    console.log(formData);
  };

  return (
    <>
      <Row>
        <h4
          className="my-3"
          style={{ textTransform: "capitalize", textAlign: "center" }}
        >{`${category} area details`}</h4>
        <Table bordered size="sm" responsive hover>
          <tbody>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>Name</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>Category</td>
              <td>{category}</td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>Status</td>
              <td>{isFormComplete() ? "Complete" : "Incomplete"}</td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>
                Area Description
              </td>
              <td>{areaDescription}</td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>Reason</td>
              <td>{reason}</td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>Start Date</td>
              <td>{formatDate(startDate, DateFormat.MM_DD_YYYY_SLASH)}</td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>End Date</td>
              <td>{formatDate(endDate, DateFormat.MM_DD_YYYY_SLASH)}</td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>Created By</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>Creation Date</td>
              <td>
                {formatDate(currentDateTime(), DateFormat.MM_DD_YYYY_SLASH)}
              </td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>
                Construction Work Types
              </td>
              <td>All</td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>
                Occupancy Event Types
              </td>
              <td>All</td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>
                Annual Event Types
              </td>
              <td>None</td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row className="mt-2">
        <h4 className="my-3 text-center">Email Configuration</h4>
        <Table bordered size="sm" responsive hover>
          <tbody>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>
                Notify email for permit statuses
              </td>
              <td>{notifyEmailStatus()}</td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>
                Send email to me
              </td>
              <td>{emailMe ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td style={{ width: "50%", textAlign: "end" }}>
                Send email to others
              </td>
              <td>
                <ul>
                  {emails?.map((email) => (
                    <li key={email}>{email}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <h4 className="my-3 text-center">Boundry Map</h4>
        <img src={image} />
      </Row>
      <CdContainer
        flex
        className="mt-4"
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
        <CdButton
          id={"clear-btn"}
          text="Clear"
          type={ButtonTypes.reset}
          size={ButtonSizes.md}
          color={Variant.secondary}
          onClick={clearFormWizard}
        />
        <CdLoadingButton
          isLoading={false}
          color={Variant.primary}
          text="Next"
          size={ButtonSizes.md}
          type={ButtonTypes.button}
          disabled={!isFormComplete()}
          onClick={onFormSubmit}
          id={"next-button"}
        />
      </CdContainer>
    </>
  );
};

export default ReviewForm;
