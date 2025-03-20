'use client';

import AccountSettingCard from './account-setting-card';
import { BuyerResponseDTO } from '../../_data-access/buyer/get-buyer-by-id';
import { SellerResponseDTO } from '../../_data-access/seller/get-seller-by-id';
import { updateSeller } from '@/app/_actions/update-seller';
import { useRouter } from 'next/navigation';

type AccountSettingsFormProps = {
    id: string;
    accountData: BuyerResponseDTO | SellerResponseDTO;
    accountType: string;
};

const AccountSettingsForm = ({
    id,
    accountData,
    accountType,
}: AccountSettingsFormProps) => {
    const router = useRouter();

    const handleUpdate = async (field: string, value: string) => {
        if (accountType === 'seller') {
            await updateSeller(id, {
                ...accountData,
                [field]: value,
            } as any);
        }
        // TODO: Implement updateBuyer if needed

        router.refresh();
    };

    return (
        <div className="flex w-full flex-col items-center gap-4 overflow-auto border-t-2 py-3">
            <h1 className="text-3xl">Account settings</h1>
            <span className="text-xl">Account type: {accountType}</span>
            <AccountSettingCard
                label="Your name"
                info={accountData.name}
                onSave={(value) => handleUpdate('name', value)}
            />
            <AccountSettingCard
                label="Your E-mail"
                info={accountData.email}
                onSave={(value) => handleUpdate('email', value)}
            />
            <AccountSettingCard
                label="Your phone number"
                info={accountData.phoneNumber}
                onSave={(value) => handleUpdate('phoneNumber', value)}
            />
            {'about' in accountData && (
                <>
                    <AccountSettingCard
                        label="Your about"
                        info={accountData.about}
                        onSave={(value) => handleUpdate('about', value)}
                    />
                    <AccountSettingCard
                        label="Your address"
                        info={accountData.address}
                        onSave={(value) => handleUpdate('address', value)}
                    />
                </>
            )}
        </div>
    );
};

export default AccountSettingsForm;
