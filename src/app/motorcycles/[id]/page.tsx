import Header from '@/app/_components/header';
import { getMotorcycleById } from '@/app/_data-access/motorcycle/get-motorcycle-by-id';
import { getSellerById } from '@/app/_data-access/seller/get-seller-by-id';
import { formatCurrency } from '@/app/_helpers/currency';
import Image from 'next/image';

type Params = {
    id: string;
};

const MotorcycleDetailsPage = async ({ params: { id } }: { params: Params }) => {
    const motorcycle = await getMotorcycleById(id);

    if (!motorcycle) return;

    const seller = await getSellerById(motorcycle.sellerId);

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
                        {motorcycle?.brand} {motorcycle?.model}
                    </h1>
                    <span className="text-2xl">
                        {formatCurrency(motorcycle.price)}
                    </span>
                </div>
                <div className="flex gap-4 border-y-2 border-black py-3">
                    <div className="flex flex-col">
                        <span>{motorcycle?.year}</span>
                        <span className="text-slate-500">Year</span>
                    </div>
                    <div className="flex flex-col">
                        <span>{motorcycle?.mileage.toLocaleString()}</span>
                        <span className="text-slate-500">Mileage</span>
                    </div>
                    <div className="flex flex-col">
                        <span>{motorcycle?.condition}</span>
                        <span className="text-slate-500">Condition</span>
                    </div>
                    <div className="flex flex-col">
                        <span>{motorcycle?.cc}</span>
                        <span className="text-slate-500">CC</span>
                    </div>
                </div>
                <div>
                    <h2 className="mb-2 text-xl">About this motorcycle</h2>
                    <span>{motorcycle?.about}</span>
                </div>
                <div className="flex w-full flex-col gap-2 border-t-2 py-3 text-lg">
                    <h2 className="mb-2 text-xl">For sale by</h2>
                    <span className="text-lg">{seller?.name}</span>
                    <div className="flex flex-col">
                        <span className="text-slate-500">Adress</span>
                        <span>{seller?.adress}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500">E-mail</span>
                        <span>{seller?.email}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500">Phone number</span>
                        <span>{seller?.phoneNumber}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500">About</span>
                        <span>{seller?.about}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-500">Registred since:</span>
                        <span>{seller?.createdAt.getFullYear()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MotorcycleDetailsPage;
