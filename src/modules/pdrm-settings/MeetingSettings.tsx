import Breadcrumbs from "@common-elements/Breadcrumbs/Breadcrumbs";
import MeetingSettingsHeader from "./MeetingSettingsHeader";
import MeetingSettingsCalendarSection from "./MeetingSettingsCalendarSection";
import { useEffect, useState } from "react";
import CdCard from "@atoms/Card/CdCard";
import { PdrmSettingsCalendarSelectionDto } from "@interfaces/request/pdrm-settings-calendar-selection-dto";
import { DayOfWeek } from "@enums/day-of-week";
import { PdrmExclusionTimeSlotsDto, PdrmSettingsAvailableTimeBlocksSelectionDto } from "@interfaces/request/pdrm-settings-available-time-blocks-selection";
import { pdrmSettingsService } from "@services/api/pdrm-settings-service";
import { CommonApiActions } from "@enums/components/CommonApiActionsEnum";
import { isNullOrEmpty } from "@utils/stringValidation";

const MeetingsSettings: React.FC = () => {
   const [mondayChecked, setMondayChecked] = useState(false);
   const [tuesdayChecked, setTuesdayChecked] = useState(false);
   const [wednesdayChecked, setWednesdayChecked] = useState(false);
   const [thursdayChecked, setThursdayChecked] = useState(false);
   const [fridayChecked, setFridayChecked] = useState(false);
   const [saturdayChecked, setSaturdayChecked] = useState(false);
   const [sundayChecked, setSundayChecked] = useState(false);

   const [timeBlocks, setTimeBlocks] = useState<string[]>([]);
   const [meetingTypeId, setMeetingTypeId] = useState<number>(1);
   const [meetingTypes, setMeetingTypes] = useState<any[]>([]);
   const [filteredDates, setFilteredDates] = useState<number[]>([]);
   const [addClicked, setAddClicked] = useState(false);
   const [nextTimeSlotUpdate, setNextTimeSlotUpdate] = useState<{
      data: PdrmSettingsAvailableTimeBlocksSelectionDto;
      action: CommonApiActions;
   }>();

   const [excludedTimeSlots, setExcludedTimeSlots] = useState<string[]>([])
   const [selectedExclusionDate, setSelectedExclusionDate] = useState<string>('');
   const [isAllDay, setIsAllDay] = useState<boolean>(false);

   const [hasFetched, setHasFetched] = useState(false);
   const [dispatchExclusionDate, setDispatchExclusionDate] = useState(false);

   useEffect(() => {
      if (!hasFetched) return;
      const req: PdrmSettingsCalendarSelectionDto = {
         scheduledDays: [
            { key: DayOfWeek.Monday, value: mondayChecked },
            { key: DayOfWeek.Tuesday, value: tuesdayChecked },
            { key: DayOfWeek.Wednesday, value: wednesdayChecked },
            { key: DayOfWeek.Thursday, value: thursdayChecked },
            { key: DayOfWeek.Friday, value: fridayChecked },
            { key: DayOfWeek.Saturday, value: saturdayChecked },
            { key: DayOfWeek.Sunday, value: sundayChecked },
         ],
         meetingTypeId: meetingTypeId,
      };
      pdrmSettingsService.saveSettings(req);
   }, [
      mondayChecked,
      tuesdayChecked,
      wednesdayChecked,
      thursdayChecked,
      fridayChecked,
      saturdayChecked,
      sundayChecked,
      hasFetched,
   ]);

   useEffect(() => {
      if (hasFetched && nextTimeSlotUpdate && nextTimeSlotUpdate.data) {
         const req: PdrmSettingsAvailableTimeBlocksSelectionDto = {
            timeBlocks: timeBlocks.map((timeBlock) => {
               const [startTime, endTime] = timeBlock.split("-").map((t) => t.trim());
               return { startTime, endTime };
            }),
            meetingTypeId: meetingTypeId,
            action: nextTimeSlotUpdate.action,
         };
         pdrmSettingsService.saveTimeBlocks(req);
      }
   }, [nextTimeSlotUpdate]);

   useEffect(() => {

      if (!dispatchExclusionDate) return;

      if (hasFetched && !isNullOrEmpty(selectedExclusionDate)) {
         const req: PdrmExclusionTimeSlotsDto = {
            excludedTimeBlocks: excludedTimeSlots.map((timeBlock) => {
               const [startTime, endTime] = timeBlock.split("-").map((t) => t.trim());
               return { startTime, endTime };
            }),
            isAllDay: isAllDay ?? false,
            selectedDate: selectedExclusionDate
         };
         pdrmSettingsService.saveExclusionTimeBlocks(req);
         
         setDispatchExclusionDate(false);
      }
   }, [dispatchExclusionDate]);

   useEffect(() => {
      setHasFetched(false);
      setTimeBlocks([]);
      fetchSettings();
      setExcludedTimeSlots([]);
   }, [meetingTypeId]);

   const fetchSettings = async () => {
      const resp = await pdrmSettingsService.getSettings(meetingTypeId);
      const meetingTypesString = resp.data?.calendarDatesSelectionDto.meetingTypes.map(
         (meetingType) => {
            return { key: meetingType.key.toString(), value: meetingType.value };
         }
      );
      if (meetingTypesString) {
         setMeetingTypes(meetingTypesString);
      }

      const scheduledDays = resp.data?.calendarDatesSelectionDto.scheduledDays;
      if (scheduledDays) {
         setMondayChecked(scheduledDays.find((day) => day.key === DayOfWeek.Monday)?.value ?? false);
         setTuesdayChecked(scheduledDays.find((day) => day.key === DayOfWeek.Tuesday)?.value ?? false);
         setWednesdayChecked(
            scheduledDays.find((day) => day.key === DayOfWeek.Wednesday)?.value ?? false
         );
         setThursdayChecked(
            scheduledDays.find((day) => day.key === DayOfWeek.Thursday)?.value ?? false
         );
         setFridayChecked(scheduledDays.find((day) => day.key === DayOfWeek.Friday)?.value ?? false);
         setSaturdayChecked(
            scheduledDays.find((day) => day.key === DayOfWeek.Saturday)?.value ?? false
         );
         setSundayChecked(scheduledDays.find((day) => day.key === DayOfWeek.Sunday)?.value ?? false);

         // Set filteredDates based on scheduledDays
         const filteredDays = scheduledDays
            .filter((day) => day.value)
            .map((day) => {
               switch (day.key) {
                  case DayOfWeek.Monday:
                     return 1;
                  case DayOfWeek.Tuesday:
                     return 2;
                  case DayOfWeek.Wednesday:
                     return 3;
                  case DayOfWeek.Thursday:
                     return 4;
                  case DayOfWeek.Friday:
                     return 5;
                  case DayOfWeek.Saturday:
                     return 6;
                  case DayOfWeek.Sunday:
                     return 0;
                  default:
                     return -1;
               }
            })
            .filter((day) => day !== -1);
         setFilteredDates(filteredDays);
      }

      const timeBlocksResp = resp.data?.timeBlocksSelectionDto.timeBlocks.map((timeBlock) => {
         return `${timeBlock.startTime}-${timeBlock.endTime}`;
      });
      if (timeBlocksResp) {
         setTimeBlocks(timeBlocksResp);
      }

      setHasFetched(true);
   };

   return (
      <div className="page-body mb-3">
         <Breadcrumbs mainTitle="Meetings Settings" parent="Review Plans" />
         <MeetingSettingsHeader />
         <CdCard className="mt-3 p-4">
            <div className="d-flex flex-row">
               <MeetingSettingsCalendarSection
                  mondayChecked={mondayChecked}
                  tuesdayChecked={tuesdayChecked}
                  wednesdayChecked={wednesdayChecked}
                  thursdayChecked={thursdayChecked}
                  fridayChecked={fridayChecked}
                  saturdayChecked={saturdayChecked}
                  sundayChecked={sundayChecked}
                  timeBlocks={timeBlocks}
                  meetingTypeId={meetingTypeId}
                  meetingTypes={meetingTypes}
                  filteredDates={filteredDates}
                  addClicked={addClicked}
                  excludedTimeSlots={excludedTimeSlots}
                  isAllDay={isAllDay}
                  selectedExclusionDate={selectedExclusionDate}
                  dispatchExclusionDate={dispatchExclusionDate}
                  setDispatchExclusionDate={setDispatchExclusionDate}
                  setMondayChecked={setMondayChecked}
                  setTuesdayChecked={setTuesdayChecked}
                  setWednesdayChecked={setWednesdayChecked}
                  setThursdayChecked={setThursdayChecked}
                  setFridayChecked={setFridayChecked}
                  setSaturdayChecked={setSaturdayChecked}
                  setSundayChecked={setSundayChecked}
                  setTimeBlocks={setTimeBlocks}
                  setMeetingTypeId={setMeetingTypeId}
                  setFilteredDates={setFilteredDates}
                  setAddClicked={setAddClicked}
                  setNextTimeSlotUpdate={setNextTimeSlotUpdate}
                  setExcludedTimeSlots={setExcludedTimeSlots}
                  setIsAllDay={setIsAllDay}
                  setSelectedExcludedDate={setSelectedExclusionDate}                  
               />
            </div>
         </CdCard>
      </div>
   );
};

export default MeetingsSettings;