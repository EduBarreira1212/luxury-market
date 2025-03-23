'use server';

import bcrypt from 'bcryptjs';
import { db } from '../_lib/prisma';
import { revalidatePath } from 'next/cache';

export const updateBuyerPassword = async (
    id: string,
    currentPassword: string,
    newPassword: string,
) => {
    try {
        const buyer = await db.buyer.findUnique({
            where: { id },
            select: { password: true },
        });

        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            String(buyer?.password),
        );

        if (!isPasswordCorrect) throw new Error('Password invalid');

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await db.buyer.update({
            where: { id },
            data: { password: hashedPassword },
        });

        revalidatePath('/account');
    } catch (error) {
        console.error('Error updating buyer password:', error);
        throw new Error('Failed to update buyer password.');
    }
};
