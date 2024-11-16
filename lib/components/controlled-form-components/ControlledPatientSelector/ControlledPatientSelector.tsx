import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Controller, FieldValues, UseControllerProps, useWatch } from 'react-hook-form';
import { Input, Button } from '@nextui-org/react';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { Spinner } from '@nextui-org/react';
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
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
}

const ControlledPatientSelector = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  variant = 'underlined',
}: PatientSelectorProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Get the current value using useWatch
  const currentValue = useWatch({
    control,
    name,
  });

  const fetchPatientById = useCallback(async (id: number) => {
    try {
      const response = await fetch(`/api/patients/${id}`);
      if (response.ok) {
        const patient = await response.json();
        setSelectedPatient(patient);
        setSearchTerm(`${patient.first_name} ${patient.last_name} (${patient.personal_id})`);
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
        searchPatients(value);
      }, 300),
    [searchPatients]
  );

  // Cleanup debounced search on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Handle value changes from the form
  const handleValueChange = useCallback(
    (value: number | null) => {
      if (value && !isEditMode) {
        setIsEditMode(true);
        fetchPatientById(value);
      }
    },
    [isEditMode, fetchPatientById]
  );

  // Effect to handle value changes
  useEffect(() => {
    handleValueChange(currentValue);
  }, [currentValue, handleValueChange]);

  const handleInputChange = useCallback(
    (value: string, onChange: (value: number | null) => void) => {
      setSearchTerm(value);
      setSelectedPatient(null);
      onChange(null);
      if (value) {
        debouncedSearch(value);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    },
    [debouncedSearch]
  );

  const handleSelection = useCallback((patient: Patient, onChange: (value: number) => void) => {
    setSelectedPatient(patient);
    setSearchTerm(`${patient.first_name} ${patient.last_name} (${patient.personal_id})`);
    onChange(patient.id);
    setIsOpen(false);
  }, []);

  const handleClear = useCallback((onChange: (value: null) => void) => {
    setSelectedPatient(null);
    setSearchTerm('');
    onChange(null);
    setSuggestions([]);
    setIsOpen(false);
    setIsEditMode(false); // Add this to reset edit mode when clearing
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
        <div className="relative flex gap-2 items-start">
          <div className="flex-1 relative">
            <Input
              variant={variant}
              label={label}
              value={searchTerm}
              isDisabled={!!selectedPatient || isEditMode}
              onChange={e => handleInputChange(e.target.value, onChange)}
              errorMessage={errors?.[name]?.message?.toString()}
              isInvalid={!!errors?.[name]}
              endContent={isLoading ? <Spinner size="sm" /> : null}
            />
            {isOpen && !selectedPatient && !isEditMode && suggestions.length > 0 && (
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
                      onClick={() => handleSelection(patient, onChange)}
                    >
                      {`${patient.first_name} ${patient.last_name} (${patient.personal_id})`}
                    </ListboxItem>
                  )}
                </Listbox>
              </div>
            )}
          </div>
          {value && !isEditMode && (
            <Button
              isIconOnly
              size="sm"
              radius="full"
              variant="light"
              aria-label="Clear selection"
              className="mt-4"
              onClick={() => handleClear(onChange)}
            >
              <XCircleIcon className="h-4 w-4" />
            </Button>
          )}
          {value && isEditMode && (
            <Button
              isIconOnly
              size="sm"
              radius="full"
              variant="light"
              aria-label="View patient profile"
              className="mt-4"
              onClick={() => handleViewProfile(value)}
            >
              <UserIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    />
  );
};

export default ControlledPatientSelector;
