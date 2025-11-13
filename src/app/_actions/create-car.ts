'use server';

import { db } from '../_lib/prisma';
import { CarFormValues } from '../_schemas/car';

export const createCar = async (createCarParams: CarFormValues) => {
    try {
        const car = await db.car.create({
            data: createCarParams,
        });

        return car;
    } catch (error) {
        console.error('Error creating car:', error);
        throw error;
    }
};
