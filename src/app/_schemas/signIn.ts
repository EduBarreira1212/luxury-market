import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z
        .string()
        .min(8, { message: 'At least 8 characters' })
        .max(32, { message: 'No more than 32 characters' })
        .regex(/[A-Z]/, { message: 'Include an uppercase letter (A–Z)' })
        .regex(/[a-z]/, { message: 'Include a lowercase letter (a–z)' })
        .regex(/[0-9]/, { message: 'Include a number (0–9)' })
        .regex(/[\W_]/, { message: 'Include a special character (!@#$…)' }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
