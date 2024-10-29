import { Input, InputProps } from '@nextui-org/react';
import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

interface ControlledInputProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  placeholder: string;
  variant?: 'underlined' | 'flat';
  description?: string;
}

const ControlledInput = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  ...props
}: ControlledInputProps<T> & InputProps) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
      <Input
        variant="underlined"
        autoComplete="off"
        label={label}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        errorMessage={errors?.[name]?.message?.toString()}
        isInvalid={!!errors?.[name]?.message}
        onClear={() => onChange('')}
        {...props}
      />
    )}
  />
);

export default ControlledInput;