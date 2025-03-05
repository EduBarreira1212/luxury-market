import Header from '@/app/_components/header';
import SellerInfo from '@/app/_components/seller-info';
import { getCarById } from '@/app/_data-access/car/get-car-by-id';
import { getSellerById } from '@/app/_data-access/seller/get-seller-by-id';
import { formatCurrency } from '@/app/_helpers/currency';
import Image from 'next/image';

type Params = {
    id: string;
};

const CarDetailsPage = async ({ params: { id } }: { params: Params }) => {
    const car = await getCarById(id);

    if (!car) return;

    const seller = await getSellerById(car.sellerId);

    if (!seller) return;

    return (
        <div className="flex w-full flex-col items-center gap-4 p-3">
            <Header searchBarExists={false} variant="black" />
            <div className="relative h-44 w-2/5">
                <Image
                    src="/images/fallback.png"
                    alt="car"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex w-2/5 flex-col gap-4">
                <div className="flex w-full justify-between">
                    <h1 className="text-2xl">
                        {car?.brand} {car?.model}
                    </h1>
                    <span className="text-2xl">{formatCurrency(car!.price)}</span>
                </div>
                <div className="flex gap-4 border-y-2 border-black py-3">
                    <div className="flex flex-col">
                        <span>{car?.year}</span>
                        <span className="text-slate-500">Year</span>
                    </div>
                    <div className="flex flex-col">
                        <span>{car?.mileage.toLocaleString()}</span>
                        <span className="text-slate-500">Mileage</span>
                    </div>
                    <div className="flex flex-col">
                        <span>{car?.condition}</span>
                        <span className="text-slate-500">Condition</span>
                    </div>
                    <div className="flex flex-col">
                        <span>{car?.gearbox}</span>
                        <span className="text-slate-500">Gearbox</span>
                    </div>
                    <div className="flex flex-col">
                        <span>{car?.fuel}</span>
                        <span className="text-slate-500">Fuel type</span>
                    </div>
                </div>
                <div>
                    <h2 className="mb-2 text-xl">About this car</h2>
                    <span>{car?.about}</span>
                </div>
                <SellerInfo seller={seller} />
            </div>
        </div>
    );
};

export default CarDetailsPage;
