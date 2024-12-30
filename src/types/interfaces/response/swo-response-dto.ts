export interface SwoViolationTypeOption {
  violationTypeId: number;
  violationTypeDesc: string;
}

export interface SwoViolationTypesResponseDto {
  violationTypes: SwoViolationTypeOption[];
}

export interface SwoResponseDto {
  swoApplicationId: number;
  swoNumber: string;
  swoTypeId: number;
  swoStatusId: number;
  violatedContrName: string;
  violatedContrRegNo: string;
  violatedContrRegAddr: string;
  violatedOwnerFname: string;
  violatedOwnerLname: string;
  violationComments: string;
  issuedBy: number;
  issuedDate: Date;
  issuedTime: string;
  workSiteForeman: string;
  workSiteForemanPhone: string;
  workSiteConditions: string;
  weatherConditions: string;
  liftingJustification: string;
  liftedBy: number;
  liftedDate: Date;
  isActive: boolean;
  sortId: number;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
}
