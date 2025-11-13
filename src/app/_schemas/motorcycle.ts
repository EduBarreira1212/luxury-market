import { z } from 'zod';

const conditionValues = ['NEW', 'USED'] as const;
const earliestMotorcycleYear = 1885;
const latestAllowedYear = new Date().getFullYear() + 1;

export const motorcycleSchema = z.object({
    sellerId: z.string().uuid('Invalid seller id'),
    brand: z.string().min(1, 'Brand is required'),
    model: z.string().min(1, 'Model is required'),
    year: z.coerce
        .number()
        .int('Year must be an integer')
        .min(
            earliestMotorcycleYear,
            `Year must be ${earliestMotorcycleYear} or newer`,
        )
        .max(latestAllowedYear, 'Year cannot be in the far future'),
    mileage: z.coerce
        .number()
        .int('Mileage must be an integer')
        .min(0, 'Mileage cannot be negative'),
    condition: z.enum(conditionValues, {
        message: 'Condition must be NEW or USED',
    }),
    price: z.coerce.number().positive('Price must be greater than zero'),
    cc: z.coerce
        .number()
        .int('Engine displacement must be an integer')
        .min(50, 'Engine displacement must be at least 50cc'),
    about: z
        .string()
        .trim()
        .min(5, 'Minimum of 5 characters')
        .max(1000, 'Maximum of 1000 characters allowed'),
});

export type MotorcycleFormValues = z.infer<typeof motorcycleSchema>;
