import { SWOType } from "@enums/components/swo";
import { FormWizardActionTypes } from "@enums/form-action";
import { NoteCodes } from "@enums/note-codes";
import { SwoStatusIDs } from "@enums/swo-status";

export interface SWODto {
  type?: SWOType;
  inspectorId?: string;
  swoApplicationId?: number;
  swoNumber?: string;
  violationReason?: string;
  violationComments?: string;
  issuedBy?: string;
  issuedDate?: string;
  issuedTime?: string;
  workSiteForeman?: string;
  workSiteForemanPhone?: string;
  weatherConditions?: string;
  workSiteConditions?: string;
  internalNotes?: string;
  inspDetailId?: number;
  inspectionDate?: string;
  hoursSpent?: string;
  minutesSpent?: string;
  inspectionInternalNotes?: string;
  externalNotes?: string;
  // violator Data
  contractorId?: string;
  contractorName?: string;
  contractorRegisteredAddress?: string;
  contractorRegisteredNumber?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
}

export interface SWOViolationFormDto {
  swoNumber: string;
  confirmSwoNumber: string;
  violationReason: string;
  violationComments: string;
  issuedBy: string;
  issuedDate: string;
  issuedTime: string;
  workSiteForeman: string;
  workSiteForemanPhone: string;
  weatherConditions: string;
  workSiteConditions: string;
  internalNotes: string;
  swoFiles: File[];
  actionType: FormWizardActionTypes;
}

export interface SWORequestDto {
  swoNumber: string;
  swoViolationTypeId: number;
  swoTypeId: number;
  swoStatusId: SwoStatusIDs;
  violatedContrName?: string;
  violatedContrRegNo?: string;
  violatedContrRegAddr?: string;
  violatedOwnerFname?: string;
  violatedOwnerLname?: string;
  noteCode: NoteCodes;
  violationComments: string;
  issuedBy: number;
  issuedDate: Date;
  issuedTime: string;
  workSiteForeman: string;
  workSiteForemanPhone: string;
  weatherConditions: string;
  workSiteConditions: string;
  internalNotes: string;
  createdBy?: number;
  createdDate?: Date;
  modifiedBy?: number;
  modifiedDate?: Date;
}

export interface SWOPreviewDto {
  swoNumber: string;
  violationReason: string;
  violationComments: string;
  issuedBy: string;
  issuedDate: string;
  issuedTime: string;
  workSiteForeman: string;
  workSiteForemanPhone: string;
  weatherConditions: string;
  workSiteConditions: string;
  internalNotes: string;
  swoFiles?: File[];
  inspectionDate: string;
  hoursSpent?: number;
  minutesSpent?: number;
  inspectionInternalNotes: string;
  externalNotes?: string;
  inspectionFiles?: File[];
}

