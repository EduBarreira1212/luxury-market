'use server';

import { db } from '../_lib/prisma';

export const createCar = async (createCarParams: any) => {
    try {
        await db.car.create({
            data: createCarParams,
        });
    } catch (error) {
        console.error('Error creating car:', error);
        throw new Error('Failed to create car.');
    }
};
