import { Textarea, TextAreaProps } from '@nextui-org/react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

interface ControlledTextAreaProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
}

const ControlledTextArea = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  variant = 'underlined',
  ...props
}: ControlledTextAreaProps<T> & TextAreaProps) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
      <Textarea
        variant={variant}
        label={label}
        // Convert null to empty string, keep undefined as is
        value={value === null ? '' : value}
        onBlur={onBlur}
        onChange={onChange}
        errorMessage={errors?.[name]?.message?.toString()}
        isInvalid={!!errors?.[name]}
        {...props}
      />
    )}
  />
);

export default ControlledTextArea;