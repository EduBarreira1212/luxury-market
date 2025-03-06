import Header from '../_components/header';
import CreateSellerForm from './_components/create-seller-form';

const CreateSellerPage = () => {
    return (
        <div className="h-screen w-full">
            <Header searchBarExists={false} variant="black" />
            <CreateSellerForm />
        </div>
    );
};

export default CreateSellerPage;
