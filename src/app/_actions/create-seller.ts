'use server';

import bcrypt from 'bcryptjs';
import { db } from '../_lib/prisma';
import { SellerFormValues } from '../_schemas/seller';

export const createSeller = async (createSellerParams: SellerFormValues) => {
    const { password, ...otherParams } = createSellerParams;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        await db.seller.create({
            data: { ...otherParams, password: hashedPassword },
        });
    } catch (error) {
        console.error('Error creating seller:', error);
        throw new Error('Failed to create seller.');
    }
};
