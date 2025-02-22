import { Radio, RadioGroup, RadioGroupProps } from "@heroui/react";
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

interface RadioItem {
  value: string;
  label: string;
  description?: string;
}

interface ControlledRadioGroupProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  items: RadioItem[];
  orientation?: 'horizontal' | 'vertical';
}

const ControlledRadioGroup = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  items,
  size = 'sm',
  color = 'default',
  orientation = 'horizontal',
  ...props
}: ControlledRadioGroupProps<T> & Omit<RadioGroupProps, 'value' | 'onChange' | 'onBlur'>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
      <RadioGroup
        label={label}
        orientation={orientation}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        isInvalid={!!errors?.[name]}
        errorMessage={errors?.[name]?.message?.toString()}
        color={color}
        size={size}
        className="text-sm"
        {...props}
      >
        {items.map(item => (
          <Radio key={item.value} value={item.value} description={item.description}>
            <span className="ml-2">{item.label}</span>
          </Radio>
        ))}
      </RadioGroup>
    )}
  />
);

export default ControlledRadioGroup;
