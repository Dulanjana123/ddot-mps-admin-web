export interface EwrFiltersDto {
  requestNumber?: string;
  location?: string;
  ward?: string;
  effectiveDate?: string;
  expirationDate?: string;
  emergencyType?: string;
  emergencyCause?: string;
  status?: string;
  appliedBy?: string;
  creationDate?: string;
  uitilityCompany?: string;
  internalUtilityTrackingNumber?: string;
  assignedInspector?: string;
  inspectionStatus?: string;
  lastInspectionDate?: string;
  locationId?: number;
  exceptEwrRequestId?: number;
  requestedDate?: string;
  startDate?: string;
  endDate?: string;
  swoStatusIds?: number[];
  issuedByIds?: number[];
  [key: string]: any; // Add index signature
}
