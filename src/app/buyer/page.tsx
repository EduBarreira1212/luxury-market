import Header from '../_components/header';
import CreateBuyerForm from './_components/create-buyer-form';

const CreateBuyerPage = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center gap-4">
            <Header searchBarExists={false} variant="black" />
            <div className="flex w-full flex-col items-center justify-between gap-4 border-t-2 py-3">
                <h1 className="text-3xl">Create your buyer account</h1>
                <CreateBuyerForm />
            </div>
        </div>
    );
};

export default CreateBuyerPage;
