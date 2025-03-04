import 'server-only';

import { db } from '@/app/_lib/prisma';

export const getMotorcycles = async () => {
    const motorcycles = await db.motorcycle.findMany();

    return motorcycles;
};
