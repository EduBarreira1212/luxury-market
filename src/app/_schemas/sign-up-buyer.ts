import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const signUpBuyerSchema = z
    .object({
        name: z.string().min(3, 'The name must be at least 3 characters long'),
        email: z.string().email('Invalid email'),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .max(32, { message: 'Password must be no longer than 32 characters' })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            })
            .regex(/[a-z]/, {
                message: 'Password must contain at least one lowercase letter',
            })
            .regex(/[0-9]/, { message: 'Password must contain at least one number' })
            .regex(/[\W_]/, {
                message: 'Password must contain at least one special character',
            }),
        confirmPassword: z.string(),
        phoneNumber: z
            .string({ required_error: 'Phone number is required' })
            .refine((v) => isValidPhoneNumber(v || ''), {
                message: 'Invalid phone number',
            }),
    })
    .refine((vals) => vals.password === vals.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

export type SignUpBuyerFormValues = z.infer<typeof signUpBuyerSchema>;
