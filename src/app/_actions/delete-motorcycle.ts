'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../_lib/prisma';

export const deleteMotorcycle = async (id: string) => {
    try {
        const motorcycle = await db.motorcycle.delete({
            where: { id },
        });

        revalidatePath('/my-ads');

        return motorcycle;
    } catch (error) {
        console.error('Error deleting motorcycle:', error);
        throw error;
    }
};
