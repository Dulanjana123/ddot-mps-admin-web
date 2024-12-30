import CdCol from "@atoms/Base/CdCol";
import CdRow from "@atoms/Base/CdRow";
import {
   CdButton,
   CdCheckboxInput,
   CdContainer,
   CdDateInput,
   CdDatePicker,
   CdSelectInput,
   CdToggleSwitch,
} from "@atoms/index";
import CdTypography from "@atoms/Typography/CdTypography";
import { CommonApiActions } from "@enums/components/CommonApiActionsEnum";
import { ToastVariant } from "@enums/components/snackbar-enum";
import { OptionType } from "@interfaces/components/select";
import { PdrmSettingsAvailableTimeBlocksSelectionDto } from "@interfaces/request/pdrm-settings-available-time-blocks-selection";
import InfoCard from "@molecules/InfoCard/InfoCard";
import CdTimePicker from "@molecules/TimePicker/CdTimePicker";
import { pdrmSettingsService } from "@services/api/pdrm-settings-service";
import { isNullOrEmpty } from "@utils/stringValidation";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

type MeetingSettingsCalendarSectionProps = {
   mondayChecked: boolean;
   tuesdayChecked: boolean;
   wednesdayChecked: boolean;
   thursdayChecked: boolean;
   fridayChecked: boolean;
   saturdayChecked: boolean;
   sundayChecked: boolean;
   timeBlocks: string[];
   meetingTypeId: number;
   meetingTypes: { value: string; key: number }[];
   filteredDates: number[];
   addClicked: boolean;
   excludedTimeSlots: string[];
   selectedExclusionDate: string;
   isAllDay?: boolean;
   dispatchExclusionDate: boolean;
   setMondayChecked: (args: boolean) => void;
   setTuesdayChecked: (args: boolean) => void;
   setWednesdayChecked: (args: boolean) => void;
   setThursdayChecked: (args: boolean) => void;
   setFridayChecked: (args: boolean) => void;
   setSaturdayChecked: (args: boolean) => void;
   setSundayChecked: (args: boolean) => void;
   setTimeBlocks: (args: string[]) => void;
   setMeetingTypeId: (args: number) => void;
   setFilteredDates: (args: number[]) => void;
   setAddClicked: (args: boolean) => void;
   setNextTimeSlotUpdate: (args: {
      data: PdrmSettingsAvailableTimeBlocksSelectionDto;
      action: CommonApiActions;
   }) => void;
   setExcludedTimeSlots: (args: string[]) => void;
   setSelectedExcludedDate: (args: string) => void;
   setIsAllDay: (args: boolean) => void;
   setDispatchExclusionDate: (args: boolean) => void;
};

