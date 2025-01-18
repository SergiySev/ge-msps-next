import { Input, InputProps } from '@nextui-org/react';
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
        // Multiple autocomplete attributes to handle different browsers
        autoComplete="new-password"
        // Additional attributes to prevent autofill
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        data-form-type="other"
        // Add a random name attribute to further prevent autofill
        inputProps={{
          'data-lpignore': 'true',
          'data-form-type': 'other',
        }}
        label={label}
        placeholder={placeholder || label}
        // Handle null/undefined values by converting them to empty string
        value={value ?? ''}
        onBlur={onBlur}
        // Ensure onChange always passes a string
        onChange={e => onChange(e?.target?.value ?? '')}
        errorMessage={errors?.[name]?.message?.toString()}
        isInvalid={!!errors?.[name]}
        onClear={() => onChange('')}
        {...props}
      />
    )}
  />
);

export default ControlledInput;
