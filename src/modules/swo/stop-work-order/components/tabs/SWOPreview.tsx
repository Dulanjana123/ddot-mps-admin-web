import { ApplicationTypeCode } from "@enums/application-type-code";
import { ToastVariant } from "@enums/components/snackbar-enum";
import { FormWizardActionTypes } from "@enums/form-action";
import { NoteCodes } from "@enums/note-codes";
import { SwoStatusIDs } from "@enums/swo-status";
import { ResponseData } from "@interfaces/api-response.interface";
import { InspectionDto } from "@interfaces/request/ewr-inspection-dto";
import { SWORequestDto } from "@interfaces/request/swo-dto";
import { InspectionResponseDto } from "@interfaces/response/inspection-response-dto";
import { SwoResponseDto } from "@interfaces/response/swo-response-dto";
import { inspectionService } from "@services/api/inspection-service";
import { swoService } from "@services/api/swo-service";
import { setActiveTab, setSWOData } from "@store/reducers/mps/swoWizardSlice";
import { useAppDispatch, useAppSelector } from "@store/state-hooks";
import { getResponseMessage } from "@utils/get-response";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import SWOPreviewForm from "./SWOPreviewForm";

const SWOPreview = () => {
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { swoData } = useAppSelector((state) => state.swoWizard);
  const dispatch = useAppDispatch();

  const showInspectionResponseToast = (
    inspectionResponse: ResponseData<InspectionResponseDto>,
    actionType: FormWizardActionTypes
  ) => {
    if (inspectionResponse) {
      enqueueSnackbar(getResponseMessage(inspectionResponse.message), {
        variant: inspectionResponse.success
          ? ToastVariant.Success
          : ToastVariant.Error,
      });

      if (inspectionResponse.success) {
        dispatch(
          setSWOData({
            ...swoData,
            inspDetailId: inspectionResponse.data?.inspDetailId,
            inspectionDate: inspectionResponse.data?.inspectionDate,
            hoursSpent: Math.floor(
              (inspectionResponse.data?.minutesSpent ?? 0) / 60
            ),
            minutesSpent: (inspectionResponse.data?.minutesSpent ?? 0) % 60,
            inspectionInternalNotes: inspectionResponse.data?.internalNotes,
            externalNotes: inspectionResponse.data?.externalNotes,
          })
        );
        if (actionType === FormWizardActionTypes.Submit) {
          dispatch(setSWOData({}));
          dispatch(setActiveTab(1));
        }
      }
    }
  };

  const executeInspectionUpdate = async (
    response: ResponseData<SwoResponseDto>,
    inspectionRequest: InspectionDto,
    actionType: FormWizardActionTypes
  ) => {
    if (response) {
      if (response.success) {
        const swoAppId = response.data?.swoApplicationId;
        dispatch(
          setSWOData({
            ...swoData,
            swoApplicationId: swoAppId,
          })
        );

        const inspRequest = { ...inspectionRequest, applicationId: swoAppId };

        if (swoData?.inspDetailId) {
          const inspectionUpdateResponse =
            await inspectionService.updateInspection(
              swoData.inspDetailId,
              inspRequest
            );
          showInspectionResponseToast(inspectionUpdateResponse, actionType);
        } else {
          const inspectionCreateResponse =
            await inspectionService.createInspection(inspRequest);
          showInspectionResponseToast(inspectionCreateResponse, actionType);
        }
      }

      enqueueSnackbar(getResponseMessage(response.message), {
        variant: response.success ? ToastVariant.Success : ToastVariant.Error,
      });

      setIsLoading(false);
    }
  };

  const onSubmitHandler: SubmitHandler<any> = async (
    swoPreviewAndInspectionData
  ) => {
    if (swoData?.type && swoPreviewAndInspectionData.issuedBy) {
      const swoRequest: SWORequestDto = {
        swoNumber: swoPreviewAndInspectionData.swoNumber,
        swoViolationTypeId: Number(swoPreviewAndInspectionData.violationReason),
        swoTypeId: swoData.type,
        swoStatusId:
          swoPreviewAndInspectionData.actionType ===
          FormWizardActionTypes.Submit
            ? SwoStatusIDs.Issued
            : SwoStatusIDs.Incomplete,
        violatedContrName: swoData.contractorName,
        violatedContrRegNo: swoData.contractorId,
        violatedContrRegAddr: swoData.contractorRegisteredAddress,
        violatedOwnerFname: swoData.ownerFirstName,
        violatedOwnerLname: swoData.ownerLastName,
        noteCode: NoteCodes.Internal,
        violationComments: swoPreviewAndInspectionData.violationComments,
        issuedBy: Number(swoPreviewAndInspectionData.issuedBy),
        issuedDate: new Date(swoPreviewAndInspectionData.issuedDate),
        issuedTime: swoPreviewAndInspectionData.issuedTime,
        workSiteForeman: swoPreviewAndInspectionData.workSiteForeman,
        workSiteForemanPhone: swoPreviewAndInspectionData.workSiteForemanPhone,
        weatherConditions: swoPreviewAndInspectionData.weatherConditions,
        workSiteConditions: swoPreviewAndInspectionData.workSiteConditions,
        internalNotes: swoPreviewAndInspectionData.internalNotes,
        // createdBy should replace with logged in user id
        createdBy: 1,
        createdDate: new Date(),
      };

      const createInspectionRequest: InspectionDto = {
        inspectedBy: 1, // should replace with user id
        applicationTypeCode: ApplicationTypeCode.SWO,
        inspectionDate: swoPreviewAndInspectionData.inspectionDate,
        minutesSpent:
          (swoPreviewAndInspectionData.hoursSpent || 0) * 60 +
          (swoPreviewAndInspectionData.minutesSpent || 0),
        internalNotes: swoPreviewAndInspectionData.internalNotes,
        externalNotes: swoPreviewAndInspectionData.externalNotes,
      };

      if (swoData.swoApplicationId) {
        const updateResponse = await swoService.updateSwo(
          swoData.swoApplicationId,
          swoRequest
        );
        executeInspectionUpdate(
          updateResponse,
          createInspectionRequest,
          swoPreviewAndInspectionData.actionType
        );
      } else {
        const createResponse = await swoService.createSWO(swoRequest);
        executeInspectionUpdate(
          createResponse,
          createInspectionRequest,
          swoPreviewAndInspectionData.actionType
        );
      }
    }
  };

  return (
    <div className="sidebar-body py-3">
      <SWOPreviewForm
        onSubmit={onSubmitHandler}
        isLoading={isLoading}
        setIsDirty={setIsDirty}
        isDirty={isDirty}
      />
    </div>
  );
};

export default SWOPreview;
