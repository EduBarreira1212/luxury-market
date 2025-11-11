'use server';

import { revalidatePath } from 'next/cache';

import { db } from '../_lib/prisma';
import { auth } from '../_lib/auth';
import { MotorcycleFormValues } from '../_schemas/motorcycle';
import { Prisma } from '@prisma/client';

export const updateMotorcycle = async (
    id: string,
    updateMotorcycleParams: MotorcycleFormValues,
) => {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }

    const { sellerId, ...motorcycleData } = updateMotorcycleParams;

    if (session.user.id !== sellerId) {
        throw new Error('Unauthorized');
    }

    try {
        const updatedMotorcycle = await db.motorcycle.update({
            where: { id, sellerId: session.user.id },
            data: motorcycleData,
        });

        revalidatePath('/my-ads');
        revalidatePath(`/motorcycles/${id}`);

        return updatedMotorcycle;
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
