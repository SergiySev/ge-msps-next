'use client';

import { ControlledInput } from '../../controlled-form-components';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Button } from '@heroui/react';
import { loginSchema, LoginSchema } from 'msps/lib/validation/login';
import { signIn, useSession, getCsrfToken } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

interface LoginFormProps {
  data: LoginSchema;
  className?: string;
}

const LoginForm = ({ data, className }: LoginFormProps) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const { data: session, status } = useSession();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  // Get CSRF token on component mount
  useEffect(() => {
    getCsrfToken().then(token => setCsrfToken(token || null));
  }, []);

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

  // Hide form immediately when authenticated
  useEffect(() => {
    if (status === 'authenticated' && session) {
      setIsLoggingIn(false);
      // Redirect immediately without waiting
      router.push(callbackUrl || '/');
    }
  }, [status, session, router, callbackUrl]);

  // Don't render the form if user is authenticated or logging in
  if (status === 'authenticated' || isLoggingIn) {
    return null;
  }

  const onSubmit = async (formData: LoginSchema) => {
    try {
      setIsLoggingIn(true);

      const response = await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        redirect: false,
        csrfToken, // Include CSRF token
      });

      if (response?.error) {
        setIsLoggingIn(false);
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
        // Show success toast
        toast.success(t('loginSuccess'));
        // Keep isLoggingIn true - useEffect will handle redirect when session updates
      }
    } catch (error) {
      setIsLoggingIn(false);
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
        <h4 className="text-xl font-semibold text-center mb-4">{t('login')}</h4>

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
