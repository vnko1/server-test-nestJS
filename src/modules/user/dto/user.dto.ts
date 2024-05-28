import { z } from 'zod';

export const userSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(2, { message: 'Min 2 chars' })
    .max(30, 'Max 30 chars'),
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2, { message: 'Min 2 chars' })
    .max(15, 'Max 15 chars'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(2, { message: 'Min 2 chars' })
    .max(15, 'Max 15 chars'),
  email: z.string({ required_error: 'Email is required' }).email('Wrong email'),
  state: z.enum(['male', 'female'], {
    required_error: 'State must be male or female',
  }),
  role: z.enum(['admin', 'user'], {
    required_error: 'Role must be admin or user',
  }),
});

export type UserDto = z.infer<typeof userSchema>;
