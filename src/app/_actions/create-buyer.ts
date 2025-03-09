'use server';

import { db } from '../_lib/prisma';
import { BuyerFormValues } from '../buyer/_components/create-buyer-form';

export const createBuyer = async (createBuyerParams: BuyerFormValues) => {
    try {
        await db.buyer.create({ data: createBuyerParams });
    } catch (error) {
        console.error('Error creating buyer:', error);
        throw new Error('Failed to create buyer.');
    }
};
