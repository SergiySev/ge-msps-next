import { Input } from '@nextui-org/react';
import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

interface ControlledInputProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  placeholder: string;
  variant?: 'underlined' | 'flat';
  description?: string;
  errorMessage: string;
}

const ControlledInput = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
  variant = 'underlined',
  description,
  errorMessage,
}: ControlledInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
      <Input
        label={label}
        placeholder={placeholder}
        variant={variant}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        description={description}
        errorMessage={errors[name] && errorMessage}
        isInvalid={!!errors[name]}
        onClear={() => onChange('')}
      />
    )}
  />
);

export default ControlledInput;