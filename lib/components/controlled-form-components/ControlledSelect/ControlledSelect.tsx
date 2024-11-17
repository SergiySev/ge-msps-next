import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

interface DataItem {
  id: number | string;
  name: string;
}

interface ControlledSelectProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  items: DataItem[];
}

const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  items,
  placeholder,
  variant = 'underlined',
  ...props
}: ControlledSelectProps<T> & Omit<SelectProps, 'children'>) => {
  // Helper function to safely convert value to string for selectedKeys
  const safeToString = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === '') return '';
    return String(value);
  };

  // Helper function to convert string back to original type if needed
  const convertToOriginalType = (selectedKey: string | undefined) => {
    if (!selectedKey) return '';
    // If the original items have a matching number ID, convert to number
    const matchingItem = items.find(item => String(item.id) === selectedKey);
    if (matchingItem && typeof matchingItem.id === 'number') {
      return Number(selectedKey);
    }
    return selectedKey;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
        <Select<DataItem>
          items={items}
          label={label}
          placeholder={placeholder || label}
          variant={variant}
          selectedKeys={
            value !== null && value !== undefined && value !== '' ? new Set([safeToString(value)]) : new Set()
          }
          onBlur={onBlur}
          onSelectionChange={keys => {
            const selectedKey = Array.from(keys)[0];
            onChange(convertToOriginalType(selectedKey));
          }}
          errorMessage={errors?.[name]?.message?.toString()}
          isInvalid={!!errors?.[name]}
          {...props}
        >
          {item => (
            <SelectItem key={safeToString(item.id)} value={safeToString(item.id)}>
              {item.name}
            </SelectItem>
          )}
        </Select>
      )}
    />
  );
};

export default ControlledSelect;