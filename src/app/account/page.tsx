import Header from '../_components/header';
import { getAccountById } from '../_data-access/account/get-account-by-id';
import { auth } from '../_lib/auth';
import AccountSettingsForm from './_components/account-settings-form';

const AccountPage = async () => {
    const session = await auth();

    if (!session?.user?.id) return null;

    const account = await getAccountById(session.user.id);

    if (!account?.data) return null;

    return (
        <div className="flex h-screen w-full flex-col items-center gap-4">
            <Header searchBarExists={false} variant="black" />
            <AccountSettingsForm
                id={session.user.id}
                accountData={account.data}
                accountType={account.type}
            />
        </div>
    );
};

export default AccountPage;
