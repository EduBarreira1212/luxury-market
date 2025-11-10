'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

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
import { Separator } from '@/app/_components/ui/separator';
import { Textarea } from '@/app/_components/ui/textarea';
import { MotorcycleFormValues, motorcycleSchema } from '@/app/_schemas/motorcycle';

const conditionOptions = [
    { value: 'NEW', label: 'New' },
    { value: 'USED', label: 'Used' },
] as const;

const CreateMotorcycleAdForm = () => {
    const form = useForm<MotorcycleFormValues>({
        resolver: zodResolver(motorcycleSchema),
        mode: 'onChange',
        defaultValues: {
            brand: '',
            model: '',
            year: new Date().getFullYear(),
            mileage: 0,
            condition: 'USED',
            price: 0,
            cc: 150,
            about: '',
        },
        shouldFocusError: true,
    });

    const about = form.watch('about');

    const onSubmit = async (values: MotorcycleFormValues) => {
        try {
            // TODO: replace with real create motorcycle action
            toast.success('Motorcycle ad created successfully');
            form.reset();
        } catch (error) {
            console.error('Error when creating motorcycle ad', error);
            toast.error('Error when creating motorcycle ad');
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Motorcycle Ad</CardTitle>
            </CardHeader>
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
                                                    placeholder="e.g. Honda"
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
                                                    placeholder="e.g. CB 500F"
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
                                                        new Date().getFullYear() + 1
                                                    }
                                                    placeholder="e.g. 2023"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Use the four-digit manufacture year.
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
                                                    placeholder="e.g. 12000"
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
                                        <FormItem>
                                            <FormLabel>Price (USD)</FormLabel>
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
                                    name="cc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Engine displacement (cc)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    inputMode="numeric"
                                                    min={50}
                                                    step={50}
                                                    placeholder="e.g. 500"
                                                />
                                            </FormControl>
                                            <FormMessage />
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
                                                                key={option.value}
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
                                                Choose whether the bike is new or
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
                                                placeholder="Share maintenance history, accessories, or selling points (max 1000 characters)."
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
                            By publishing you agree to our Terms & Privacy Policy.
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
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Publish motorcycle
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default CreateMotorcycleAdForm;
