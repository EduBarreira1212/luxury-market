import { Car, Motorcycle } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from './ui/card';
import { formatCurrency } from '../_helpers/currency';

type VehicleCardProps = {
    vehicle: Car | Motorcycle;
};

const carOrMotorcycle = (vehicle: Car | Motorcycle): vehicle is Car => {
    return (vehicle as Car).gearbox !== undefined;
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
    return (
        <Link
            href={`/${carOrMotorcycle(vehicle) ? 'cars' : 'motorcycles'}/${vehicle.id}`}
        >
            <Card className="flex h-80 w-96 flex-col rounded-sm">
                <CardContent className="relative h-full p-0">
                    <Image
                        src="/images/fallback.png"
                        alt="fallback"
                        fill
                        className="object-cover"
                    />
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
