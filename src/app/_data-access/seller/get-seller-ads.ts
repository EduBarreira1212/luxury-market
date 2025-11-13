import { db } from '@/app/_lib/prisma';
import { Car, Motorcycle } from '@prisma/client';
import 'server-only';

export type SellerAdsResponseDTO = {
    cars: Car[];
    motorcycles: Motorcycle[];
};

export const getSellerAds = async (
    id: string,
): Promise<SellerAdsResponseDTO | null> => {
    const sellerAds = await db.seller.findUnique({
        where: { id },
        select: { cars: true, motorcycles: true },
    });

    if (!sellerAds) return null;

    return sellerAds;
};
