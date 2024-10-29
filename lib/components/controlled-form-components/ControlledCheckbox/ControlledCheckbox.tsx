import { Checkbox, CheckboxProps } from "@nextui-org/checkbox";
import React from 'react';
import { Controller, FieldError, FieldValues, UseControllerProps } from 'react-hook-form';

interface ControlledCheckboxProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  variant?: 'underlined' | 'flat';
  description?: string;
}

const ControlledCheckbox = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  ...props
}: ControlledCheckboxProps<T> & CheckboxProps) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
      <Checkbox
        {...props}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        isInvalid={!!errors?.[name]?.message}
      >
        {label}
      </Checkbox>
    )}
  />
);

export default ControlledCheckbox;