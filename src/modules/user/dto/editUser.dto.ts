import { z } from 'zod';

export const editUserSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(2, 'Min 2 chars')
      .max(30, 'Max 30 chars')
      .optional(),
    firstName: z
      .string({ required_error: 'First name is required' })
      .min(2, 'Min 2 chars')
      .max(15, 'Max 15 chars')
      .optional(),
    lastName: z
      .string({ message: 'Last name is required' })
      .min(2, 'Min 2 chars')
      .max(15, 'Max 15 chars')
      .optional(),
    email: z
      .string({ message: 'Email is required' })
      .email('Wrong email')
      .optional(),
    state: z
      .enum(['male', 'female'], {
        message: 'State must be male or female',
      })
      .optional(),
    role: z
      .enum(['admin', 'user'], {
        message: 'Role must be admin or user',
      })
      .optional(),
  })
  .refine((data) => Object.keys(data).some((key) => data[key] !== undefined), {
    message: 'At least one field must be provided.',
    path: [],
  });

export type EditUserDto = z.infer<typeof editUserSchema>;
