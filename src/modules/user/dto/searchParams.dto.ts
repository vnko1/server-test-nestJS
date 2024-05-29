import { z } from 'zod';

export const searchParamsSchema = z.object({
  role: z
    .enum(['admin', 'user'], { message: 'Role must be admin or user' })
    .optional(),
});

export type SearchParamsDto = z.infer<typeof searchParamsSchema>;
