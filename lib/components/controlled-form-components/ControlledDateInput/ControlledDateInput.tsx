import { DateInput, DateInputProps } from '@nextui-org/react';
import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { CalendarDate, parseDate } from '@internationalized/date';

interface ControlledDateInputProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: React.ReactNode;
}

// Helper function to convert various date formats to CalendarDate
const toCalendarDate = (value: Date | string | CalendarDate | null | undefined): CalendarDate | null => {
  if (!value) return null;

  if (value instanceof CalendarDate) return value;

  if (value instanceof Date) {
    return new CalendarDate(
      value.getFullYear(),
      value.getMonth() + 1, // JavaScript months are 0-based
      value.getDate()
    );
  }

  if (typeof value === 'string') {
    try {
      return parseDate(value);
    } catch {
      // If the string is not in YYYY-MM-DD format, try creating from Date
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
      }
    }
  }

  return null;
};

const ControlledDateInput = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  variant = 'underlined',
  ...props
}: ControlledDateInputProps<T> & Omit<DateInputProps, 'value' | 'onChange' | 'onDateChange'>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
      <DateInput
        label={label}
        variant={variant}
        value={toCalendarDate(value)}
        onBlur={onBlur}
        onChange={onChange}
        errorMessage={errors?.[name]?.message?.toString()}
        isInvalid={!!errors?.[name]}
        {...props}
      />
    )}
  />
);

export default ControlledDateInput;
