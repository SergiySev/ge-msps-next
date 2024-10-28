import { Input } from '@nextui-org/react';
import React from 'react';
import { Controller } from 'react-hook-form';

interface ControlledInputProps<T> {
  name: string;
  control: any;
  rules?: any;
  label: string;
  placeholder: string;
  variant?: "underlined" | "flat" | "faded" | "bordered" | undefined;
  description?: string;
  errorMessage?: string;
  setValue: (name: keyof T, value: any) => void;
}

const ControlledInput = <T,>({
  name,
  control,
  rules,
  label,
  placeholder,
  variant = 'underlined',
  description,
  errorMessage,
  setValue,
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
        onClear={() => setValue(name as keyof T, '')}
        errorMessage={errors[name] && errorMessage}
        isInvalid={!!errors[name]}
      />
    )}
  />
);

export default ControlledInput;