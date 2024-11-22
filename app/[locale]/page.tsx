'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ControlledPatientSelector } from '../../lib/components/controlled-form-components';
import { Button } from '@nextui-org/react';
import { UserPlusIcon } from '@heroicons/react/16/solid';

export default function Index() {
  const { control } = useForm();
  const router = useRouter();

  const handlePatientSelect = (patientId: number) => {
    router.push(`/profile/${patientId}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-center w-full md:w-1/2 p-6 border rounded-lg">
        <ControlledPatientSelector
          name="patient"
          control={control}
          label="პაციენტის არჩევა"
          onPatientSelect={handlePatientSelect}
        />
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2 p-6 border rounded-lg">
        <Button
          color="primary"
          onClick={() => router.push('/patient/')}
          startContent={<UserPlusIcon className="min-w-6 min-h-6" />}
        >
          ახალი პაციენტის დამატება
        </Button>
      </div>
    </div>
  );
}
