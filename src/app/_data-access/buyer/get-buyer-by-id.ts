import { db } from '@/app/_lib/prisma';
import 'server-only';

export type BuyerResponseDTO = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
};

export const getBuyerById = async (id: string): Promise<BuyerResponseDTO | null> => {
    const buyer = await db.buyer.findUnique({
        where: { id },
        omit: {
            password: true,
        },
    });

    return buyer;
};
