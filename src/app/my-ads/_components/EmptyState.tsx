const EmptyState = () => {
    return (
        <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
            <p className="mb-2 text-xl font-medium">Você ainda não tem anúncios</p>
            <p className="mb-6 text-gray-600">
                Crie seu primeiro anúncio para começar a vender.
            </p>
            <a
                href="/ads/new"
                className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-white shadow hover:opacity-90"
            >
                Criar anúncio
            </a>
        </div>
    );
};

export default EmptyState;
