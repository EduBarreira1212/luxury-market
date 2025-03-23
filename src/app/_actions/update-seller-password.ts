'use server';

import bcrypt from 'bcryptjs';
import { db } from '../_lib/prisma';
import { revalidatePath } from 'next/cache';

export const updateSellerPassword = async (
    id: string,
    currentPassword: string,
    newPassword: string,
) => {
    try {
        const seller = await db.seller.findUnique({
            where: { id },
            select: { password: true },
        });

        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            String(seller?.password),
        );

        if (!isPasswordCorrect) throw new Error('Password invalid');

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await db.seller.update({
            where: { id },
            data: { password: hashedPassword },
        });

        revalidatePath('/account');
    } catch (error) {
        console.error('Error updating seller password:', error);
        throw new Error('Failed to update seller password.');
    }
};
