'use client';

import { Button } from '@heroui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema } from 'msps/lib/validation/staff-profile';
import { updateProfile } from 'msps/lib/actions/profileAction';
import { ControlledInput } from '../controlled-form-components';
import toast from 'react-hot-toast';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useTranslations } from 'next-intl';

interface ProfileFormProps {
  initialUsername: string;
  initialFirstName: string;
  initialLastName: string;
}

export const ProfileForm = ({ initialUsername, initialFirstName, initialLastName }: ProfileFormProps) => {
  const t = useTranslations();

  const {
    form: {
      control,
      formState: { isSubmitting },
    },
    handleSubmitWithAction,
  } = useHookFormAction(updateProfile, zodResolver(updateProfileSchema), {
    formProps: {
      defaultValues: {
        username: initialUsername,
        first_name: initialFirstName,
        last_name: initialLastName,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      mode: 'onChange',
    },
    actionProps: {
      onSuccess: ({}) => {
        toast.success(t('profileUpdateSuccess'));
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

        <ControlledInput
          name="currentPassword"
          type="password"
          label={t('currentPassword')}
          control={control}
          rules={{ required: false }}
          variant="bordered"
          className="w-full"
          placeholder=" "
        />

        <ControlledInput
          name="newPassword"
          type="password"
          label={t('newPassword')}
          control={control}
          rules={{ required: false }}
          variant="bordered"
          className="w-full"
          placeholder=" "
        />

        <ControlledInput
          name="confirmPassword"
          type="password"
          label={t('confirmPassword')}
          control={control}
          rules={{ required: false }}
          variant="bordered"
          className="w-full"
          placeholder=" "
        />

        <Button type="submit" color="primary" isLoading={isSubmitting} className="w-full mt-4">
          {t('updateProfile')}
        </Button>
      </div>
    </form>
  );
};
