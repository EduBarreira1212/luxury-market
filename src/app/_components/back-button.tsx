'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/my-ads')}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
        </button>
    );
};

export default BackButton;
