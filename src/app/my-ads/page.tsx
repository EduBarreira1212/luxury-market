import { auth } from '../_lib/auth';
import Header from '../_components/header';
import { getSellerAds } from '../_data-access/seller/get-seller-ads';
import EmptyState from './_components/EmptyState';
import AdCard from './_components/AdCard';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const MyAdsPage = async () => {
    const session = await auth();

    if (!session) {
        return null;
    }

    const ads = await getSellerAds(session?.user.id);

    return (
        <div className="flex min-h-screen flex-col items-center gap-4 bg-gray-100">
            <Header searchBarExists={false} variant="black" />

            <main className="w-full max-w-6xl px-4 py-10">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">My Ads</h1>
                    <Link
                        href="/create-ad"
                        className="flex flex-row items-center gap-2 rounded-2xl bg-black px-4 py-2 text-white shadow hover:opacity-90"
                    >
                        <Plus size={20} />
                        <p className="text-lg">Create ad</p>
                    </Link>
                </div>

                {ads?.cars.length === 0 && ads?.motorcycles.length === 0 ? (
                    <EmptyState />
                ) : (
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {ads?.cars.map((ad) => (
                            <li key={ad.id}>
                                <AdCard ad={ad} />
                            </li>
                        ))}
                        {ads?.motorcycles.map((ad) => (
                            <li key={ad.id}>
                                <AdCard ad={ad} />
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
};

export default MyAdsPage;
