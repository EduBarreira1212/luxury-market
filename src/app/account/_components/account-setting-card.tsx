'use client';

import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import React, { useState } from 'react';

type AccountSettingCardProps = {
    label: string;
    info: string;
    onSave: (newValue: string) => Promise<void>;
};

const AccountSettingCard = ({ label, info, onSave }: AccountSettingCardProps) => {
    const [updateIsOpen, setUpdateIsOpen] = useState(false);
    const [value, setValue] = useState('');

    const onSaveClick = async () => {
        try {
            await onSave(value);
            setUpdateIsOpen(false);
        } catch (error) {
            console.error('Failed to save:', error);
        }
    };

    return (
        <>
            {updateIsOpen ? (
                <div className="flex w-1/3 items-start justify-between gap-3 border-b-2 p-3">
                    <div className="flex flex-col gap-2">
                        <span className="text-xl">{label}</span>
                        <Label className="text-xl">
                            {label.split(' ')[1].charAt(0).toUpperCase() +
                                label.split(' ')[1].slice(1).toLowerCase()}
                        </Label>
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <Button
                            variant="default"
                            className="text-xl"
                            onClick={onSaveClick}
                        >
                            Save
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-xl"
                        onClick={() => setUpdateIsOpen(false)}
                    >
                        Cancel
                    </Button>
                </div>
            ) : (
                <div className="flex w-1/3 items-start justify-between gap-3 border-b-2 p-3">
                    <div className="flex flex-col gap-2">
                        <span className="text-xl">{label}</span>
                        <span className="text-xl">{info}</span>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-xl"
                        onClick={() => setUpdateIsOpen(true)}
                    >
                        Edit
                    </Button>
                </div>
            )}
        </>
    );
};

export default AccountSettingCard;
