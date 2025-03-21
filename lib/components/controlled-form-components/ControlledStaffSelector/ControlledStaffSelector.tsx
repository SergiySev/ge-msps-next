import { useEffect, useState, useCallback, useMemo } from 'react';
import { Controller, FieldValues, UseControllerProps, useWatch } from 'react-hook-form';
import { Input, Button } from "@heroui/react";
import { Listbox, ListboxItem } from "@heroui/react";
import { Spinner } from "@heroui/react";
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { XCircleIcon } from '@heroicons/react/16/solid';

interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  role: 'doctor' | 'nurse';
}

interface StaffSelectorProps<T extends FieldValues> extends UseControllerProps<T> {
  role: 'doctor' | 'nurse';
  label: string;
  placeholder?: string;
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
}

const ControlledStaffSelector = <T extends FieldValues>({
  name,
  control,
  rules,
  role,
  label,
  placeholder,
  variant = 'underlined',
}: StaffSelectorProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const currentValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (currentValue === null || currentValue === undefined) {
      setSearchTerm('');
      setSelectedStaff(null);
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [currentValue]);

  const fetchStaffById = useCallback(async (id: number) => {
    try {
      const response = await fetch(`/api/staff/${id}`);
      if (response.ok) {
        const staff = await response.json();
        setSelectedStaff(staff);
        setSearchTerm(`${staff.last_name} ${staff.first_name}`);
      }
    } catch (error) {
      console.error('Error fetching staff member:', error);
    }
  }, []);

  const handleValueChange = useCallback(
    (value: number | null) => {
      if (value) {
        fetchStaffById(value);
      }
    },
    [fetchStaffById]
  );

  useEffect(() => {
    handleValueChange(currentValue);
  }, [currentValue, handleValueChange]);

  const searchStaffBase = useCallback(
    async (query: string) => {
      if (query.length < 3 && query.length > 0) {
        return;
      }

      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        params.set('role', role);

        const response = await fetch(`/api/staff?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error('Error searching staff:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [role]
  );

  const searchStaff = useMemo(
    () =>
      throttle((query: string) => {
        searchStaffBase(query);
      }, 300),
    [searchStaffBase]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        searchStaffBase(value);
      }, 300),
    [searchStaffBase]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
      searchStaff.cancel();
    };
  }, [debouncedSearch, searchStaff]);

  const handleInputChange = useCallback(
    (value: string, onChange: (value: number | null) => void) => {
      // Immediately update the search term
      setSearchTerm(value);

      // Only clear selection if we actually have a selected staff
      if (selectedStaff) {
        setSelectedStaff(null);
        onChange(null);
      }

      // Handle empty input
      if (!value.trim()) {
        setSuggestions([]);
        setIsOpen(false);
        searchStaff('');
        return;
      }

      // Debounce the search only
      debouncedSearch(value);
    },
    [debouncedSearch, searchStaff, selectedStaff]
  );

  const handleSelection = useCallback((staff: Staff, onChange: (value: number) => void) => {
    setSelectedStaff(staff);
    setSearchTerm(`${staff.last_name} ${staff.first_name}`);
    onChange(staff.id);
    setIsOpen(false);
  }, []);

  const handleClear = useCallback((onChange: (value: null) => void) => {
    setSelectedStaff(null);
    setSearchTerm('');
    onChange(null);
    setSuggestions([]);
    setIsOpen(false);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <div className="relative flex gap-2 items-start">
          <div className="flex-1 relative">
            <Input
              variant={variant}
              label={label}
              placeholder={placeholder || label}
              value={searchTerm}
              isDisabled={false}
              onFocus={() => {
                setIsOpen(true);
                if (!searchTerm) searchStaff('');
              }}
              onBlur={() => {
                setTimeout(() => setIsOpen(false), 200);
              }}
              onChange={e => handleInputChange(e.target.value, onChange)}
              errorMessage={errors?.[name]?.message?.toString()}
              isInvalid={!!errors?.[name]}
              endContent={isLoading ? <Spinner size="sm" /> : null}
            />
            {isOpen && !selectedStaff && (
              <div className="relative">
                <Listbox
                  className="absolute w-full mt-1 border border-default-200 rounded-lg shadow-lg bg-content1 z-50"
                  items={suggestions}
                  aria-label="Staff suggestions"
                  emptyContent={
                    <div className="p-2 text-center text-default-400">
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Spinner size="sm" />
                          <span>Loading...</span>
                        </div>
                      ) : suggestions.length === 0 ? (
                        'No staff members found'
                      ) : null}
                    </div>
                  }
                >
                  {staff => (
                    <ListboxItem
                      key={staff.id}
                      className="py-2 px-3 hover:bg-default-100 cursor-pointer"
                      onPress={() => handleSelection(staff, onChange)}
                    >
                      {`${staff.last_name} ${staff.first_name}`}
                    </ListboxItem>
                  )}
                </Listbox>
              </div>
            )}
          </div>
          {value && (
            <Button
              isIconOnly
              size="sm"
              radius="full"
              variant="light"
              aria-label="Clear selection"
              className="mt-4"
              onPress={() => handleClear(onChange)}
            >
              <XCircleIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    />
  );
};

export default ControlledStaffSelector;
