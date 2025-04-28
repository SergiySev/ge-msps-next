'use client';

import { Button } from '@heroui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, updatePasswordSchema } from 'msps/lib/validation/staff-profile';
import { updateProfile, updatePassword } from 'msps/lib/actions/profileAction';
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BasicProfileForm
          initialUsername={initialUsername}
          initialFirstName={initialFirstName}
          initialLastName={initialLastName}
        />

        <PasswordUpdateForm />
      </div>
    </div>
  );
};

const BasicProfileForm = ({ initialUsername, initialFirstName, initialLastName }: ProfileFormProps) => {
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
    <form onSubmit={handleSubmitWithAction} className="flex flex-col w-full gap-6 p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{t('profile')}</h2>

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

      <Button type="submit" color="primary" isLoading={isSubmitting} className="w-full mt-4">
        {t('updateProfile')}
      </Button>
    </form>
  );
};

const PasswordUpdateForm = () => {
  const t = useTranslations();

  const {
    form: {
      control,
      formState: { isSubmitting },
    },
    handleSubmitWithAction,
  } = useHookFormAction(updatePassword, zodResolver(updatePasswordSchema), {
    formProps: {
      defaultValues: {
        newPassword: '',
        confirmPassword: '',
      },
      mode: 'onChange',
    },
    actionProps: {
      onSuccess: ({}) => {
        toast.success(t('passwordUpdateSuccess'));
      },
      onError: ({ error }) => {
        console.error('Error: ', error);
        toast.error(error.serverError || t('somethingWentWrong'));
      },
    },
  });

  return (
    <form onSubmit={handleSubmitWithAction} className="flex flex-col w-full gap-6 p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">{t('password')}</h2>

      <ControlledInput
        name="newPassword"
        type="password"
        label={t('newPassword')}
        control={control}
        rules={{ required: true }}
        variant="bordered"
        className="w-full"
        placeholder=" "
      />

      <ControlledInput
        name="confirmPassword"
        type="password"
        label={t('confirmPassword')}
        control={control}
        rules={{ required: true }}
        variant="bordered"
        className="w-full"
        placeholder=" "
      />

      <Button type="submit" color="primary" isLoading={isSubmitting} className="w-full mt-4">
        {t('updatePassword')}
      </Button>
    </form>
  );
};
