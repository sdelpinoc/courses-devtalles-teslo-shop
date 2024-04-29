'use server'

import { AuthError } from 'next-auth';

import { signIn } from '@/auth.config';
// import { sleep } from '@/utils/sleep';

export async function authenticate (
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // console.log(Object.fromEntries(formData))
    // await sleep(2)
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    });

    // This will our ok message
    return 'Success'
  } catch (error) {
    // this catch still will throw a error([auth][error])
    // console.log({ error })
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        // case "AccessDenied":
        //   throw error;
        default:
          return 'Something went wrong.';
      }
    }

    throw error;
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password, redirect: false })

    return {
      ok: true
    }
  } catch (error) {
    console.log({ error })
    return {
      ok: false,
      message: 'Failed to log in'
    }
  }
}