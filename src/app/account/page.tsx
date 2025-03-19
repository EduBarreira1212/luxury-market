import Header from '../_components/header';
import { getAccountById } from '../_data-access/account/get-account-by-id';
import { BuyerResponseDTO } from '../_data-access/buyer/get-buyer-by-id';
import { SellerResponseDTO } from '../_data-access/seller/get-seller-by-id';
import { auth } from '../_lib/auth';

function isSeller(
    accountData: SellerResponseDTO | BuyerResponseDTO,
): accountData is SellerResponseDTO {
    return 'about' in accountData;
}

const AccountPage = async () => {
    const session = await auth();

    if (!session?.user?.id) return null;

    const account = await getAccountById(session.user.id);

    if (!account?.data) return null;

    return (
        <div className="flex h-screen w-full flex-col items-center gap-4">
            <Header searchBarExists={false} variant="black" />
            <div className="flex w-full flex-col items-center gap-4 border-t-2 py-3">
                <h1 className="text-3xl">Account settings</h1>
                <span>{account?.type}</span>
                <span>{account?.data?.name}</span>
                <span>{account?.data?.email}</span>
                <span>{account?.data?.phoneNumber}</span>
                {isSeller(account?.data) && <span>{account?.data.about}</span>}
            </div>
        </div>
    );
};

export default AccountPage;
