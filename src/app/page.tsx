import NavbarPortal from './_components/navbar-portal';
import { Button } from './_components/ui/button';
import { User2 } from 'lucide-react';
import CategoryCard from './_components/category-card';

export default function Home() {
    return (
        <>
            <div className="h-[85vh] w-full bg-black">
                <div className="flex h-full flex-col justify-between gap-4 py-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex w-full flex-row justify-between px-5">
                            <div className="flex items-center gap-3">
                                <NavbarPortal />
                                <h1 className="text-xl text-white">Luxury Market</h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="link"
                                    className="text-base text-white"
                                >
                                    Sell with us
                                </Button>
                                <Button
                                    variant="outline"
                                    className="items-center rounded-xl text-base"
                                >
                                    <User2 size={18} />
                                    Log in
                                </Button>
                            </div>
                        </div>
                        <div className="flex w-full border-y border-white py-2">
                            <ul className="flex flex-row gap-4 px-5 text-white">
                                <li>Cars</li>
                                <li>Motorcycles</li>
                            </ul>
                        </div>
                    </div>
                    <h1 className="w-30 px-5 text-2xl text-white">
                        The best marketplace to buy luxury
                    </h1>
                </div>
            </div>
            <div className="mt-3 flex w-full flex-col items-center px-5">
                <div className="flex w-full flex-col items-center gap-2">
                    <h2 className="text-3xl">Categories</h2>
                    <div className="flex gap-3">
                        <CategoryCard
                            href="/cars"
                            src="/images/car-category.jpg"
                            alt="car category"
                            title="Cars"
                        />
                        <CategoryCard
                            href="/motorcycles"
                            src="/images/motorcycle-category.jpg"
                            alt="motorcycle category"
                            title="Motorcycles"
                        />
                    </div>
                </div>
            </div>
            <footer></footer>
        </>
    );
}
