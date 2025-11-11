import EditCarAdForm from '../_components/edit-car-ad-form';
import EditMotorcycleAdForm from '../_components/edit-motorcycle-ad-form';
import { getCarById } from '@/app/_data-access/car/get-car-by-id';
import { getMotorcycleById } from '@/app/_data-access/motorcycle/get-motorcycle-by-id';
import { auth } from '@/app/_lib/auth';
import { notFound } from 'next/navigation';
import React from 'react';
import EditPageShell from '../_components/EditPageShell';

type EditAdPageProps = {
    params: { id: string };
};

const EditAdPage = async ({ params: { id } }: EditAdPageProps) => {
    const session = await auth();

    if (!session?.user?.id) return notFound();

    const car = await getCarById(id);

    if (car) {
        if (car.sellerId !== session.user.id) return notFound();

        const subtitle = `You're editing the ${car.brand} ${car.model} car listing.`;

        return (
            <EditPageShell title="Edit car ad" subtitle={subtitle}>
                <EditCarAdForm car={car} />
            </EditPageShell>
        );
    }

    const motorcycle = await getMotorcycleById(id);

    if (motorcycle) {
        if (motorcycle.sellerId !== session.user.id) return notFound();

        const subtitle = `You're editing the ${motorcycle.brand} ${motorcycle.model} motorcycle listing.`;

        return (
            <EditPageShell title="Edit motorcycle ad" subtitle={subtitle}>
                <EditMotorcycleAdForm motorcycle={motorcycle} />
            </EditPageShell>
        );
    }

    return notFound();
};

export default EditAdPage;
