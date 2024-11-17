import { Input, InputProps } from '@nextui-org/react';
import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

interface ControlledInputProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
}

const ControlledInput = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  variant = 'underlined',
  placeholder,
  ...props
}: ControlledInputProps<T> & InputProps) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
      <Input
        variant={variant}
        autoComplete="off"
        label={label}
        placeholder={placeholder || label}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        errorMessage={errors?.[name]?.message?.toString()}
        isInvalid={!!errors?.[name]}
        onClear={() => onChange('')}
        {...props}
      />
    )}
  />
);

export default ControlledInput;