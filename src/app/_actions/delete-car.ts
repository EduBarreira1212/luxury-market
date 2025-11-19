'use server';

import { auth } from '@/app/_lib/auth';
import { revalidatePath } from 'next/cache';
import { db } from '../_lib/prisma';
import { s3 } from '@/app/_lib/s3';
import { DeleteObjectsCommand } from '@aws-sdk/client-s3';

export const deleteCar = async (id: string) => {
    try {
        const session = await auth();
        const sellerId = session?.user?.id;

        if (!sellerId) {
            throw new Error('Not authenticated');
        }

        const car = await db.car.findUnique({
            where: { id },
        });

        if (!car) {
            throw new Error('Car not found');
        }

        if (car.sellerId !== sellerId) {
            throw new Error('Forbidden');
        }

        const keys = car.s3Keys || [];

        if (keys.length > 0) {
            try {
                await s3.send(
                    new DeleteObjectsCommand({
                        Bucket: process.env.S3_BUCKET!,
                        Delete: {
                            Objects: keys.map((key) => ({ Key: key })),
                            Quiet: true,
                        },
                    }),
                );
            } catch (err) {
                console.error('[deleteCar] Failed to delete S3 images:', err);
            }
        }

        const deleted = await db.car.delete({
            where: { id },
        });

        revalidatePath('/my-ads');

        return deleted;
    } catch (error) {
        console.error('Error deleting car:', error);
        throw error;
    }
};
