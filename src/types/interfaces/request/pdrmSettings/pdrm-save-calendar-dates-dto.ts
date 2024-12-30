export interface ScheduledDay {
   key: string;
   value: boolean;
}

interface CalendarDatesSelectionDto {
   meetingTypeId: number;
   scheduledDays: ScheduledDay[];
}
