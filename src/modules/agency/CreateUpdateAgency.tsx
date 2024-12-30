import Breadcrumbs from "@common-elements/Breadcrumbs/Breadcrumbs";
import { FormAction } from "@enums/form-action";
import { ReviewerAgencyDto } from "@interfaces/request/reviewer-agency-dto";
import { reviewerAgencyService } from "@services/api/reviewer-agency-service";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardBody, Container } from "reactstrap";
import ReviewerAgencyForm from "./ReviewerAgencyForm";
import { enqueueSnackbar } from "notistack";
import { ToastVariant } from "@enums/components/snackbar-enum";
import { getResponseMessage } from "@utils/get-response";
import { usePrompt } from "@hooks/usePrompt";

const CreateUpdateAgency = ({ formAction }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();

  const [formInitial, setFormInitial] = useState({
    agencyCode: "",
    agencyName: "",
    agencyAddress: "",
    agencyTelephone: "",
    contactName: "",
    contactTelephone: "",
    contactEmail: "",
    isActive: true,
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const createTitle =
    formAction === FormAction.Add
      ? "Create Reviewer Agency"
      : formAction === FormAction.Update
      ? "Update Reviewer Agency"
      : "View Reviewer Agency";

  const setReviewerAgencyData = async (id: number) => {
    const response = await reviewerAgencyService.getReviewerAgency(id);
    setFormInitial({
      ...formInitial,
      agencyCode: response.data?.agencyCode,
      agencyName: response.data?.agencyName,
      agencyAddress: response.data?.agencyAddress,
      agencyTelephone: response.data?.agencyTelephone,
      contactName: response.data?.contactName,
      contactTelephone: response.data?.contactTelephone,
      contactEmail: response.data?.contactEmail,
      isActive: response.data?.isActive,
    });
  };

  useEffect(() => {
    if (id) {
      const agencyId: number = parseInt(id);
      setReviewerAgencyData(agencyId);
    }
  }, [id]);

  const onCreateHandler: SubmitHandler<ReviewerAgencyDto> = async (
    createAgencyData
  ) => {
    setIsLoading(true);
    const response = await reviewerAgencyService.createReviewerAgency(
      createAgencyData
    );
    if (response) {
      enqueueSnackbar(getResponseMessage(response.message), {
        variant: response.success ? ToastVariant.Success : ToastVariant.Error,
      });
      setIsLoading(false);
      setIsDirty(false);
      if (response.success) navigate("/agency");
    }
  };

  const onUpdateHandler: SubmitHandler<ReviewerAgencyDto> = async (
    updateAgencyData
  ) => {
    if (id) {
      const agencyId: number = parseInt(id);
      setIsLoading(true);
      const response = await reviewerAgencyService.updateReviewerAgency(
        agencyId,
        updateAgencyData
      );
      if (response) {
        enqueueSnackbar(getResponseMessage(response.message), {
          variant: response.success ? ToastVariant.Success : ToastVariant.Error,
        });
        setIsLoading(false);
        setIsDirty(false);
        if (response.success) navigate("/agency");
      }
    }
  };

  // Add this if need popup when form filled unsaved navigation
  usePrompt({
    isDirty,
  });

  return (
    <div className="page-body">
      <Breadcrumbs mainTitle={createTitle} parent="Agency" />
      <Container fluid>
        <Card>
          <CardBody>
            {formAction === FormAction.Add && (
              <ReviewerAgencyForm
                isLoading={isLoading}
                onSubmit={onCreateHandler}
                buttonText="Save"
                formInitial={formInitial}
                setIsDirty={setIsDirty}
              />
            )}
            {formAction === FormAction.Update && (
              <ReviewerAgencyForm
                isLoading={isLoading}
                onSubmit={onUpdateHandler}
                buttonText="Update"
                formInitial={formInitial}
                setIsDirty={setIsDirty}
              />
            )}
            {formAction === FormAction.View && (
              <ReviewerAgencyForm
                isLoading={isLoading}
                onSubmit={() => {}}
                formInitial={formInitial}
                formAction={FormAction.View}
              />
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default CreateUpdateAgency;
