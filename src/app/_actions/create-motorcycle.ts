'use server';

import { db } from '../_lib/prisma';
import { MotorcycleFormValues } from '../_schemas/motorcycle';

export const createMotorcycle = async (
    createMotorcycleParams: MotorcycleFormValues,
) => {
    try {
        await db.motorcycle.create({
            data: createMotorcycleParams,
        });
    } catch (error) {
        console.error('Error creating motorcycle:', error);
        throw new Error('Failed to create motorcycle.');
    }
};
