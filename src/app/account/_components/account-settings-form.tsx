'use client';

import AccountSettingCard from './account-setting-card';
import { BuyerResponseDTO } from '../../_data-access/buyer/get-buyer-by-id';
import { SellerResponseDTO } from '../../_data-access/seller/get-seller-by-id';
import { updateSeller } from '@/app/_actions/update-seller';
import { updateBuyer } from '@/app/_actions/update-buyer';
import AccountPasswordCard from './account-password-card';
import { updateSellerPassword } from '@/app/_actions/update-seller-password';
import { updateBuyerPassword } from '@/app/_actions/update-buyer-password';

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
    const handleUpdate = async (field: string, value: string) => {
        if (accountType === 'seller' && 'about' in accountData) {
            await updateSeller(id, {
                ...accountData,
                [field]: value,
            });
        }
        await updateBuyer(id, {
            ...accountData,
            [field]: value,
        });
    };

    const handlePasswordUpdate = async (
        currentPassword: string,
        newPassword: string,
    ) => {
        if (accountType === 'seller') {
            await updateSellerPassword(id, currentPassword, newPassword);
        }

        await updateBuyerPassword(id, currentPassword, newPassword);
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
            <AccountPasswordCard
                onSave={(currentPassword, newPassword) =>
                    handlePasswordUpdate(currentPassword, newPassword)
                }
            />
        </div>
    );
};

export default AccountSettingsForm;
