'use client';

import { type hospital as Hospital } from '@prisma/client';
import { ControlledInput, ControlledCheckbox, SubmitButton } from '../../controlled-form-components';
import clsx from 'clsx';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { createHospitalClientSchema, updateHospitalClientSchema } from 'msps/lib/validation/hospital';
import toast from 'react-hot-toast';
import { createHospital, updateHospital } from 'msps/lib/actions/hospitalAction';
import { useTranslations } from 'next-intl';
import DeleteButton from '../../controlled-form-components/DeleteButton/DeleteButton';
import { useRouter } from 'next/navigation';

interface HospitalFormProps {
  data: Hospital | Partial<Hospital>;
  className?: string;
}

const HospitalForm = ({ data, className }: HospitalFormProps) => {
  const isEditPage = data.hasOwnProperty('id');

  const t = useTranslations();
  const hospitalT = useTranslations('hospital');
  const router = useRouter();

  const {
    form: {
      control,
      formState: { isSubmitting },
    },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(
    async formValues => {
      if (isEditPage) {
        return updateHospital(formValues);
      }
      return createHospital(formValues);
    },
    isEditPage ? zodResolver(updateHospitalClientSchema) : zodResolver(createHospitalClientSchema),
    {
      formProps: {
        defaultValues: {
          ...data,
        },
      },
      actionProps: {
        onSuccess: () => {
          const successMessage = isEditPage ? 'Hospital updated successfully!' : 'Hospital created successfully!';
          toast.success(successMessage);
          if (!isEditPage) resetFormAndAction();
          router.refresh();
        },
        onError: ({ error }) => {
          console.error('Error: ', error);
          toast.error(`Error: ${error.serverError || 'An unknown error occurred'}`);
        },
      },
    }
  );

  return (
    <form onSubmit={handleSubmitWithAction} className={clsx(className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ControlledInput
          name="name"
          label={hospitalT('name')}
          control={control}
          rules={{ required: true }}
          className="md:col-span-2"
        />

        <ControlledCheckbox name="active" label={hospitalT('active')} control={control} />
      </div>

      <SubmitButton className="mt-8" isEdit={isEditPage} isLoading={isSubmitting} />
    </form>
  );
};

export default HospitalForm;
