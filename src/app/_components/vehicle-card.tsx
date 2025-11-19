import { Car, Motorcycle } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from './ui/card';
import { formatCurrency } from '../_helpers/currency';

type VehicleCardProps = {
    vehicle: Car | Motorcycle;
};

const CDN = process.env.NEXT_PUBLIC_CLOUDFRONT_URL!;

const carOrMotorcycle = (vehicle: Car | Motorcycle): vehicle is Car => {
    return (vehicle as Car).gearbox !== undefined;
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
    const coverKey = vehicle.s3Keys[0];
    return (
        <Link
            href={`/${carOrMotorcycle(vehicle) ? 'cars' : 'motorcycles'}/${vehicle.id}`}
        >
            <Card className="flex h-80 w-96 flex-col rounded-sm">
                <CardContent className="relative h-full p-0">
                    {coverKey ? (
                        <Image
                            src={`${CDN}/${coverKey}`}
                            alt={vehicle.model}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 700px, 100vw"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                            No photos available.
                        </div>
                    )}
                </CardContent>
                <CardFooter className="bg-slate-50 p-3">
                    <div>
                        <div className="flex flex-col gap-2">
                            <span>
                                {vehicle.year} {vehicle.model} {vehicle.brand}
                            </span>
                            <span>{formatCurrency(vehicle.price)}</span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default VehicleCard;
