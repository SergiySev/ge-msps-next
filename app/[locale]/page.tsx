'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ControlledPatientSelector } from '../../lib/components/controlled-form-components';
import { Button } from "@heroui/react";
import { UserPlusIcon, UsersIcon } from '@heroicons/react/16/solid';
import XLSXButton from 'msps/lib/components/other/XLSXButton/XLSXButton';
import { useTranslations } from 'next-intl';

export default function Index() {
  const { control } = useForm();
  const router = useRouter();
  const t = useTranslations();

  const handlePatientSelect = (patientId: number) => {
    router.push(`/profile/${patientId}/diseases`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center justify-center w-full p-6 border rounded-lg">
        <ControlledPatientSelector
          name="patient"
          control={control}
          label={t('index.selectPatient')}
          onPatientSelect={handlePatientSelect}
        />
      </div>

      <div className="flex items-center justify-center w-full p-6 border rounded-lg">
        <Button
          color="primary"
          onPress={() => router.push('/patient/')}
          startContent={<UserPlusIcon className="min-w-6 min-h-6" />}
        >
          {t('index.addNewPatient')}
        </Button>
      </div>

      <div className="flex items-center justify-center w-full p-6 border rounded-lg">
        <Button
          color="default"
          variant="bordered"
          onPress={() => router.push('/patients/')}
          startContent={<UsersIcon className="min-w-6 min-h-6" />}
        >
          {t('index.recentPatients')}
        </Button>
      </div>

      <div className="flex items-center justify-center w-full p-6 border rounded-lg">
        <XLSXButton />
      </div>
    </div>
  );
}
