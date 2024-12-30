import { DateFormat } from "@enums/date-format-types";
import moment, { Moment } from "moment";

export const formatDateDefault = (dateStr) => {
  let date;

  // Check if the input is a string or Date object
  if (typeof dateStr === "string" || dateStr instanceof Date) {
    date = new Date(dateStr);
  } else {
    return "N/A";
  }

  // Check if the created Date object is valid
  if (isNaN(date.getTime())) {
    return "N/A";
  }

  return dateToYMDFormat(date);
};

// this will replace when proper date formating method implemented
export const dateToYMDFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-indexed month
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const firstDateOfCurrentMonth = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}-01`;
};

export const formatDate = (value: any, format: DateFormat): string => {
  if (!value) {
    return "-";
  }
  return moment(value).format(format);
}

export const currentDateTime = (): Moment => {
  return moment();
}