import { Checkbox, CheckboxProps } from "@heroui/checkbox";
import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

interface ControlledCheckboxProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  description?: string;
}

const ControlledCheckbox = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  size = 'sm',
  color = 'default',
  onValueChange,
  ...props
}: ControlledCheckboxProps<T> &
  Omit<CheckboxProps, 'onChange' | 'onBlur' | 'checked' | 'defaultChecked' | 'value' | 'isSelected'>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { value, onChange, ref }, formState: { errors } }) => (
      <Checkbox
        {...props}
        size={size}
        color={color}
        defaultSelected={value}
        onValueChange={isSelected => {
          onValueChange?.(isSelected);
          onChange(isSelected);
        }}
        ref={ref}
        isInvalid={!!errors?.[name]}
      >
        {label}
      </Checkbox>
    )}
  />
);

export default ControlledCheckbox;