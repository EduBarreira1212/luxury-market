import Header from '@/app/_components/header';
import BackButton from '@/app/_components/back-button';

type EditPageShellProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

const EditPageShell = ({ title, subtitle, children }: EditPageShellProps) => {
    return (
        <div className="min-h-screen">
            <Header searchBarExists={false} variant="black" />
            <div className="mx-auto w-full max-w-3xl px-4 py-8">
                <BackButton />
                <div className="mb-6 space-y-1">
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Edit listing
                    </p>
                    <h1 className="text-3xl font-semibold">{title}</h1>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>
                {children}
            </div>
        </div>
    );
};

export default EditPageShell;
