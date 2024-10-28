'use server';

import { z } from 'zod';
import { passwordMatchSchema } from '@/validation/passwordMatchSchema';
import { error } from 'console';

type RegisterUserInput = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: RegisterUserInput) => {
  const newUserSchema = z
    .object({
      email: z.string().email(),
    })
    .and(passwordMatchSchema);

  const newUserValidation = newUserSchema.safeParse({
    email,
    password,
    passwordConfirm,
  });

  if (!newUserValidation.success) {
    return {
      error: true,
      message:
        newUserValidation.error?.issues[0]?.message ?? 'An Error occured',
    };
  }
};
