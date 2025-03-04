import 'server-only';

import { db } from '@/app/_lib/prisma';

export const getCars = async () => {
    const cars = await db.car.findMany();

    return cars;
};
