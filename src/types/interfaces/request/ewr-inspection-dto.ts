import { InspectionDocumentDto } from "@interfaces/response/inspection-response-dto";
export interface InspectionDetailsDto {
  inspectionDate: string | null;
  createdDate?: string | null;
  inspector?: string | null;
  hoursSpent: number | null;
  minutesSpent: number | null;
  internalNotes: string | null;
  externalNotes: string | null;
  files: InspectionDocumentDto[];
}

export interface InspectionDto {
  inspDetailId?: number;
  applicationId?: number;
  applicationTypeCode?: string;
  inspectedBy: number;
  inspTypeId?: number;
  inspStatusId?: number;
  inspectionDate: string;
  minutesSpent: number;
  internalNotes: string;
  externalNotes?: string;
}
