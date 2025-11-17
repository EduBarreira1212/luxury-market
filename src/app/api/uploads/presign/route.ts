import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3 } from '@/app/_lib/s3';
import { db } from '@/app/_lib/prisma';
import { auth } from '@/app/_lib/auth';

export const runtime = 'nodejs';

const ALLOWED_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
]);

const MAX_BYTES = parseInt(process.env.MAX_UPLOAD_MB || '10', 10) * 1024 * 1024;

function sanitizeSegment(s: string) {
    return s.replace(/[^a-zA-Z0-9/_-]/g, '');
}

type VehicleType = 'car' | 'motorcycle';

type CarResult = Awaited<ReturnType<typeof db.car.findUnique>>;
type MotorcycleResult = Awaited<ReturnType<typeof db.motorcycle.findUnique>>;
type Vehicle = CarResult | MotorcycleResult;

export async function POST(req: Request) {
    try {
        const session = await auth();
        const sellerId = session?.user?.id;

        if (!sellerId) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 },
            );
        }

        const {
            vehicleType,
            vehicleId,
            originalName,
            contentType,
            bytes,
        }: {
            vehicleType: VehicleType;
            vehicleId: string;
            originalName: string;
            contentType: string;
            bytes: number;
        } = await req.json();

        if (!vehicleType || !vehicleId || !originalName || !contentType || !bytes) {
            return NextResponse.json(
                {
                    error: 'vehicleType, vehicleId, originalName, contentType, bytes required',
                },
                { status: 400 },
            );
        }

        if (!['car', 'motorcycle'].includes(vehicleType)) {
            return NextResponse.json(
                { error: 'Invalid vehicleType' },
                { status: 400 },
            );
        }

        if (!ALLOWED_TYPES.has(contentType)) {
            return NextResponse.json(
                { error: 'Unsupported file type' },
                { status: 415 },
            );
        }

        if (bytes > MAX_BYTES) {
            return NextResponse.json(
                {
                    error: `File too large. Max ${process.env.MAX_UPLOAD_MB}MB`,
                },
                { status: 413 },
            );
        }

        let vehicle: Vehicle;

        if (vehicleType === 'car') {
            vehicle = await db.car.findUnique({
                where: { id: vehicleId },
            });
        } else {
            vehicle = await db.motorcycle.findUnique({
                where: { id: vehicleId },
            });
        }

        if (!vehicle) {
            return NextResponse.json(
                { error: 'Vehicle not found' },
                { status: 404 },
            );
        }

        if (vehicle.sellerId !== sellerId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const ext = originalName.split('.').pop()?.toLowerCase() || 'jpg';
        const safeId = sanitizeSegment(String(vehicleId));

        const key = [
            process.env.NODE_ENV ?? 'dev',
            vehicleType === 'car' ? 'cars' : 'motorcycles',
            safeId,
            crypto.randomUUID() + '.' + ext,
        ].join('/');

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            Key: key,
            ContentType: contentType,
            CacheControl: 'public, max-age=31536000, immutable',
        });

        const url = await getSignedUrl(s3, command, { expiresIn: 60 });

        return NextResponse.json({ url, key });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: 'Failed to generate upload URL' },
            { status: 500 },
        );
    }
}
