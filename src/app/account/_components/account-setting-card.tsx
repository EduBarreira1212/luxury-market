import { Button } from '@/app/_components/ui/button';
import React from 'react';

type AccountSettingCardProps = {
    label: string;
    info: string;
};

const AccountSettingCard = ({ label, info }: AccountSettingCardProps) => {
    return (
        <div className="flex w-1/3 items-center justify-between gap-3 border-b-2 p-3">
            <div className="flex flex-col gap-2">
                <span className="text-xl">{label}</span>
                <span className="text-xl">{info}</span>
            </div>
            <Button variant="ghost" className="text-xl">
                Edit
            </Button>
        </div>
    );
};

export default AccountSettingCard;
