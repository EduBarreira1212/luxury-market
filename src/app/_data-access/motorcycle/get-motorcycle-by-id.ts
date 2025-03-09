import { db } from '@/app/_lib/prisma';
import 'server-only';

export const getMotorcycleById = async (id: string) => {
    const motorcycle = await db.motorcycle.findUnique({ where: { id } });

    return motorcycle;
};
