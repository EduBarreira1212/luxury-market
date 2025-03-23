'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../_lib/prisma';

type UpdateBuyerParams = {
    name: string;
    email: string;
    phoneNumber: string;
};

export const updateBuyer = async (
    id: string,
    updateBuyerParams: UpdateBuyerParams,
) => {
    try {
        await db.buyer.update({
            where: { id },
            data: updateBuyerParams,
            omit: {
                password: true,
            },
        });

        revalidatePath('/account');
    } catch (error) {
        console.error('Error updating buyer:', error);
        throw new Error('Failed to update buyer.');
    }
};
