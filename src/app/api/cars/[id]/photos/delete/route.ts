import { NextResponse } from 'next/server';
import { db } from '@/app/_lib/prisma';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '@/app/_lib/s3';
import { auth } from '@/app/_lib/auth';

export const runtime = 'nodejs';

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const carId = (await params).id;
    const { key } = await req.json();

    if (!key) {
        return NextResponse.json({ error: 'key is required' }, { status: 400 });
    }

    const session = await auth();
    const sellerId = session?.user?.id;

    if (!sellerId) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const car = await db.car.findUnique({
        where: { id: carId },
    });

    if (!car) {
        return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    if (car.sellerId !== sellerId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!car.s3Keys.includes(key)) {
        return NextResponse.json(
            { error: 'This image does not belong to this vehicle' },
            { status: 400 },
        );
    }

    const newKeys = car.s3Keys.filter((k) => k !== key);

    const updated = await db.car.update({
        where: { id: carId },
        data: {
            s3Keys: newKeys,
        },
    });

    try {
        await s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.S3_BUCKET!,
                Key: key,
            }),
        );
    } catch (e) {
        console.error('Failed to delete from S3', e);
    }

    return NextResponse.json({ car: updated });
}
