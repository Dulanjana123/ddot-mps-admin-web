import { SelectionDatesKeys } from '@enums/selection-dates-keys';

export const SelectionDatesOptions = [
  { key: SelectionDatesKeys.ThisWeek, value: 'This Week' },
  { key: SelectionDatesKeys.LastWeek, value: 'Last Week' },
  { key: SelectionDatesKeys.ThisMonth, value: 'This Month' },
  { key: SelectionDatesKeys.LastMonth, value: 'Last Month' },
  { key: SelectionDatesKeys.ThisYear, value: 'This Year' },
  { key: SelectionDatesKeys.LastYear, value: 'Last Year' },
  { key: SelectionDatesKeys.LastSixMonths, value: 'Last Six Months' },
];
