export interface ReviewerAgencyDto {
  agencyCategoryCode?: string;
  agencyCode: string;
  agencyName: string;
  agencyAddress: string;
  agencyTelephone: string;
  contactName: string;
  contactTelephone: string;
  contactEmail: string;
  isActive: boolean;
}

export interface GetReviewerAgencyRequestDto {
  agencyCode: string;
}
