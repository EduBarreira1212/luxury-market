'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from '@/app/_components/ui/form';

import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import React, { useState } from 'react';

const updatePasswordSchema = z
    .object({
        currentPassword: z.string(),
        newPassword: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .max(32, { message: 'Password must be no longer than 32 characters' })
            .regex(/[A-Z]/, {
                message: 'Password must contain at least one uppercase letter',
            })
            .regex(/[a-z]/, {
                message: 'Password must contain at least one lowercase letter',
            })
            .regex(/[0-9]/, { message: 'Password must contain at least one number' })
            .regex(/[\W_]/, {
                message: 'Password must contain at least one special character',
            }),
        passwordConfirmation: z.string(),
    })
    .superRefine((data, ctx) => {
        if (data.passwordConfirmation !== data.newPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['passwordConfirmation'],
                message: 'Passwords do not match',
            });
        }
    });

type AccountPasswordCardProps = {
    onSave: (currentPassword: string, newPassword: string) => Promise<void>;
};

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

const AccountPasswordUpdateForm = ({ onSave }: AccountPasswordCardProps) => {
    const [updateIsOpen, setUpdateIsOpen] = useState(false);

    const form = useForm<UpdatePasswordFormValues>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            passwordConfirmation: '',
        },
    });

    const onSubmit = async (values: UpdatePasswordFormValues) => {
        try {
            await onSave(values.currentPassword, values.newPassword);
            setUpdateIsOpen(false);
            toast.success('Password update with sucess');
        } catch (error) {
            console.error('Failed to save:', error);
            toast.error('Error updating password');
        }
    };

    return (
        <>
            {updateIsOpen ? (
                <div className="flex w-1/3 items-start justify-between gap-3 border-b-2 p-3">
                    <div className="flex flex-col gap-2">
                        <span className="text-xl">Your password</span>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex w-80 flex-col gap-3 rounded-md border-2 p-5 shadow-sm"
                            >
                                <FormField
                                    control={form.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current password</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="passwordConfirmation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Save</Button>
                            </form>
                        </Form>
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

export default AccountPasswordUpdateForm;
