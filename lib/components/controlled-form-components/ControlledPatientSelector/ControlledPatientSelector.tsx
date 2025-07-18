import { useEffect, useState, useCallback, useMemo } from 'react';
import { Controller, FieldValues, UseControllerProps, useWatch } from 'react-hook-form';
import { Input, Button } from '@heroui/react';
import { Listbox, ListboxItem } from '@heroui/react';
import { Spinner } from '@heroui/react';
import debounce from 'lodash/debounce';
import { XCircleIcon, UserIcon } from '@heroicons/react/16/solid';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  personal_id: string;
}

interface PatientSelectorProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  placeholder?: string;
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  onPatientSelect?: (patientId: number) => void;
  editable?: boolean;
}

const ControlledPatientSelector = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
  variant = 'underlined',
  onPatientSelect,
  editable = true,
}: PatientSelectorProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const currentValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (currentValue === null || currentValue === undefined) {
      setSearchTerm('');
      setSelectedPatient(null);
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [currentValue]);

  const fetchPatientById = useCallback(async (id: number) => {
    try {
      const response = await fetch(`/api/patients/${id}`);
      if (response.ok) {
        const patient = await response.json();
        setSelectedPatient(patient);
        setSearchTerm(`${patient.last_name} ${patient.first_name} (${patient.personal_id})`);
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  }, []);

  const searchPatients = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams({ q: query });
      const response = await fetch(`/api/patients?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        setIsOpen(true);
      }
    } catch (error) {
      console.error('Error searching patients:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (value.length >= 3) {
          searchPatients(value);
        }
      }, 300),
    [searchPatients]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleValueChange = useCallback(
    (value: number | null) => {
      if (value) {
        fetchPatientById(value);
      }
    },
    [fetchPatientById]
  );

  useEffect(() => {
    handleValueChange(currentValue);
  }, [currentValue, handleValueChange]);

  const handleInputChange = useCallback(
    (value: string, onChange: (value: number | null) => void) => {
      // Immediately update the search term
      setSearchTerm(value);

      // Clear selection only if we're actually changing the input
      if (selectedPatient) {
        setSelectedPatient(null);
        onChange(null);
      }

      // Handle empty input
      if (!value.trim()) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      // Debounce the search only, not the input update
      debouncedSearch(value);
    },
    [debouncedSearch, selectedPatient]
  );

  const handleSelection = useCallback(
    (patient: Patient, onChange: (value: number) => void) => {
      setSelectedPatient(patient);
      setSearchTerm(`${patient.last_name} ${patient.first_name} (${patient.personal_id})`);
      onChange(patient.id);
      setIsOpen(false);
      onPatientSelect?.(patient.id);
    },
    [onPatientSelect]
  );

  const handleClear = useCallback((onChange: (value: null) => void) => {
    setSelectedPatient(null);
    setSearchTerm('');
    onChange(null);
    setSuggestions([]);
    setIsOpen(false);
  }, []);

  const handleViewProfile = useCallback((patientId: number) => {
    window.open(`/patient/${patientId}`, '_blank');
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <div className="w-full relative flex gap-2 items-start">
          <div className="flex-1 relative">
            <Input
              variant={variant}
              label={label}
              placeholder={placeholder || label}
              value={searchTerm}
              isDisabled={!editable}
              onChange={e => handleInputChange(e.target.value, onChange)}
              errorMessage={errors?.[name]?.message?.toString()}
              isInvalid={!!errors?.[name]}
              endContent={isLoading ? <Spinner size="sm" /> : null}
            />
            {isOpen && !selectedPatient && editable && suggestions.length > 0 && (
              <div className="relative">
                <Listbox
                  className="absolute w-full mt-1 border border-default-200 rounded-lg shadow-lg bg-content1 z-50"
                  items={suggestions}
                  aria-label="Patient suggestions"
                  emptyContent={
                    <div className="p-2 text-center text-default-400">
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Spinner size="sm" />
                          <span>Loading...</span>
                        </div>
                      ) : null}
                    </div>
                  }
                >
                  {patient => (
                    <ListboxItem
                      key={patient.id}
                      className="py-2 px-3 hover:bg-default-100 cursor-pointer"
                      onPress={() => handleSelection(patient, onChange)}
                    >
                      {`${patient.last_name} ${patient.first_name} (${patient.personal_id})`}
                    </ListboxItem>
                  )}
                </Listbox>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            {value && editable && (
              <Button
                isIconOnly
                size="sm"
                radius="full"
                variant="light"
                aria-label="Clear selection"
                onPress={() => handleClear(onChange)}
              >
                <XCircleIcon className="h-4 w-4" />
              </Button>
            )}
            {value && (
              <Button
                isIconOnly
                size="sm"
                radius="full"
                variant="light"
                aria-label="View patient profile"
                onPress={() => handleViewProfile(value)}
              >
                <UserIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default ControlledPatientSelector;
