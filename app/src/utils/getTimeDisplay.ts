import moment from 'moment';

export const getTimeDisplay = (durationInSeconds: number) => moment.duration(durationInSeconds, 'seconds').humanize();
