'use server';

import { db } from '../_lib/prisma';

export const createMotorcycle = async (createMotorcycleParams: any) => {
    try {
        await db.motorcycle.create({
            data: createMotorcycleParams,
        });
    } catch (error) {
        console.error('Error creating motorcycle:', error);
        throw new Error('Failed to create motorcycle.');
    }
};
