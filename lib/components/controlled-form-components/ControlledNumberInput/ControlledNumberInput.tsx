import { Input, InputProps } from '@nextui-org/react';
import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

interface ControlledNumberInputProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  mode?: 'number' | 'decimal';
}

const ControlledNumberInput = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  mode = 'number',
  variant = 'underlined',
  ...props
}: ControlledNumberInputProps<T> & InputProps) => {
  const formatValue = (value: string) => {
    if (!value) return '';

    if (mode === 'decimal') {
      // Remove any non-digit and non-decimal characters
      const cleaned = value.replace(/[^\d.]/g, '');

      // Split by decimal point
      const parts = cleaned.split('.');

      // Handle the integer part
      const integerPart = parts[0];

      // Handle decimal part if it exists
      if (parts.length > 1) {
        const decimalPart = parts[1].slice(0, 2); // Limit to 2 decimal places
        return `${integerPart}.${decimalPart}`;
      }

      return integerPart;
    } else {
      // For number mode, only allow integers
      return value.replace(/\D/g, '');
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
        <Input
          type="text"
          variant={variant}
          autoComplete="off"
          label={label}
          value={value === 0 ? '0' : value || ''}
          onBlur={onBlur}
          onChange={e => {
            const formattedValue = formatValue(e.target.value);
            onChange(formattedValue ? Number(formattedValue) : '');
          }}
          errorMessage={errors?.[name]?.message?.toString()}
          isInvalid={!!errors?.[name]?.message}
          onClear={() => onChange('')}
          {...props}
        />
      )}
    />
  );
};

export default ControlledNumberInput;
