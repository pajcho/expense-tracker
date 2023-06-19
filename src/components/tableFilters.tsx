import React, { PropsWithChildren } from 'react';
import { endOfMonth, format, setMonth, setYear, startOfMonth } from 'date-fns';
import { Select } from 'antd';

export type TableFiltersType = {
  fromDate: string | undefined;
  toDate: string | undefined;
};

const TableFilters = ({
  onFiltersChange,
}: PropsWithChildren<{ onFiltersChange: (filters: TableFiltersType) => void }>) => {
  // Default to All time picker (month = 12)
  const [currentMonth, setCurrentMonth] = React.useState<number>(12);
  const [currentYear, setCurrentYear] = React.useState<number>(new Date().getFullYear());
  const dateFilters = React.useMemo<TableFiltersType>(() => {
    // Default to undefined and we will show all time results
    const filter: TableFiltersType = { fromDate: undefined, toDate: undefined };

    // Check for regular month/year selection
    if (currentMonth < 12) {
      filter.fromDate = startOfMonth(setMonth(setYear(new Date(), currentYear), currentMonth)).toISOString();
      filter.toDate = endOfMonth(setMonth(setYear(new Date(), currentYear), currentMonth)).toISOString();
    }

    return filter;
  }, [currentYear, currentMonth]);

  const availableMonths = [
    { value: 12, label: 'All time' },
    ...Array.from(Array(12).keys()).map((index) => ({
      value: index,
      label: format(new Date().setMonth(index), 'MMMM'),
    })),
  ];
  const availableYears = [2023].map((index) => ({
    value: index,
    label: format(new Date().setFullYear(index), 'YYY'),
  }));

  const onMonthChange = (month: number) => {
    setCurrentMonth(month);
  };
  const onYearChange = (year: number) => {
    setCurrentYear(year);
  };

  React.useEffect(() => {
    onFiltersChange(dateFilters);
  }, [dateFilters, onFiltersChange]);

  return (
    <section className="mt-4 flex flex-row justify-end gap-2 transition-none">
      {currentMonth !== 12 && availableYears.length && (
        <Select defaultValue={currentYear} onChange={onYearChange} options={availableYears}></Select>
      )}
      {availableMonths.length && (
        <Select
          className="w-36"
          defaultValue={currentMonth}
          onChange={onMonthChange}
          options={availableMonths}
        ></Select>
      )}
    </section>
  );
};

export default React.memo(TableFilters);
