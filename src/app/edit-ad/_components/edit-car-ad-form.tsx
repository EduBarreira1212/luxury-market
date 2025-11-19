'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, X } from 'lucide-react';

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
import { Uploader } from '@/app/_components/Uploader';

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

const CDN = process.env.NEXT_PUBLIC_CLOUDFRONT_URL!;

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
    s3Keys: string[];
};

type EditCarAdFormProps = {
    car: EditableCar;
};

const EditCarAdForm = ({ car }: EditCarAdFormProps) => {
    const router = useRouter();

    const [existingPhotos, setExistingPhotos] = useState<string[]>(car.s3Keys ?? []);
    const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);

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
    const isSubmitting = form.formState.isSubmitting;

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
        setExistingPhotos(car.s3Keys ?? []);
        setPhotosToDelete([]);
        setNewFiles([]);
    };

    function togglePhotoToDelete(key: string) {
        setPhotosToDelete((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
        );
    }

    const onSubmit = async (values: CarFormValues) => {
        try {
            const updatedCar = await updateCar(car.id, values);

            if (!updatedCar) {
                throw new Error('Failed to update car');
            }

            for (const key of photosToDelete) {
                const res = await fetch(`/api/cars/${car.id}/photos/delete`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key }),
                });

                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    console.error('[EditCarAdForm] delete photo error:', data);
                } else {
                    setExistingPhotos((prev) => prev.filter((k) => k !== key));
                }
            }

            for (const file of newFiles) {
                const presignRes = await fetch('/api/uploads/presign', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        vehicleType: 'car',
                        vehicleId: car.id,
                        originalName: file.name,
                        contentType: file.type,
                        bytes: file.size,
                    }),
                });

                if (!presignRes.ok) {
                    const data = await presignRes.json().catch(() => ({}));
                    throw new Error(
                        data.error || 'Failed to generate upload URL (presign).',
                    );
                }

                const { url, key } = await presignRes.json();

                const uploadRes = await fetch(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': file.type },
                    body: file,
                });

                if (!uploadRes.ok) {
                    throw new Error('Failed to upload file to S3.');
                }

                const saveRes = await fetch(`/api/cars/${car.id}/photos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key }),
                });

                if (!saveRes.ok) {
                    const data = await saveRes.json().catch(() => ({}));
                    throw new Error(data.error || 'Failed to save car photo (DB).');
                }

                setExistingPhotos((prev) => [...prev, key]);
            }

            toast.success('Car ad updated successfully');
            setPhotosToDelete([]);
            setNewFiles([]);
            router.push(`/cars/${car.id}`);
            router.refresh();
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

                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-muted-foreground">
                                    Current photos
                                </p>
                                {existingPhotos.length === 0 ? (
                                    <p className="text-xs text-muted-foreground">
                                        This car has no photos yet.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                                        {existingPhotos.map((key) => {
                                            const marked =
                                                photosToDelete.includes(key);
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() =>
                                                        togglePhotoToDelete(key)
                                                    }
                                                    className={`relative h-20 overflow-hidden rounded-md border text-xs transition ${
                                                        marked
                                                            ? 'border-destructive ring-2 ring-destructive/60'
                                                            : 'border-border hover:border-primary/60'
                                                    }`}
                                                >
                                                    <div className="relative h-full w-full">
                                                        <Image
                                                            src={`${CDN}/${key}`}
                                                            alt="Car photo"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <span className="absolute right-1 top-1 z-10 rounded-full bg-black/60 p-1 text-[10px] text-white">
                                                        <X className="h-3 w-3" />
                                                    </span>
                                                    <span className="absolute bottom-1 left-1 z-10 rounded bg-black/60 px-1 py-0.5 text-[10px] text-white">
                                                        {marked
                                                            ? 'To delete'
                                                            : 'Keep'}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <Uploader
                                files={newFiles}
                                onFilesChange={setNewFiles}
                                disabled={isSubmitting}
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
                                    disabled={isSubmitting}
                                >
                                    Reset
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && (
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
