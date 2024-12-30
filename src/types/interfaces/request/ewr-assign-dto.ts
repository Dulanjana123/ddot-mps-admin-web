export interface EwrAssignInitialDto {
  assigneeId?: string;
  inspStatusId?: string;
  ewrStatusId?: string;
  comments?: string;
}

export interface EwrAssignDto {
  assigneeId?: number;
  inspStatusId?: number;
  ewrStatusId?: number;
  comments?: string;
}

export interface EwrBulkAssignDto {
  ewrApplicationIds: number[];
  assigneeId?: number;
  inspStatusId?: number;
  ewrStatusId?: number;
  comments?: string;
}
