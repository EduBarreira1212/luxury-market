'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import { createCar } from '@/app/_actions/create-car';
import { Button } from '@/app/_components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/app/_components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { Textarea } from '@/app/_components/ui/textarea';
import { Separator } from '@/app/_components/ui/separator';
import { CarFormValues, carSchema } from '@/app/_schemas/car';

const fuelOptions = [
    { value: 'GASOLINE', label: 'Gasoline' },
    { value: 'ETHANOL', label: 'Ethanol' },
    { value: 'FLEX', label: 'Flex' },
    { value: 'DIESEL', label: 'Diesel' },
    { value: 'ELECTRIC', label: 'Electric' },
    { value: 'HYBRID', label: 'Hybrid' },
] as const;

const gearboxOptions = [
    { value: 'MANUAL', label: 'Manual' },
    { value: 'AUTOMATIC', label: 'Automatic' },
] as const;

const conditionOptions = [
    { value: 'NEW', label: 'New' },
    { value: 'USED', label: 'Used' },
] as const;

const CreateCarAdForm = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const form = useForm<CarFormValues>({
        resolver: zodResolver(carSchema),
        mode: 'onChange',
        defaultValues: {
            sellerId: '',
            brand: '',
            model: '',
            year: new Date().getFullYear(),
            mileage: 0,
            condition: 'USED',
            price: 0,
            fuel: 'FLEX',
            gearbox: 'AUTOMATIC',
            about: '',
        },
        shouldFocusError: true,
    });

    const about = form.watch('about');

    const sellerIdFromSession = session?.user?.id;

    useEffect(() => {
        if (
            sellerIdFromSession &&
            form.getValues('sellerId') !== sellerIdFromSession
        ) {
            form.setValue('sellerId', sellerIdFromSession, {
                shouldValidate: true,
            });
        }
    }, [sellerIdFromSession, form]);

    const onSubmit = async (values: CarFormValues) => {
        try {
            const car = await createCar(values);
            if (car) {
                toast.success('Car ad created successfully');
                form.reset();
                router.push('/my-ads');
                router.refresh();
            }
        } catch (error) {
            console.error('Error when creating car ad', error);
            toast.error('Error when creating car ad');
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Car Ad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-semibold text-muted-foreground">
                                        Vehicle details
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        These fields populate the listing card.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="brand"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Brand</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        placeholder="e.g. Toyota"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="model"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Model</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        placeholder="e.g. Corolla"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="year"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Year</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        inputMode="numeric"
                                                        min={1885}
                                                        max={
                                                            new Date().getFullYear() +
                                                            1
                                                        }
                                                        placeholder="e.g. 2023"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Use the four-digit manufacture
                                                    year.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="mileage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mileage (km)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        inputMode="numeric"
                                                        min={0}
                                                        placeholder="e.g. 45,000"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem className="col-span-full mx-auto w-[300px]">
                                                <FormLabel className="block text-center">
                                                    Price (USD)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        inputMode="decimal"
                                                        min={0}
                                                        step="0.01"
                                                        placeholder="e.g. 10500"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="fuel"
                                        render={({ field }) => (
                                            <FormItem className="col-span-full">
                                                <FormLabel className="block text-center">
                                                    Fuel
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex justify-center gap-2">
                                                        {fuelOptions.map(
                                                            (option) => (
                                                                <Button
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    type="button"
                                                                    variant={
                                                                        field.value ===
                                                                        option.value
                                                                            ? 'default'
                                                                            : 'outline'
                                                                    }
                                                                    onClick={() =>
                                                                        field.onChange(
                                                                            option.value,
                                                                        )
                                                                    }
                                                                >
                                                                    {option.label}
                                                                </Button>
                                                            ),
                                                        )}
                                                    </div>
                                                </FormControl>
                                                <FormDescription className="text-center">
                                                    Select the car fuel type.
                                                </FormDescription>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="gearbox"
                                        render={({ field }) => (
                                            <FormItem className="col-span-full">
                                                <FormLabel className="block text-center">
                                                    Gearbox
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex justify-center gap-2">
                                                        {gearboxOptions.map(
                                                            (option) => (
                                                                <Button
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    type="button"
                                                                    variant={
                                                                        field.value ===
                                                                        option.value
                                                                            ? 'default'
                                                                            : 'outline'
                                                                    }
                                                                    onClick={() =>
                                                                        field.onChange(
                                                                            option.value,
                                                                        )
                                                                    }
                                                                >
                                                                    {option.label}
                                                                </Button>
                                                            ),
                                                        )}
                                                    </div>
                                                </FormControl>
                                                <FormDescription className="text-center">
                                                    Select the gearbox type.
                                                </FormDescription>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="condition"
                                        render={({ field }) => (
                                            <FormItem className="col-span-full">
                                                <FormLabel className="block text-center">
                                                    Condition
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex justify-center gap-2">
                                                        {conditionOptions.map(
                                                            (option) => (
                                                                <Button
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    type="button"
                                                                    variant={
                                                                        field.value ===
                                                                        option.value
                                                                            ? 'default'
                                                                            : 'outline'
                                                                    }
                                                                    onClick={() =>
                                                                        field.onChange(
                                                                            option.value,
                                                                        )
                                                                    }
                                                                >
                                                                    {option.label}
                                                                </Button>
                                                            ),
                                                        )}
                                                    </div>
                                                </FormControl>
                                                <FormDescription className="text-center">
                                                    Choose whether the car is new or
                                                    used.
                                                </FormDescription>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Separator />

                            <FormField
                                control={form.control}
                                name="about"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Highlights</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Textarea
                                                    {...field}
                                                    placeholder="Share service history, optional packages, recent maintenance, and selling points (max 1000 characters)."
                                                    className="min-h-[120px] resize-none"
                                                    maxLength={1000}
                                                />
                                                <span className="pointer-events-none absolute bottom-2 right-2 text-xs text-muted-foreground">
                                                    {about?.length ?? 0}/1000
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            This text appears inside the ad page.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>

                        <CardFooter className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-end">
                            <p className="text-sm text-muted-foreground">
                                By publishing you agree to our Terms &amp; Privacy
                                Policy.
                            </p>
                            <div className="flex w-full justify-end gap-2 sm:w-auto">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.reset()}
                                    disabled={form.formState.isSubmitting}
                                >
                                    Clear
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={
                                        form.formState.isSubmitting ||
                                        !sellerIdFromSession
                                    }
                                >
                                    {form.formState.isSubmitting && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Publish car
                                </Button>
                            </div>
                            {!sellerIdFromSession && (
                                <p className="text-sm text-destructive">
                                    Log in with a seller account to publish ads.
                                </p>
                            )}
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CreateCarAdForm;
