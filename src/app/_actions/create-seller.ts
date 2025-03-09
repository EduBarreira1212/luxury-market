'use server';

import { db } from '../_lib/prisma';
import { SellerFormValues } from '../seller/_components/create-seller-form';

export const createSeller = async (createSellerParams: SellerFormValues) => {
    try {
        await db.seller.create({ data: createSellerParams });
    } catch (error) {
        console.error('Error creating seller:', error);
        throw new Error('Failed to create seller.');
    }
};
