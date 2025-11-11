import BackButton from '@/app/_components/back-button';
import EditDeleteContainer from '@/app/_components/edit-delete-container';
import Header from '@/app/_components/header';
import SellerInfo from '@/app/_components/seller-info';
import SpecItem from '@/app/_components/spec-item';
import { Button } from '@/app/_components/ui/button';
import { getMotorcycleById } from '@/app/_data-access/motorcycle/get-motorcycle-by-id';
import { getSellerById } from '@/app/_data-access/seller/get-seller-by-id';
import { formatCurrency } from '@/app/_helpers/currency';
import { auth } from '@/app/_lib/auth';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Params = { id: string };

const MotorcycleDetailsPage = async ({ params: { id } }: { params: Params }) => {
    const session = await auth();

    const motorcycle = await getMotorcycleById(id);
    if (!motorcycle) return notFound();

    const seller = await getSellerById(motorcycle.sellerId);
    if (!seller) return notFound();

    const isOwner = session?.user.id === seller.id;

    const title = `${motorcycle.brand} ${motorcycle.model}`;
    const price = formatCurrency(motorcycle.price);

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50">
            <Header searchBarExists={false} variant="black" />

            <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">
                <BackButton />
                <section className="mb-4 flex flex-col items-start justify-between gap-3 sm:mb-6 sm:flex-row sm:items-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                        {title}
                    </h1>

                    <div className="flex items-center gap-3">
                        <span
                            aria-label="Price"
                            className="rounded-2xl bg-emerald-50 px-4 py-2 text-2xl font-bold text-emerald-700 shadow-sm sm:text-3xl"
                        >
                            {price}
                        </span>

                        {isOwner && (
                            <EditDeleteContainer id={motorcycle.id} isCar={false} />
                        )}
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
                            <Image
                                src="/images/fallback.png"
                                alt={`${title} photo`}
                                fill
                                priority
                                className="object-cover transition-transform duration-300 ease-out hover:scale-[1.02]"
                                sizes="(max-width: 1024px) 100vw, 66vw"
                            />
                        </div>
                    </div>

                    <aside className="lg:sticky lg:top-6">
                        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-md sm:p-5">
                            <h2 className="mb-3 text-lg font-semibold text-gray-900">
                                Seller
                            </h2>
                            <SellerInfo seller={seller} />
                            <div className="mt-4 flex gap-2">
                                <a href="#about" className="w-full">
                                    <Button
                                        className="w-full rounded-xl"
                                        variant="default"
                                    >
                                        See details
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </aside>
                </section>

                <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-md sm:mt-8 sm:p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        Specs
                    </h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        <SpecItem label="Year" value={motorcycle.year} />
                        <SpecItem
                            label="Mileage"
                            value={motorcycle.mileage.toLocaleString()}
                        />
                        <SpecItem label="Condition" value={motorcycle.condition} />
                        <SpecItem label="CC" value={motorcycle.cc} />
                    </div>
                </section>

                <section
                    id="about"
                    className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-md sm:mt-8 sm:p-6"
                >
                    <h2 className="mb-3 text-lg font-semibold text-gray-900">
                        About this motorcycle
                    </h2>
                    <p className="whitespace-pre-line leading-relaxed text-gray-700">
                        {motorcycle.about || 'No additional information provided.'}
                    </p>
                </section>
            </main>
        </div>
    );
};

export default MotorcycleDetailsPage;
