import { CommonApiActions } from "@enums/components/CommonApiActionsEnum";
import { TimeBlock } from "@interfaces/response/pdrm-settings-response-dto";

export interface PdrmSettingsAvailableTimeBlocksSelectionDto {
   timeBlocks: PdrmSettingsTimeBlock[];
   meetingTypeId: number;
   action: CommonApiActions;
}

export interface PdrmSettingsTimeBlock {
   startTime: string;
   endTime: string;
}

export interface PdrmExclusionTimeSlotsDto {
   selectedDate: string;
   excludedTimeBlocks: TimeBlock[];
   isAllDay: boolean;
}
