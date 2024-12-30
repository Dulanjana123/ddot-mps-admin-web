import { InspectionDto } from "@interfaces/request/ewr-inspection-dto";
import { minsToHours } from "./mins-to-hours";

export const calculateTotalHoursSpent = (inspList: InspectionDto[]) => {
  let totalMinsSpent = 0;
  inspList.forEach((item) => {
    totalMinsSpent = totalMinsSpent + item.minutesSpent;
  });
  return minsToHours(totalMinsSpent);
};
