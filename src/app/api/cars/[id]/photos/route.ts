import { NextResponse } from 'next/server';
import { db } from '@/app/_lib/prisma';
import { auth } from '@/app/_lib/auth';

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

    if (car.s3Keys.length >= 10) {
        return NextResponse.json(
            { error: 'Limit of 10 photos per vehicle' },
            { status: 400 },
        );
    }

    const updated = await db.car.update({
        where: { id: carId },
        data: {
            s3Keys: {
                push: key,
            },
        },
    });

    return NextResponse.json({ car: updated });
}
