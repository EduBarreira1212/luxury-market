'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import { CarFormValues, carSchema } from '@/app/_schemas/car';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent, CardFooter } from '@/app/_components/ui/card';
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
import { Separator } from '@/app/_components/ui/separator';
import { Textarea } from '@/app/_components/ui/textarea';
import { updateCar } from '@/app/_actions/update-car';

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

type EditableCar = {
    id: string;
    sellerId: string;
    brand: string;
    model: string;
    year: number;
    mileage: number;
    condition: CarFormValues['condition'];
    price: number;
    fuel: CarFormValues['fuel'];
    gearbox: CarFormValues['gearbox'];
    about: string;
};

type EditCarAdFormProps = {
    car: EditableCar;
};

const EditCarAdForm = ({ car }: EditCarAdFormProps) => {
    const router = useRouter();

    const form = useForm<CarFormValues>({
        resolver: zodResolver(carSchema),
        mode: 'onChange',
        defaultValues: {
            sellerId: car.sellerId,
            brand: car.brand,
            model: car.model,
            year: car.year,
            mileage: car.mileage,
            condition: car.condition,
            price: car.price,
            fuel: car.fuel,
            gearbox: car.gearbox,
            about: car.about,
        },
        shouldFocusError: true,
    });

    const about = form.watch('about');

    const resetToOriginalValues = () => {
        form.reset({
            sellerId: car.sellerId,
            brand: car.brand,
            model: car.model,
            year: car.year,
            mileage: car.mileage,
            condition: car.condition,
            price: car.price,
            fuel: car.fuel,
            gearbox: car.gearbox,
            about: car.about,
        });
    };

    const onSubmit = async (values: CarFormValues) => {
        try {
            const updatedCar = await updateCar(car.id, values);
            if (updatedCar) {
                toast.success('Car ad updated successfully');
                router.push(`/cars/${car.id}`);
                router.refresh();
            }
        } catch (error) {
            console.error('Error when updating car ad', error);
            toast.error('Error when updating car ad');
        }
    };

    return (
        <Card>
            <CardContent className="space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                        <CardContent className="space-y-6 p-0">
                            <div className="space-y-4">
                                <div className="mt-2">
                                    <p className="text-sm font-semibold text-muted-foreground">
                                        Vehicle details
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Update any field to refresh your listing.
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
                                                    Choose how the car shifts gears.
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
                                Changes go live immediately after saving.
                            </p>
                            <div className="flex w-full justify-end gap-2 sm:w-auto">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetToOriginalValues}
                                    disabled={form.formState.isSubmitting}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Save changes
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default EditCarAdForm;
