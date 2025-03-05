import { db } from '@/app/_lib/prisma';
import 'server-only';

export const getSellerById = async (id: string) => {
    const seller = await db.seller.findUnique({ where: { id } });

    return seller;
};
