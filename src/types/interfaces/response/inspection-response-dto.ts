export interface InspectionResponseDto {
  inspDetailId: number;
  applicationId: number;
  applicationTypeId: number;
  inspectedBy: number;
  inspTypeId: number;
  inspStatusId: number;
  inspectionDate: Date;
  minutesSpent: number;
  internalNotes: string;
  externalNotes: string;
  createdDate: Date;
  inspector: string;
  documents: InspectionDocumentDto[];
}

export interface InspectionDocumentDto {
  documentId: number,
  documentName: string,
  documentType: string | null,
  documentPath: string | null,
  cloudPath: string | null,
  documentSize: number | null,
  createdDate: string | null
}
