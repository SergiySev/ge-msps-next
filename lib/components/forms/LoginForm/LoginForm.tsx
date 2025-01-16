'use client';

import { ControlledInput } from '../../controlled-form-components';
import clsx from 'clsx';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Button } from '@nextui-org/react';
import { loginSchema, LoginSchema } from 'msps/lib/validation/login';
import { loginAction } from 'msps/lib/actions/loginAction';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface LoginFormProps {
  data: LoginSchema;
  className?: string;
}

const LoginForm = ({ data, className }: LoginFormProps) => {
  const schema = loginSchema;

  const t = useTranslations();
  const router = useRouter();

  const {
    form: {
      control,
      formState: { isSubmitting, isValid },
      getValues,
    },
    handleSubmitWithAction,
  } = useHookFormAction(
    async formValues => {
      return loginAction(formValues);
    },
    zodResolver(schema),
    {
      formProps: {
        mode: 'all',
        defaultValues: {
          ...data,
          username: 'testtest',
          password: '123456',
        },
      },
      actionProps: {
        onSuccess: () => {
          console.log('Success!');
          // router.push('/');
          // toast.success('შეფასება შენახულია!');
        },
        onError: ({ error }) => {
          console.error('Error:', error);
          // toast.error(`შეცდომა: ${error.serverError || ''}`);
        },
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = getValues();
    console.log('formData:', formData);

    try {
      const response = await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (response?.error) {
      } else {
        /* router.push("/dashboard");
          router.refresh(); */
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form
      /* onSubmit={handleSubmitWithAction} */
      onSubmit={handleSubmit}
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
