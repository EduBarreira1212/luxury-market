'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../_lib/prisma';

export const deleteCar = async (id: string) => {
    try {
        const car = await db.car.delete({
            where: { id },
        });

        revalidatePath('/my-ads');

        return car;
    } catch (error) {
        console.error('Error deleting car:', error);
        throw error;
    }
};
