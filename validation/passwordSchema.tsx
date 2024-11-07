import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(5, 'Password must containt at least 5 character')
  .max(50, 'Maximum 50 character');
