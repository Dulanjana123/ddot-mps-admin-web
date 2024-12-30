export interface EwrResponseDto {
  requestId: number;
  requestNumber: string;
  location: string;
  ward: string;
  isCondition: boolean;
  effectiveDate: string;
  expirationDate: string;
  emergencyType: string;
  emergencyCause: string;
  status: string;
  appliedBy: string;
  creationDate: string;
  uitilityCompany: string;
  internalUtilityTrackingNumber: string;
  assignedInspector: string;
  inspectionStatus: string;
  lastInspectionDate: string;
  constructionPermitNumberIfFiled: number;
  trafficControlPlan: string;
  problemDetails: string;
  marXCoord: string;
  marYCoord: string;
  xCoord: string;
  yCoord: string;
  isPsAddConstructionWork: boolean | null;
  hasRushHourRestriction: boolean | null;
  addressType: number | null;
  locationCategory: number | null;
  quadrant: string | null;
  lot: string | null;
  square: string | null;
  locationId: number;
  cpApplicationId: number;
  noiApplicationId: number;
  swoApplicationId: number;
  latitude: number;
  longitude: number;
}

export interface EwrVsAgencyChartItem {
  utilityCompany: string;
  requestCount: number;
}

export interface WardVsEwrChartItem {
  ward: string;
  requestCount: number;
}

export interface EmergencyTypeVsEwrChartItem {
  emergencyType: string;
  requestCount: number;
}

export interface StatusVsEwrChartItem {
  status: string;
  requestCount: number;
}

export interface InspectorCountChartItem {
  inspectorName: string;
  totalInspectCount: number;
}

export interface EwrDashboardResponseDto {
  totalEwrCount: number;
  ewrCountWithoutCP: number;
  ewrVsAgencyChartData: EwrVsAgencyChartItem[];
  wardVsEwrChartData: WardVsEwrChartItem[];
  emergencyTypeVsEwrChartData: EmergencyTypeVsEwrChartItem[];
  statusVsEwrChartData: StatusVsEwrChartItem[];
  inspectorCountChartData: InspectorCountChartItem[];
}

export interface UserOption {
  userId: number;
  fullName: string;
}

export interface InspStatusOption {
  inspStatusId: number;
  inspStatusDesc: string;
}

export interface EwrStatusOption {
  statusId: number;
  statusDesc: string;
}

export interface EwrAssignInfoResponseDto {
  inspectors: UserOption[];
  inspStatuses: InspStatusOption[];
  ewrStatuses: EwrStatusOption[];
}

export interface SwoStatusOption {
  statusId: number;
  statusDesc: string;
}

export interface EwrEmergencyTypeOption {
  emergencyTypeId: number;
  emergencyTypeDesc: string;
}

export interface EwrEmergencyCauseOption {
  emergencyCauseId: number;
  emergencyCauseDesc: string;
}

export interface EwrEmergencyCategoryOption {
  emergencyCategoryId: number;
  emergencyCategoryDesc: string;
}

export interface EwrIndexFiltersInfoResponseDto {
  ewrStatuses: EwrStatusOption[];
  ewrEmergencyTypes: EwrEmergencyTypeOption[];
  ewrEmergencyCauses: EwrEmergencyCauseOption[];
  users: UserOption[];
  swoStatuses: SwoStatusOption[];
  ewrEmergencyCategories: EwrEmergencyCategoryOption[];
}