import Link from 'next/link';
import NavbarPortal from '../_components/navbar-portal';
import { Input } from '../_components/ui/input';
import { getCars } from '../_data-access/car/get-cars';
import VehicleCard from '../_components/vehicle-card';
import HeaderRight from '../_components/header-right';

const CarsPage = async () => {
    const cars = await getCars();

    return (
        <>
            <div className="relative h-[85vh] w-full bg-[url('/images/lambo.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black bg-opacity-35"></div>
                <div className="relative flex h-full flex-col justify-between gap-4 py-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex w-full flex-row items-center justify-between px-5">
                            <div className="flex items-center gap-3">
                                <NavbarPortal />
                                <h1 className="text-xl text-white">Luxury Market</h1>
                            </div>
                            <Input
                                className="w-[35%] rounded-2xl"
                                placeholder="Search cars"
                            />
                            <HeaderRight />
                        </div>
                        <div className="flex w-full border-y border-white py-2">
                            <ul className="flex flex-row gap-4 px-5 text-white">
                                <li>
                                    <Link href="/cars">Cars</Link>
                                </li>
                                <li>
                                    <Link href="/motorcycles">Motorcycles</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h1 className="w-30 px-5 text-3xl text-white">Luxury cars</h1>
                </div>
            </div>
            <div className="my-3 flex min-h-[85vh] w-full flex-col items-center gap-3 p-5">
                <h2 className="text-3xl">All available</h2>
                <div className="flex w-full flex-wrap items-center justify-center gap-4">
                    {cars.map((car) => {
                        return <VehicleCard key={car.id} vehicle={car} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default CarsPage;
