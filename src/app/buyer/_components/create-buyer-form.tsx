'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner';

import { Button } from '@/app/_components/ui/button';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { createBuyer } from '@/app/_actions/create-buyer';

const buyerSchema = z.object({
    name: z.string().min(3, 'The name must be at least 3 characters long'),
    email: z.string().email('Invalid email'),
    phoneNumber: z.string().min(10, 'Invalid phone number'),
});

export type BuyerFormValues = z.infer<typeof buyerSchema>;

const CreateBuyerForm = () => {
    const form = useForm<BuyerFormValues>({
        resolver: zodResolver(buyerSchema),
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
        },
    });

    const onSubmit = async (values: BuyerFormValues) => {
        console.log(values);
        try {
            await createBuyer(values);
            toast.success('Buyer account created with success');
        } catch (error) {
            console.error('Error when creating buyer account', error);
            toast.error('Error when creating buyer account');
        }
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-80 flex-col gap-3 rounded-md border-2 p-5 shadow-sm"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default CreateBuyerForm;
