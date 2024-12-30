import { isNullOrEmpty } from "./stringValidation";

export const isEndDateLater = (startDate: string, endDate: string): boolean => {
    if (isNullOrEmpty(startDate) || isNullOrEmpty(endDate)) return false
    return new Date(endDate) >= new Date(startDate)
};
