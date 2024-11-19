import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { useCallback } from 'react';

interface DataItem {
  id: number | string;
  name: string;
}

interface ControlledSelectProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  items: DataItem[];
  clearable?: boolean;
  clearableText?: string;
}

const EMPTY_OPTION_KEY = 'empty-option';

const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  items,
  placeholder,
  variant = 'underlined',
  clearable = false,
  clearableText = '-- Select --',
  ...props
}: ControlledSelectProps<T> & Omit<SelectProps, 'children'>) => {
  // Helper function to handle value to SelectKey conversion
  const toSelectKeys = useCallback(
    (value: string | number | null | undefined): Set<string> => {
      if (value === null || value === undefined || value === '') {
        return clearable ? new Set([EMPTY_OPTION_KEY]) : new Set();
      }
      return new Set([String(value)]);
    },
    [clearable]
  );

  // Helper function to convert SelectKey back to the appropriate type
  const fromSelectKey = useCallback(
    (keys: Set<string>): string | number | null => {
      const selectedKey = Array.from(keys)[0];

      if (!selectedKey || selectedKey === EMPTY_OPTION_KEY) {
        return null;
      }

      const matchingItem = items.find(item => String(item.id) === selectedKey);
      if (!matchingItem) {
        return null;
      }

      return typeof matchingItem.id === 'number' ? Number(selectedKey) : selectedKey;
    },
    [items]
  );

  // Prepare items list with empty option if clearable is true
  const selectItems = clearable ? [{ id: EMPTY_OPTION_KEY, name: clearableText }, ...items] : items;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
        <Select<DataItem>
          items={selectItems}
          label={label}
          placeholder={placeholder || label}
          variant={variant}
          selectedKeys={toSelectKeys(value)}
          onBlur={onBlur}
          disallowEmptySelection={!clearable}
          onSelectionChange={keys => {
            const convertedValue = fromSelectKey(keys as Set<string>);
            onChange(convertedValue);
          }}
          errorMessage={errors?.[name]?.message?.toString()}
          isInvalid={!!errors?.[name]}
          {...props}
        >
          {item => (
            <SelectItem
              key={String(item.id)}
              value={String(item.id)}
              className={item.id === EMPTY_OPTION_KEY ? 'text-gray-400' : ''}
            >
              {item.name}
            </SelectItem>
          )}
        </Select>
      )}
    />
  );
};

export default ControlledSelect;
