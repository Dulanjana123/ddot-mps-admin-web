import moment from "moment";

export const minsToHours = (mins: number): {
    hours: number,
    minutes: number
} => {
    const duration = moment.duration(mins, 'minutes');
    return {
        hours: Math.floor(duration.asHours()),
        minutes: duration.minutes(),
    };
};

export const hoursToMinutes = (hours: number): number => {
    return moment.duration(hours, 'hours').asMinutes();;
};