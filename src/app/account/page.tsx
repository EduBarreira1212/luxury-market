import Header from '../_components/header';
import { getAccountById } from '../_data-access/account/get-account-by-id';
import { BuyerResponseDTO } from '../_data-access/buyer/get-buyer-by-id';
import { SellerResponseDTO } from '../_data-access/seller/get-seller-by-id';
import { auth } from '../_lib/auth';
import AccountSettingCard from './_components/account-setting-card';

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
            <div className="flex w-full flex-col items-center gap-4 overflow-auto border-t-2 py-3">
                <h1 className="text-3xl">Account settings</h1>
                <span className="text-xl">Account type: {account?.type}</span>
                <AccountSettingCard label="Your name" info={account.data.name} />
                <AccountSettingCard label="Your E-mail" info={account.data.email} />
                <AccountSettingCard
                    label="Your phone number"
                    info={account.data.phoneNumber}
                />
                {isSeller(account?.data) && (
                    <>
                        <AccountSettingCard
                            label="Your about"
                            info={account.data.about}
                        />
                        <AccountSettingCard
                            label="Your address"
                            info={account.data.address}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountPage;
