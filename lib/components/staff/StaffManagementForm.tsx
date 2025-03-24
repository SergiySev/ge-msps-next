'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@heroui/button';
import { ControlledInput } from '../controlled-form-components';
import { ControlledSelect } from '../controlled-form-components';
import { ControlledCheckbox } from '../controlled-form-components';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateStaff } from 'msps/lib/actions/staffAction';
import { updateStaffSchema } from 'msps/lib/validation/staff';
import toast from 'react-hot-toast';

interface StaffMember {
  id: number;
  username: string;
  first_name: string | null;
  last_name: string | null;
  role: string | null;
  active: boolean | null;
  created_at: Date | null;
}

interface StaffManagementFormProps {
  staffMember: StaffMember;
}

export const StaffManagementForm = ({ staffMember }: StaffManagementFormProps) => {
  const t = useTranslations();

  const {
    form: {
      control,
      formState: { isSubmitting },
    },
    handleSubmitWithAction,
  } = useHookFormAction(updateStaff, zodResolver(updateStaffSchema), {
    formProps: {
      defaultValues: {
        id: staffMember.id.toString(),
        username: staffMember.username,
        first_name: staffMember.first_name || '',
        last_name: staffMember.last_name || '',
        role: (staffMember.role as 'nurse' | 'doctor' | 'manager' | 'admin' | undefined) || 'nurse',
        isActive: staffMember.active || false,
        newPassword: '',
        confirmPassword: '',
      },
      mode: 'onChange',
    },
    actionProps: {
      onSuccess: () => {
        toast.success(t('staffUpdateSuccess'));
      },
      onError: ({ error }) => {
        console.error('Error: ', error);
        toast.error(error.serverError || t('somethingWentWrong'));
      },
    },
  });

  return (
    <form
      onSubmit={handleSubmitWithAction}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-6"
    >
      <div className="flex flex-col w-full gap-6 px-2 sm:px-10">
        <ControlledInput
          name="username"
          label={t('username')}
          control={control}
          rules={{ required: true }}
          variant="bordered"
          className="w-full"
          placeholder=" "
        />

        <ControlledInput
          name="first_name"
          label={t('first_name')}
          control={control}
          rules={{ required: true }}
          variant="bordered"
          className="w-full"
          placeholder=" "
        />

        <ControlledInput
          name="last_name"
          label={t('last_name')}
          control={control}
          rules={{ required: true }}
          variant="bordered"
          className="w-full"
          placeholder=" "
        />

        <ControlledSelect
          name="role"
          label={t('role')}
          control={control}
          rules={{ required: true }}
          variant="bordered"
          className="w-full"
          items={[
            { id: 'nurse', name: t('nurse') },
            { id: 'doctor', name: t('doctor') },
            { id: 'manager', name: t('manager') },
            { id: 'admin', name: t('admin') },
          ]}
        />

        <ControlledCheckbox name="isActive" label={t('active')} control={control} className="w-full" color="primary" />

        <ControlledInput
          name="newPassword"
          type="password"
          label={t('newPassword')}
          control={control}
          variant="bordered"
          className="w-full"
          placeholder=" "
        />

        <ControlledInput
          name="confirmPassword"
          type="password"
          label={t('confirmPassword')}
          control={control}
          variant="bordered"
          className="w-full"
          placeholder=" "
        />

        <Button type="submit" color="primary" isLoading={isSubmitting} className="w-full mt-4">
          {t('updateStaff')}
        </Button>
      </div>
    </form>
  );
};
