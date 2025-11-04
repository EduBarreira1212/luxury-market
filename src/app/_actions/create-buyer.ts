'use server';

import bcrypt from 'bcryptjs';
import { db } from '../_lib/prisma';
import { SignUpBuyerFormValues } from '../_schemas/sign-up-buyer';

export const createBuyer = async (createBuyerParams: SignUpBuyerFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, confirmPassword: _, ...otherParams } = createBuyerParams;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        await db.buyer.create({
            data: { ...otherParams, password: hashedPassword },
        });
    } catch (error) {
        console.error('Error creating buyer:', error);
        throw new Error('Failed to create buyer.');
    }
};
