import { NextResponse } from 'next/server';
import { db } from '@/app/_lib/prisma';
import { auth } from '@/app/_lib/auth';

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const motorcycleId = params.id;
    const { key } = await req.json();

    if (!key) {
        return NextResponse.json({ error: 'key is required' }, { status: 400 });
    }

    const session = await auth();
    const sellerId = session?.user?.id;

    if (!sellerId) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const motorcycle = await db.motorcycle.findUnique({
        where: { id: motorcycleId },
    });

    if (!motorcycle) {
        return NextResponse.json({ error: 'Motorcycle not found' }, { status: 404 });
    }

    if (motorcycle.sellerId !== sellerId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (motorcycle.s3Keys.length >= 10) {
        return NextResponse.json(
            { error: 'Limit of 10 photos per vehicle' },
            { status: 400 },
        );
    }

    const updated = await db.motorcycle.update({
        where: { id: motorcycleId },
        data: {
            s3Keys: {
                push: key,
            },
        },
    });

    return NextResponse.json({ motorcycle: updated });
}
