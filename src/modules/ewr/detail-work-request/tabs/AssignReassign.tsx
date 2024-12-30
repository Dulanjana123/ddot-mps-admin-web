import { ToastVariant } from "@enums/components/snackbar-enum";
import { usePrompt } from "@hooks/usePrompt";
import { DetailWorkRequestProps } from "@interfaces/components/ewr-props";
import { EwrAssignDto } from "@interfaces/request/ewr-assign-dto";
import { ewrService } from "@services/api/ewr-service";
import { getResponseMessage } from "@utils/get-response";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { H3 } from "src/AbstractElements";
import AssignReassignForm from "./AssignReassignForm";

const AssignReassign: React.FC<DetailWorkRequestProps> = ({ data }) => {
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onAssignHandler: SubmitHandler<any> = async (assignEwrData) => {
    const ewrAssignRequest: EwrAssignDto = {
      assigneeId: parseInt(assignEwrData.assigneeId),
      ewrStatusId: parseInt(assignEwrData.ewrStatusId),
      inspStatusId: parseInt(assignEwrData.inspStatusId),
      comments: assignEwrData.comments,
    };
    if (data?.requestId) {
      const response = await ewrService.updateEwrAssigning(
        data?.requestId,
        ewrAssignRequest
      );
      if (response) {
        enqueueSnackbar(getResponseMessage(response.message), {
          variant: response.success ? ToastVariant.Success : ToastVariant.Error,
        });
        setIsLoading(false);
        setIsDirty(false);
        if (response.success) navigate("/ewr");
      }
    }
  };

  usePrompt({
    isDirty,
  });

  return (
    <div>
      <H3 className="mb-2">Assign / Reassign</H3>
      <AssignReassignForm
        onSubmit={onAssignHandler}
        isLoading={isLoading}
        setIsDirty={setIsDirty}
        isDirty={isDirty}
      />
    </div>
  );
};

export default AssignReassign;