const MeetingSettingsCalendarSection: React.FC<MeetingSettingsCalendarSectionProps> = ({ ...props }) => {

   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
   const [isDateSelectionOpen, setIsDateSelectionOpen] = useState(false);

   const [startTime, setStartTime] = useState<string>("");
   const [endTime, setEndTime] = useState<string>("");

   const [exclusionOptions, setExclusionOptions] = useState<OptionType[]>([]);
   const [selectedExclusionOptions, setSelectedExclusionOptions] = useState<string[]>([]);

   useEffect(() => {
      const options = generateExclusionOptions(props.timeBlocks);
      setExclusionOptions(options);
   }, [props.timeBlocks]);

   useEffect(() => {
      const fetchExclusionDates = async () => {
         props.setExcludedTimeSlots([]);
         const resp = await pdrmSettingsService.getExclusionTimeSlots(props.meetingTypeId, props.selectedExclusionDate);
         if (resp.data?.excludedTimeBlocks !== undefined) {
            const timeBlocksResp = resp.data?.excludedTimeBlocks.map((timeBlock) => {
               return `${timeBlock.startTime}-${timeBlock.endTime}`;
            });
            props.setExcludedTimeSlots(timeBlocksResp);
         }
         props.setIsAllDay(resp.data?.isAllDay ?? false);
      };

      if (!isNullOrEmpty(props.selectedExclusionDate)) fetchExclusionDates();
   }, [props.selectedExclusionDate]);

   useEffect(() =>
      props.setExcludedTimeSlots(selectedExclusionOptions)
      , [selectedExclusionOptions])

   const generateExclusionOptions = (timeBlocks: string[]): OptionType[] => {
      let options: OptionType[] = [];

      for (let timeBlock of timeBlocks) {
         let option: OptionType = {
            key: timeBlock,
            value: `${convertTime(timeBlock.split("-")[0], false)} - ${convertTime(timeBlock.split("-")[1], false)}`
         }
         options.push(option);
      }

      return options;
   };

   const removeTimeBlock = (index: number) => {
      const updatedTimeBlocks = props.timeBlocks.filter((_, i) => i !== index);
      props.setTimeBlocks(updatedTimeBlocks);
      try {
         props.setNextTimeSlotUpdate({
            data: {
               timeBlocks: [
                  {
                     startTime: updatedTimeBlocks[index].split(" - ")[0],
                     endTime: updatedTimeBlocks[index].split(" - ")[1],
                  },
               ],
               meetingTypeId: props.meetingTypeId,
               action: CommonApiActions.Delete,
            },
            action: CommonApiActions.Delete,
         });
      }
      catch (error) {
         console.error(error);
      }
   };

   const removeExcludedTimeBlock = (index: number) => {
      const updatedTimeBlocks = props.excludedTimeSlots.filter((_, i) => i !== index);
      props.setExcludedTimeSlots(updatedTimeBlocks);
      setSelectedExclusionOptions(updatedTimeBlocks);
      props.setDispatchExclusionDate(true);
   };

   const addTimeBlock = () => {
      if (startTime && endTime) {
         const start = moment(startTime, ["HH:mm A"]);
         const end = moment(endTime, ["HH:mm A"]);

         if (end.isBefore(start)) {
            enqueueSnackbar("End time cannot be earlier than start time.", { variant: ToastVariant.Error });
            return;
         }

         if (start.isSame(end)) {
            enqueueSnackbar("Start time and end time cannot be the same.", { variant: ToastVariant.Error });
            return;
         }

         for (let i = 0; i < props.timeBlocks.length; i++) {
            const [existingStartTime, existingEndTime] = props.timeBlocks[i].split(" - ");
            const existingStart = moment(existingStartTime, ["HH:mm:ss"]);
            const existingEnd = moment(existingEndTime, ["HH:mm:ss"]);
            if (existingEnd.isBefore(existingStart)) {
               existingEnd.add(1, 'days');
            }

            // Check for overlap
            if (
               (start.isBetween(existingStart, existingEnd, null, '[)') ||
                  end.isBetween(existingStart, existingEnd, null, '(]')) ||
               (existingStart.isBetween(start, end, null, '[)') ||
                  existingEnd.isBetween(start, end, null, '(]'))
            ) {
               enqueueSnackbar("Time blocks cannot overlap.", { variant: ToastVariant.Error });
               return;
            }

            if (start.isSame(existingStart) && end.isSame(existingEnd)) {
               enqueueSnackbar("This time block already exists.", { variant: ToastVariant.Error });
               return;
            }
         }

         const startTimeConverted = start.format("HH:mm:ss");
         const endTimeConverted = end.format("HH:mm:ss");
         props.setTimeBlocks([...props.timeBlocks, `${startTimeConverted} - ${endTimeConverted}`]);
         props.setNextTimeSlotUpdate({
            data: {
               timeBlocks: [
                  {
                     startTime: startTimeConverted,
                     endTime: endTimeConverted,
                  },
               ],
               meetingTypeId: props.meetingTypeId,
               action: CommonApiActions.Add,
            },
            action: CommonApiActions.Add,
         });
      }
   };

   const onSelectTimeSlotInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (props.excludedTimeSlots.includes(e.target.value)) {
         enqueueSnackbar("Exclusion time slot already added.", { variant: ToastVariant.Error });
         return;
      }
      const updatedOptions = [...selectedExclusionOptions, e.target.value];
      setSelectedExclusionOptions(updatedOptions);
      props.setExcludedTimeSlots(updatedOptions);
      props.setDispatchExclusionDate(true);
   }

   const dateSelectionChanged = (day: number, days: number[] = []) => {
      if (props.filteredDates.includes(day)) {
         props.setFilteredDates(props.filteredDates.filter((date) => date !== day));
      } else {
         props.setFilteredDates([...props.filteredDates, day]);
      }

      if (days.length > 0) {
         days.forEach((d) => {
            if (props.filteredDates.includes(d)) {
               props.setFilteredDates(props.filteredDates.filter((date) => date !== d));
            } else {
               props.setFilteredDates([...props.filteredDates, d]);
            }
         });
      }
   };

   const convertTime = (time: string, to24Hrs: boolean): string => {
      if (to24Hrs) {
         if (time.includes("AM") || time.includes("PM")) {
            return moment(time, ["h:mm A"]).format("HH:mm");
         }
      }
      return moment(time, ["HH:mm"]).format("h:mm A");
   }

   return (
      <CdContainer>
         <CdCol>
            <CdRow>
               <CdTypography className="p">
                  <b>Define Meeting Calendar</b>
               </CdTypography>
               <CdTypography className="p">
                  Lorem Ipso about this section
               </CdTypography>
            </CdRow>
            <CdRow className="mt-4">
               <CdCol className="col-6">
                  <CdSelectInput
                     id="meeting-time"
                     defaultChecked={props.meetingTypeId.toString()}
                     onSelect={(e) => {
                        props.setMeetingTypeId(parseInt(e.target.value));
                     }}
                     label="Select Meeting Types to Configure"
                     options={props.meetingTypes}
                  />
               </CdCol>
            </CdRow>
            <CdRow>
               <CdRow className="mt-4">
                  <CdTypography className="p">
                     <b>Select days that meetings can be scheduled on</b>
                  </CdTypography>
               </CdRow>
               <CdRow>
                  <CdCol>
                     <CdCheckboxInput
                        id="monday"
                        label="Monday"
                        checked={props.mondayChecked}
                        onChange={() => {
                           props.setMondayChecked(!props.mondayChecked);
                           dateSelectionChanged(1); // Monday
                        }}
                     />
                     <CdCheckboxInput
                        id="tuesday"
                        label="Tuesday"
                        checked={props.tuesdayChecked}
                        onChange={() => {
                           props.setTuesdayChecked(!props.tuesdayChecked);
                           dateSelectionChanged(2); // Tuesday
                        }}
                     />
                     <CdCheckboxInput
                        id="wednesday"
                        label="Wednesday"
                        checked={props.wednesdayChecked}
                        onChange={() => {
                           props.setWednesdayChecked(!props.wednesdayChecked);
                           dateSelectionChanged(3); // Wednesday
                        }}
                     />
                     <CdCheckboxInput
                        id="thursday"
                        label="Thursday"
                        checked={props.thursdayChecked}
                        onChange={() => {
                           props.setThursdayChecked(!props.thursdayChecked);
                           dateSelectionChanged(4); // Thursday
                        }}
                     />
                     <CdCheckboxInput
                        id="friday"
                        label="Friday"
                        checked={props.fridayChecked}
                        onChange={() => {
                           props.setFridayChecked(!props.fridayChecked);
                           dateSelectionChanged(5); // Friday
                        }}
                     />
                     <CdCheckboxInput
                        id="saturday"
                        label="Saturday"
                        checked={props.saturdayChecked}
                        onChange={() => {
                           props.setSaturdayChecked(!props.saturdayChecked);
                           dateSelectionChanged(6); // Saturday
                        }}
                     />
                     <CdCheckboxInput
                        id="sunday"
                        label="Sunday"
                        checked={props.sundayChecked}
                        onChange={() => {
                           props.setSundayChecked(!props.sundayChecked);
                           dateSelectionChanged(0); // Sunday
                        }}
                     />
                  </CdCol>
               </CdRow>
            </CdRow>
            <CdRow className="mt-4">
               <CdRow>
                  <CdTypography className="p">
                     View how others will see the calendar
                  </CdTypography>
               </CdRow>
               <CdCol>
                  <CdRow className="d-inline-block">
                     <CdCol style={{ position: "relative" }}>
                        <CdButton type="button" color="primary" id="view_calendar" onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>View Calendar</CdButton>
                        {isDatePickerOpen && (
                           <CdDatePicker
                              id="date-picker"
                              selected={new Date()}
                              onChange={() => { }}
                              placeholderText="Date"
                              showIcon={true}
                              inline

                              className="date-picker-on-top"
                              popperPlacement="right-start"
                              filterDate={(date) => {
                                 const day = date.getDay();
                                 return props.filteredDates.includes(day);
                              }}
                           />
                        )}
                     </CdCol>
                  </CdRow>
               </CdCol>
            </CdRow>
            <CdRow>
               <CdRow className="mt-4">
                  <CdTypography className="p">
                     <b>Set Hours</b>
                  </CdTypography>
               </CdRow>
               <CdRow className="d-inline-block">
                  <CdTypography className="p">
                     Add blocks of time that user are allowed to request meetings.
                  </CdTypography>
               </CdRow>
            </CdRow>
            <CdRow>
               <CdCol className="col-8">
                  <CdRow className="mt-4">
                     <CdTypography className="p">
                        <b>Time Block</b>
                     </CdTypography>
                  </CdRow>
                  <CdRow className="d-flex align-items-center mt-2">
                     <CdCol className="col-4">
                        <CdTimePicker
                           id="time-block-1"
                           onChange={(val) => setStartTime(val)}
                           className="w-100"
                        />
                     </CdCol>
                     <CdCol className="col-auto d-flex justify-content-center mx-2">
                        <CdTypography className="p">
                           to
                        </CdTypography>
                     </CdCol>
                     <CdCol className="col-4">
                        <CdTimePicker
                           id="time-block-2"
                           onChange={(val) => setEndTime(val)}
                        />
                     </CdCol>
                     <CdCol className="col-auto">
                        <CdButton
                           color="primary"
                           id="add_time_block"
                           onClick={addTimeBlock}
                        >
                           Add Time
                        </CdButton>
                     </CdCol>
                  </CdRow>
               </CdCol>
            </CdRow>
            <CdRow className="mt-4">
               {props.timeBlocks.map((timeBlock, index) => (
                  <InfoCard
                     key={index}
                     indicatorColorWidth="30px"
                     indicatorColor="#cbebff"
                     onClick={() => removeTimeBlock(index)}
                     buttonContent={
                        <div className="d-flex align-items-center gap-2">
                           <FaTrash />
                        </div>
                     }
                     className={index % 2 === 0 ? "background-color-even-row" : "background-color-odd-row"}
                  >
                     Time Block : {convertTime(timeBlock.split("-")[0], false)} - {convertTime(timeBlock.split("-")[1], false)}
                  </InfoCard>
               ))}
            </CdRow>
            <CdRow>
               <CdRow className="mt-4">
                  <CdTypography className="p">
                     <b>Specific Exclusion</b>
                  </CdTypography>
               </CdRow>
               <CdRow className="d-inline-block">
                  <CdTypography className="p">
                     Set a specific date and or time that you can not be reached at
                  </CdTypography>
               </CdRow>
            </CdRow>

            <CdRow>
               <CdCol>
                  <CdRow className="d-inline-block">
                     <CdCol style={{ position: "relative" }}>
                        <CdDatePicker
                           selected={props.selectedExclusionDate ? new Date(props.selectedExclusionDate) : undefined}
                           id="exclusion-date-picker"
                           className="exclusions-date-picker"
                           onChange={(date) => {
                              props.setSelectedExcludedDate(moment(date).format('YYYY-MM-DD'));
                              props.setIsAllDay(false)
                           }}
                           filterDate={(date) => {
                              const day = date.getDay();
                              return props.filteredDates.includes(day);
                           }}
                        />
                     </CdCol>
                  </CdRow>
                  <CdRow className={"mt-4"}>
                     <CdToggleSwitch
                        checked={props.isAllDay ?? false}
                        onChange={(e) => {
                           props.setIsAllDay(e.target.checked)
                           if (e.target.checked) {
                              props.setExcludedTimeSlots(props.timeBlocks);
                              props.setDispatchExclusionDate(true);
                           }
                        }}
                        disabled={isNullOrEmpty(props.selectedExclusionDate)}
                        label="All Day"
                     />
                  </CdRow>
               </CdCol>
            </CdRow>
            <CdRow className="mt-4">
               <CdCol className="col-6">
                  <CdSelectInput
                     id="time-slot-selection-for-exclusion"
                     onSelect={(e) => onSelectTimeSlotInput(e)}
                     options={exclusionOptions}
                     label="Time"
                     disabled={isNullOrEmpty(props.selectedExclusionDate)}
                  />
               </CdCol>
            </CdRow>
            <CdRow className="mt-4">
               {props.excludedTimeSlots.map((timeBlock, index) => (
                  <InfoCard
                     key={index}
                     indicatorColorWidth="30px"
                     indicatorColor="#cbebff"
                     onClick={() => {
                        if (props.isAllDay) {
                           props.setIsAllDay(false);
                        }
                        removeExcludedTimeBlock(index);
                     }}
                     pattern={true}
                     buttonContent={
                        <div className="d-flex align-items-center gap-2">
                           <FaTrash />
                        </div>
                     }
                     className={index % 2 === 0 ? "background-color-even-row" : "background-color-odd-row"}
                  >
                     Time Block : {convertTime(timeBlock.split("-")[0], false)} - {convertTime(timeBlock.split("-")[1], false)}
                  </InfoCard>
               ))}
            </CdRow>
         </CdCol>
      </CdContainer>
   );
};

export default MeetingSettingsCalendarSection;
