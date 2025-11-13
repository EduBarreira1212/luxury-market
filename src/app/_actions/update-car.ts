'use server';

import { revalidatePath } from 'next/cache';

import { db } from '../_lib/prisma';
import { auth } from '../_lib/auth';
import { CarFormValues } from '../_schemas/car';
import { Prisma } from '@prisma/client';

export const updateCar = async (id: string, updateCarParams: CarFormValues) => {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }

    const { sellerId, ...carData } = updateCarParams;

    if (session.user.id !== sellerId) {
        throw new Error('Unauthorized');
    }

    try {
        const updatedCar = await db.car.update({
            where: { id, sellerId: session.user.id },
            data: carData,
        });

        revalidatePath('/my-ads');
        revalidatePath(`/cars/${id}`);

        return updatedCar;
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2025'
        ) {
            throw new Error('Ad not found');
        }
        throw err;
    }
};
