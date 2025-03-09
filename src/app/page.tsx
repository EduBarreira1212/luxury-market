import CategoryCard from './_components/category-card';
import Link from 'next/link';
import ImagesCarousel from './_components/images-carousel';
import Header from './_components/header';

export default function Home() {
    return (
        <>
            <div className="relative h-[85vh] w-full">
                <ImagesCarousel />
                <div className="absolute inset-0 z-10 bg-black bg-opacity-30"></div>
                <div className="absolute inset-0 z-20 flex h-full flex-col justify-between gap-4">
                    <div className="flex flex-col gap-3">
                        <Header searchBarExists={false} variant="white" />
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
                    <h1 className="w-30 px-5 text-3xl text-white">
                        The best marketplace to buy luxury
                    </h1>
                </div>
            </div>
            <div className="my-3 flex w-full flex-col items-center px-5">
                <div className="flex w-full flex-col items-center gap-2">
                    <h2 className="text-3xl">Categories</h2>
                    <div className="flex w-full flex-wrap justify-center gap-3">
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
        </>
    );
}
