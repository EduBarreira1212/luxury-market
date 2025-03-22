'use client';

import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import React, { useState } from 'react';

type AccountPasswordCardProps = {
    onSave: (currentPassword: string, newPassword: string) => Promise<void>;
};

const AccountPasswordCard = ({ onSave }: AccountPasswordCardProps) => {
    const [updateIsOpen, setUpdateIsOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const onSaveClick = async () => {
        try {
            await onSave(currentPassword, newPassword);
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
                        <span className="text-xl">Your password</span>
                        <Label>Current password</Label>
                        <Input
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <Label>New password</Label>
                        <Input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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
                        <span className="text-xl">Your password</span>
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

export default AccountPasswordCard;
