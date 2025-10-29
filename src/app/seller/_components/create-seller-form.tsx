'use client';

import * as React from 'react';
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
    FormDescription,
} from '@/app/_components/ui/form';
import { Textarea } from '@/app/_components/ui/textarea';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/app/_components/ui/card';
import { Separator } from '@/app/_components/ui/separator';
import { Progress } from '@/app/_components/ui/progress';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/app/_components/ui/tooltip';
import { createSeller } from '@/app/_actions/create-seller';
import { toast } from 'sonner';
import {
    Mail,
    Building2,
    Phone,
    MapPin,
    Eye,
    EyeOff,
    Lock,
    Info,
    Loader2,
} from 'lucide-react';

const sellerSchema = z.object({
    name: z.string().min(3, 'The name must be at least 3 characters long'),
    email: z.string().email('Invalid email'),
    password: z
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
    address: z.string().min(5, 'Address is too short'),
    phoneNumber: z.string().min(10, 'Invalid phone number'),
    about: z
        .string()
        .trim()
        .min(5, 'Minimum of 5 characters')
        .max(500, 'Maximum of 500 characters allowed'),
});

export type SellerFormValues = z.infer<typeof sellerSchema>;

function formatBrazilPhone(value: string) {
    // Keep only digits
    const digits = value.replace(/\D/g, '');
    // (99) 99999-9999 or (99) 9999-9999
    if (digits.length <= 10) {
        return digits
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .slice(0, 14);
    }
    // 11+ digits -> mobile pattern
    return digits
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
}

function passwordStrength(pw: string) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[\W_]/.test(pw)) score++;
    const percent = (score / 5) * 100;
    const label = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Strong'][score];
    return { score, percent, label } as const;
}

export default function CreateSellerForm() {
    const form = useForm<SellerFormValues>({
        resolver: zodResolver(sellerSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            address: '',
            about: '',
        },
        shouldFocusError: true,
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const about = form.watch('about');
    const password = form.watch('password');
    const { percent, label } = passwordStrength(password ?? '');

    const onSubmit = async (values: SellerFormValues) => {
        try {
            await createSeller(values);
            toast.success('Seller account created successfully');
            form.reset();
        } catch (error) {
            console.error('Error when creating seller account', error);
            toast.error('Error when creating seller account');
        }
    };

    return (
        <TooltipProvider delayDuration={150}>
            <Card className="mx-auto w-full max-w-2xl border-2 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        Create seller <span className="sr-only">account</span>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="h-5 w-5 opacity-60" />
                            </TooltipTrigger>
                            <TooltipContent>
                                Fill in your company information to create a seller
                                account.
                            </TooltipContent>
                        </Tooltip>
                    </CardTitle>
                    <CardDescription>
                        We’ll use this info to set up your storefront and contact
                        details.
                    </CardDescription>
                </CardHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company name</FormLabel>
                                            <div className="relative">
                                                <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        autoComplete="organization"
                                                        placeholder="ex: NovaTech Comércio LTDA"
                                                        className="pl-9"
                                                        autoFocus
                                                    />
                                                </FormControl>
                                            </div>
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
                                            <div className="relative">
                                                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        inputMode="email"
                                                        autoComplete="email"
                                                        placeholder="you@company.com"
                                                        className="pl-9"
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormDescription>
                                                We’ll send confirmations to this
                                                address.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Password</FormLabel>
                                            <div className="relative">
                                                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type={
                                                            showPassword
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        autoComplete="new-password"
                                                        placeholder="At least 8 chars, use Aa1!"
                                                        className="pl-9 pr-10"
                                                    />
                                                </FormControl>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-1 top-1/2 -translate-y-1/2"
                                                    onClick={() =>
                                                        setShowPassword((s) => !s)
                                                    }
                                                    aria-label={
                                                        showPassword
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                            <div className="space-y-2">
                                                <Progress
                                                    value={percent}
                                                    className="h-2"
                                                    aria-label="Password strength"
                                                />
                                                <div className="text-xs text-muted-foreground">
                                                    Strength: {label}
                                                </div>
                                                <FormDescription>
                                                    Use 8–32 characters with
                                                    uppercase, lowercase, number, and
                                                    symbol.
                                                </FormDescription>
                                            </div>
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
                                            <div className="relative">
                                                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="tel"
                                                        inputMode="tel"
                                                        autoComplete="tel"
                                                        placeholder="(11) 99999-9999"
                                                        className="pl-9"
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                formatBrazilPhone(
                                                                    e.target.value,
                                                                ),
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormDescription>
                                                Brazil format is supported
                                                automatically.
                                            </FormDescription>
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
                                            <div className="relative">
                                                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        autoComplete="street-address"
                                                        placeholder="Street Exemple, 123 - Center, Miami - FL"
                                                        className="pl-9"
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="about"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>About</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Tell us a little about your company (what you sell, city of operation, service area, differentiators)"
                                                        className="min-h-[120px] resize-none"
                                                        maxLength={500}
                                                    />
                                                    <div className="pointer-events-none absolute bottom-2 right-2 text-xs text-muted-foreground">
                                                        {about?.length ?? 0}/500
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                Short and clear helps customers
                                                understand you faster.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    By continuing you agree to our Terms & Privacy
                                    Policy.
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        type="reset"
                                        variant="ghost"
                                        onClick={() => form.reset()}
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
                                        Create account
                                    </Button>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter />
                    </form>
                </Form>
            </Card>
        </TooltipProvider>
    );
}
