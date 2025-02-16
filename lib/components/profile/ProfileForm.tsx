'use client';

import { Button } from "@heroui/button";
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema } from 'msps/lib/validation/staff-profile';
import { updateProfile } from 'msps/lib/actions/profileAction';
import { ControlledInput } from '../controlled-form-components';
import toast from 'react-hot-toast';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useTranslations } from 'next-intl';

interface ProfileFormProps {
  initialUsername: string;
}

export const ProfileForm = ({ initialUsername }: ProfileFormProps) => {
  const t = useTranslations();

  const {
    form: {
      control,
      formState: { isValid, isSubmitting },
    },
    handleSubmitWithAction,
  } = useHookFormAction(updateProfile, zodResolver(updateProfileSchema), {
    formProps: {
      defaultValues: {
        username: initialUsername,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    },
    actionProps: {
      onSuccess: ({}) => {
        toast.success(t('profileUpdateSuccess'));
      },
      onError: ({ error }) => {
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
          name="currentPassword"
          type="password"
          label={t('currentPassword')}
          control={control}
          rules={{ required: true }}
          variant="bordered"
          className="w-full"
          placeholder=" "
        />

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

        <Button type="submit" color="primary" isLoading={isSubmitting} isDisabled={!isValid} className="w-full mt-4">
          {t('updateProfile')}
        </Button>
      </div>
    </form>
  );
};
