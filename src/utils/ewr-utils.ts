import { SoftVariant } from '@enums/components/CommonEnum';
import { EwrStatus } from '@enums/ewr-status-types';
import { SelectionDatesKeys } from '@enums/selection-dates-keys';
import { SWOStatus } from '@enums/swo-status-types';
import { currentDateTime } from './format-date-utils';

export const getVariantForEwrStatus = (status: string): SoftVariant => {
  const ewrStatusVariants: Record<string , SoftVariant> = {
    [EwrStatus.Cancelled]: SoftVariant.Secondary,
    [EwrStatus.Applied]: SoftVariant.Info,
    [EwrStatus.Rejected]: SoftVariant.Danger,
    [EwrStatus.Pending]: SoftVariant.Warning,
  };

  return ewrStatusVariants[status] || '';
};

export const getVariantForSwoStatus = (status: string): SoftVariant => {
  const swoStatusVariants: Record<string, SoftVariant> = {
    [SWOStatus.Incomplete]: SoftVariant.Danger,
    [SWOStatus.Issued]: SoftVariant.Info,
    [SWOStatus.Lifted]: SoftVariant.Secondary,
    [SWOStatus.Recorded]: SoftVariant.Warning,
  };

  return swoStatusVariants[status] || '';
};

export const setDatesFromList = (
  key: string,
  setStartDate: (args: Date | undefined) => void,
  setEndDate: (args: Date | undefined) => void,
) => {
  const today = currentDateTime();

  const dateCalculations: Record<string, () => { start: Date; end: Date }> = {
    [SelectionDatesKeys.ThisWeek]: () => ({
      start: today.clone().startOf('isoWeek').toDate(),
      end: today.clone().endOf('isoWeek').toDate(),
    }),
    [SelectionDatesKeys.LastWeek]: () => ({
      start: today.clone().subtract(1, 'week').startOf('isoWeek').toDate(),
      end: today.clone().subtract(1, 'week').endOf('isoWeek').toDate(),
    }),
    [SelectionDatesKeys.ThisMonth]: () => ({
      start: today.clone().startOf('month').toDate(),
      end: today.clone().endOf('month').toDate(),
    }),
    [SelectionDatesKeys.LastMonth]: () => ({
      start: today.clone().subtract(1, 'month').startOf('month').toDate(),
      end: today.clone().subtract(1, 'month').endOf('month').toDate(),
    }),
    [SelectionDatesKeys.ThisYear]: () => ({
      start: today.clone().startOf('year').toDate(),
      end: today.clone().endOf('year').toDate(),
    }),
    [SelectionDatesKeys.LastYear]: () => ({
      start: today.clone().subtract(1, 'year').startOf('year').toDate(),
      end: today.clone().subtract(1, 'year').endOf('year').toDate(),
    }),
    [SelectionDatesKeys.LastSixMonths]: () => ({
      start: today.clone().subtract(6, 'months').startOf('month').toDate(),
      end: today.clone().subtract(1, 'month').endOf('month').toDate(),
    }),
  };

  const calculation = dateCalculations[key];
  if (calculation) {
    const { start, end } = calculation();
    setStartDate(start);
    setEndDate(end);
  } else {
    setStartDate(undefined);
    setEndDate(undefined);
  }
};
