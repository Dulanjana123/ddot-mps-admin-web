export interface MeetingType {
    key: number;
    value: string;
}

export interface ScheduledDay {
    key: string;
    value: boolean;
}

export interface TimeBlock {
    startTime: string;
    endTime: string;
    timeBlockId?: number;
}

export interface CalendarDatesSelectionDto {
    meetingTypes: MeetingType[];
    scheduledDays: ScheduledDay[];
}

export interface TimeBlocksSelectionDto {
    timeBlocks: TimeBlock[];
}

export interface PdrmFetchSettingsDto {
    calendarDatesSelectionDto: CalendarDatesSelectionDto;
    timeBlocksSelectionDto: TimeBlocksSelectionDto;
}

export interface PdrmFetchSettingsResponse {
    message: string;
    data: PdrmFetchSettingsDto;
    success: boolean;
}

export interface PdrmExclusionTimeSlotsResponse {
    selectedDate: string;
    excludedTimeBlocks: TimeBlock[];
    isAllDay: boolean;
}