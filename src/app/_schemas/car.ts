import { z } from 'zod';

const conditionValues = ['NEW', 'USED'] as const;
const fuelTypeValues = [
    'GASOLINE',
    'ETHANOL',
    'FLEX',
    'DIESEL',
    'ELECTRIC',
    'HYBRID',
] as const;
const gearboxValues = ['MANUAL', 'AUTOMATIC'] as const;
const earliestCarYear = 1886;
const latestAllowedYear = new Date().getFullYear() + 1;

export const carSchema = z.object({
    sellerId: z.string().uuid('Invalid seller id'),
    brand: z.string().min(1, 'Brand is required'),
    model: z.string().min(1, 'Model is required'),
    year: z.coerce
        .number()
        .int('Year must be an integer')
        .min(earliestCarYear, `Year must be ${earliestCarYear} or newer`)
        .max(latestAllowedYear, 'Year cannot be in the far future'),
    mileage: z.coerce
        .number()
        .int('Mileage must be an integer')
        .min(0, 'Mileage cannot be negative'),
    condition: z.enum(conditionValues, {
        message: 'Condition must be NEW or USED',
    }),
    price: z.coerce.number().positive('Price must be greater than zero'),
    fuel: z.enum(fuelTypeValues, {
        message: 'Select a valid fuel type',
    }),
    gearbox: z.enum(gearboxValues, {
        message: 'Select a valid gearbox',
    }),
    about: z
        .string()
        .trim()
        .min(5, 'Minimum of 5 characters')
        .max(1000, 'Maximum of 1000 characters allowed'),
});

export type CarFormValues = z.infer<typeof carSchema>;
