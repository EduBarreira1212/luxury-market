'use server';

import { db } from '../_lib/prisma';
import { MotorcycleFormValues } from '../_schemas/motorcycle';

export const createMotorcycle = async (
    createMotorcycleParams: MotorcycleFormValues,
) => {
    try {
        const motorcycle = await db.motorcycle.create({
            data: createMotorcycleParams,
        });

        return motorcycle;
    } catch (error) {
        console.error('Error creating motorcycle:', error);
        throw error;
    }
};
