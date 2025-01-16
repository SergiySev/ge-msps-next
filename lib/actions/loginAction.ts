'use server';

import { signIn } from 'next-auth/react';
import { actionClient } from '../safe-action';
import { loginSchema } from '../validation/login';

export const loginAction = actionClient.schema(loginSchema).action(async ({ parsedInput }) => {
  console.log('Login Action:', parsedInput);
  try {
    const { username, password } = parsedInput;

    const res = await signIn('Credentials', {
      username,
      password,
      redirect: false,
    });
    console.log('Login response:', res);

    // console.log('Login response:', res);

    // return res?.error ? { error: res.error } : null;

    return null;
  } catch (error) {
    console.error('Login Error!', error);
    // console.error('Login Error: ', error);
    // return { error };
    throw error;
  }
});
