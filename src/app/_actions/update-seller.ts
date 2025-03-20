'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../_lib/prisma';

type UpdateSellerParams = {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    about: string;
};

export const updateSeller = async (
    id: string,
    updateSellerParams: UpdateSellerParams,
) => {
    try {
        await db.seller.update({
            where: { id },
            data: updateSellerParams,
            omit: {
                password: true,
            },
        });

        revalidatePath('/account');
    } catch (error) {
        console.error('Error updating seller:', error);
        throw new Error('Failed to update seller.');
    }
};
