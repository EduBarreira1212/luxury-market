import { db } from '@/app/_lib/prisma';
import 'server-only';

export const getCarById = async (id: string) => {
    const car = await db.car.findUnique({ where: { id } });

    return car;
};
