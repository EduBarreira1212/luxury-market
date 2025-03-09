'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/app/_components/ui/form';
import { Textarea } from '@/app/_components/ui/textarea';
import { createSeller } from '@/app/_actions/create-seller';
import { toast } from 'sonner';

const sellerSchema = z.object({
    name: z.string().min(3, 'The name must be at least 3 characters long'),
    email: z.string().email('Invalid email'),
    address: z.string().min(5, 'Address is too short'),
    phoneNumber: z.string().min(10, 'Invalid phone number'),
    about: z
        .string()
        .trim()
        .min(5, 'Minimum of 5 characters')
        .max(500, 'Maximum of 500 characters allowed'),
});

export type SellerFormValues = z.infer<typeof sellerSchema>;

const CreateSellerForm = () => {
    const form = useForm<SellerFormValues>({
        resolver: zodResolver(sellerSchema),
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
            address: '',
            about: '',
        },
    });

    const onSubmit = async (values: SellerFormValues) => {
        console.log(values);
        try {
            await createSeller(values);
            toast.success('Seller account created with success');
        } catch (error) {
            console.error('Error when creating seller account', error);
            toast.error('Error when creating seller account');
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
                            <FormLabel>Company name</FormLabel>
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
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>About</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about your company"
                                    className="resize-none"
                                    {...field}
                                />
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

export default CreateSellerForm;
