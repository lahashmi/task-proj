import * as moment from 'moment';

export const formatDate = (date: Date): string => {
  return moment(date).format('MM/DD/yyyy');
};

export const checkDates = (date1: Date, date2: Date): boolean => {
  return moment(date2).isAfter(date1);
};
