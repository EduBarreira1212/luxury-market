'use server';

import { db } from '../_lib/prisma';
import { CarFormValues } from '../_schemas/car';

export const createCar = async (createCarParams: CarFormValues) => {
    try {
        await db.car.create({
            data: createCarParams,
        });
    } catch (error) {
        console.error('Error creating car:', error);
        throw new Error('Failed to create car.');
    }
};
