const SpecItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="rounded-xl border border-gray-200 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-sm">
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-medium text-gray-900">{value}</div>
    </div>
);

export default SpecItem;
