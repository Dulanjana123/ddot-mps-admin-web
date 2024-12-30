import { ToastVariant } from "@enums/components/snackbar-enum";
import { FormWizardActionTypes } from "@enums/form-action";
import { NoteCodes } from "@enums/note-codes";
import { SwoStatusIDs } from "@enums/swo-status";
import { usePrompt } from "@hooks/usePrompt";
import { ResponseData } from "@interfaces/api-response.interface";
import {
  SWORequestDto,
  SWOViolationFormDto,
} from "@interfaces/request/swo-dto";
import { SwoResponseDto } from "@interfaces/response/swo-response-dto";
import { swoService } from "@services/api/swo-service";
import { setActiveTab, setSWOData } from "@store/reducers/mps/swoWizardSlice";
import { useAppDispatch, useAppSelector } from "@store/state-hooks";
import { getResponseMessage } from "@utils/get-response";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { H3 } from "src/AbstractElements";
import ViolationDetailsForm from "./ViolationDetailsForm";

const ViolationDetails = () => {
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { swoData } = useAppSelector((state) => state.swoWizard);
  const dispatch = useAppDispatch();

  const showToast = (response: ResponseData<SwoResponseDto>) => {
    if (response) {
      if (response.success) {
        dispatch(
          setSWOData({
            ...swoData,
            swoApplicationId: response.data?.swoApplicationId,
          })
        );
      }

      enqueueSnackbar(getResponseMessage(response.message), {
        variant: response.success ? ToastVariant.Success : ToastVariant.Error,
      });
      setIsLoading(false);
    }
  };

  const onClickHandler: SubmitHandler<SWOViolationFormDto> = async (
    swoViolationData
  ) => {
    dispatch(
      setSWOData({
        ...swoData,
        swoNumber: swoViolationData.swoNumber,
        violationReason: swoViolationData.violationReason,
        violationComments: swoViolationData.violationComments,
        issuedBy: swoViolationData.issuedBy,
        issuedDate: swoViolationData.issuedDate,
        issuedTime: swoViolationData.issuedTime,
        workSiteForeman: swoViolationData.workSiteForeman,
        workSiteForemanPhone: swoViolationData.workSiteForemanPhone,
        weatherConditions: swoViolationData.weatherConditions,
        workSiteConditions: swoViolationData.workSiteConditions,
        internalNotes: swoViolationData.internalNotes,
      })
    );
    if (swoViolationData.actionType === FormWizardActionTypes.Next) {
      dispatch(setActiveTab(4));
    }
    if (swoViolationData.actionType === FormWizardActionTypes.SaveDraft) {
      if (swoData?.type && swoData.inspectorId) {
        const swoRequest: SWORequestDto = {
          swoNumber: swoViolationData.swoNumber,
          swoViolationTypeId: Number(swoViolationData.violationReason),
          swoTypeId: swoData.type,
          swoStatusId: SwoStatusIDs.Incomplete,
          violatedContrName: swoData.contractorName,
          violatedContrRegNo: swoData.contractorId,
          violatedContrRegAddr: swoData.contractorRegisteredAddress,
          violatedOwnerFname: swoData.ownerFirstName,
          violatedOwnerLname: swoData.ownerLastName,
          noteCode: NoteCodes.Internal,
          violationComments: swoViolationData.violationComments,
          issuedBy: Number(swoData.inspectorId),
          issuedDate: new Date(swoViolationData.issuedDate),
          issuedTime: swoViolationData.issuedTime,
          workSiteForeman: swoViolationData.workSiteForeman,
          workSiteForemanPhone: swoViolationData.workSiteForemanPhone,
          weatherConditions: swoViolationData.weatherConditions,
          workSiteConditions: swoViolationData.workSiteConditions,
          internalNotes: swoViolationData.internalNotes,
          // createdBy should replace with logged in user id
          createdBy: 1,
          createdDate: new Date(),
        };
        if (swoData.swoApplicationId) {
          const updateResponse = await swoService.updateSwo(
            swoData.swoApplicationId,
            swoRequest
          );
          showToast(updateResponse);
        } else {
          const createResponse = await swoService.createSWO(swoRequest);
          showToast(createResponse);
        }
      }
    }
  };

  usePrompt({
    isDirty,
  });

  return (
    <div className="sidebar-body py-3">
      <H3 className="mb-3">Violation Details</H3>
      <ViolationDetailsForm
        onSubmit={onClickHandler}
        isLoading={isLoading}
        setIsDirty={setIsDirty}
        isDirty={isDirty}
      />
    </div>
  );
};

export default ViolationDetails;
