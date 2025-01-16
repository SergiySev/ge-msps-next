'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ControlledPatientSelector } from '../../lib/components/controlled-form-components';
import { Button } from '@nextui-org/react';
import { UserPlusIcon, UsersIcon } from '@heroicons/react/16/solid';
import XLSXButton from 'msps/lib/components/other/XLSXButton/XLSXButton';

export default function Index() {
  const { control } = useForm();
  const router = useRouter();

  const handlePatientSelect = (patientId: number) => {
    router.push(`/profile/${patientId}/diseases`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center justify-center w-full p-6 border rounded-lg">
        <ControlledPatientSelector
          name="patient"
          control={control}
          label="პაციენტის არჩევა"
          onPatientSelect={handlePatientSelect}
        />
      </div>

      <div className="flex items-center justify-center w-full p-6 border rounded-lg">
        <Button
          color="primary"
          onPress={() => router.push('/patient/')}
          startContent={<UserPlusIcon className="min-w-6 min-h-6" />}
        >
          ახალი პაციენტის დამატება
        </Button>
      </div>

      <div className="flex items-center justify-center w-full p-6 border rounded-lg">
        <Button
          color="default"
          variant="bordered"
          onPress={() => router.push('/patients/')}
          startContent={<UsersIcon className="min-w-6 min-h-6" />}
        >
          ბოლო დამატებული პაციენტები
        </Button>
      </div>

      <div className="flex items-center justify-center w-full p-6 border rounded-lg">
        <XLSXButton />
      </div>
    </div>
  );
}
