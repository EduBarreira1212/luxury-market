import { db } from '@/app/_lib/prisma';
import 'server-only';

export type SellerResponseDTO = {
    id: string;
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    about: string;
    createdAt: Date;
    updatedAt: Date;
};

export const getSellerById = async (
    id: string,
): Promise<SellerResponseDTO | null> => {
    const seller = await db.seller.findUnique({
        where: { id },
        omit: {
            password: true,
        },
    });

    return seller;
};
