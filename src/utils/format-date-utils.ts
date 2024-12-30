import { DateFormat, TimeUnit } from '@enums/date-format-types';
import moment, { Moment } from 'moment';

export const formatDate = (value: any, format: DateFormat): string => {
    if (!value) {
        return "-";
    }
    return moment(value).format(format);
}

export const currentDateTime = (): Moment => {
    return moment();
}

export const addTime = (timeUnit: TimeUnit, amountToAdd: number, datetimeString?: string | null): string => {
    if (!datetimeString) return "";

    const date = moment(datetimeString);

    if (!date.isValid()) {
        throw new Error('Invalid datetime string provided.');
    }

    date.add(amountToAdd, timeUnit);
    return date.toISOString();
}

export const getTimeDifference = (timeUnit: TimeUnit, datetime1?: string | null, datetime2?: string | null): number => {
    if (!datetime1 || !datetime2) return 0

    const date1 = moment(datetime1);
    const date2 = moment(datetime2);

    if (!date1.isValid() || !date2.isValid()) {
        throw new Error('Invalid datetime string(s) provided.');
    }

    return date2.diff(date1, timeUnit);
}