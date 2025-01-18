'use client';

import { ControlledInput } from '../../controlled-form-components';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Button } from '@nextui-org/react';
import { loginSchema, LoginSchema } from 'msps/lib/validation/login';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface LoginFormProps {
  data: LoginSchema;
  className?: string;
}

const LoginForm = ({ data, className }: LoginFormProps) => {
  const t = useTranslations();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      ...data,
      username: '',
      password: '',
    },
  });

  const onSubmit = async (formData: LoginSchema) => {
    try {
      const response = await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (response?.error) {
        // Handle specific error messages
        const errorMessage =
          response.error === 'No user found with this username'
            ? t('userNotFound')
            : response.error === 'Incorrect password'
              ? t('incorrectPassword')
              : response.error;

        toast.error(errorMessage);
        return;
      }

      if (response?.ok) {
        // Show success toast and redirect
        toast.success(t('loginSuccess'));
        router.push('/');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '';
      toast.error(`${t('generalError')}${errorMessage ? `: ${errorMessage}` : ''}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx('flex flex-col items-center justify-center min-h-[400px] w-full max-w-md mx-auto p-6', className)}
    >
      <div className="flex flex-col w-full gap-6 border rounded-lg p-10">
        <h4 className="text-xl font-semibold text-center mb-4">ავტორიზაცია</h4>

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
          name="password"
          type="password"
          label={t('password')}
          control={control}
          rules={{ required: true }}
          variant="bordered"
          className="w-full"
          placeholder=" "
        />

        <Button type="submit" color="primary" isLoading={isSubmitting} isDisabled={!isValid} className="w-full mt-4">
          {t('login')}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
