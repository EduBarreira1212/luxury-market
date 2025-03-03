import { Car } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from './ui/card';
import { formatCurrency } from '../_helpers/currency';

type CarCardProps = {
    car: Car;
};

const CarCard = ({ car }: CarCardProps) => {
    return (
        <Link href="#">
            <Card className="flex h-80 w-80 flex-col rounded-sm">
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
                                {car.year} {car.model} {car.brand}
                            </span>
                            <span>{formatCurrency(car.price)}</span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default CarCard;
