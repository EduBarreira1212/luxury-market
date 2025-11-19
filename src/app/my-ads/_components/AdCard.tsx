import { Car, Motorcycle } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Ad = Car | Motorcycle;

const CDN = process.env.NEXT_PUBLIC_CLOUDFRONT_URL!;

const AdCard = ({ ad }: { ad: Ad }) => {
    const coverKey = ad.s3Keys[0];

    const getHref = (ad: Ad) => {
        if ('gearbox' in ad) {
            return `/cars/${ad.id}`;
        }

        return `/motorcycles/${ad.id}`;
    };

    return (
        <Link
            href={getHref(ad)}
            className="block overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
        >
            <div className="aspect-video w-full bg-gray-100">
                {coverKey ? (
                    <Image
                        src={`${CDN}/${coverKey}`}
                        alt={ad.model}
                        width={800}
                        height={450}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-500">
                        No image
                    </div>
                )}
            </div>

            <div className="space-y-1 p-4">
                <h3 className="line-clamp-1 text-lg font-semibold">
                    {ad.brand} {ad.model} {ad.year}
                </h3>
                <p className="text-sm text-gray-500">
                    {new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'medium',
                    }).format(new Date(ad.createdAt))}
                </p>
                <p className="text-base font-bold">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(ad.price)}
                </p>
            </div>
        </Link>
    );
};

export default AdCard;
