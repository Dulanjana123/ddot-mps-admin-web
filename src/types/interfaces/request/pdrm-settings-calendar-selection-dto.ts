import { DayOfWeek } from "@enums/day-of-week";

export interface PdrmSettingsCalendarSelectionDto {
    scheduledDays: PdrmSettingsCalendarSelectionDays[];
    meetingTypeId: number;
}

interface PdrmSettingsCalendarSelectionDays {
    key: DayOfWeek;
    value: boolean;
}

