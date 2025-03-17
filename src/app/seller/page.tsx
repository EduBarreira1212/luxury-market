import Header from '../_components/header';
import CreateSellerForm from './_components/create-seller-form';

const CreateSellerPage = () => {
    return (
        <div className="flex w-full flex-col items-center gap-4">
            <Header searchBarExists={false} variant="black" />
            <div className="flex w-full flex-col items-center gap-4 border-t-2 py-3">
                <h1 className="text-3xl">Create your seller account</h1>
                <CreateSellerForm />
            </div>
        </div>
    );
};

export default CreateSellerPage;
