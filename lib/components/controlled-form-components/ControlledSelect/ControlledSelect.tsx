import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

interface DataItem {
  id: number;
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
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
        <Select<DataItem>
          items={items}
          label={label}
          placeholder={placeholder}
          variant={variant}
          selectedKeys={value !== null && value !== undefined ? new Set([value.toString()]) : new Set()}
          onBlur={onBlur}
          onSelectionChange={keys => {
            const selectedKey = Array.from(keys)[0];
            onChange(selectedKey ? Number(selectedKey) : null);
          }}
          errorMessage={errors?.[name]?.message?.toString()}
          isInvalid={!!errors?.[name]?.message}
          {...props}
        >
          {item => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {item.name}
            </SelectItem>
          )}
        </Select>
      )}
    />
  );
};

export default ControlledSelect;
