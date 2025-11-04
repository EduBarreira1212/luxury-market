'use client';

import * as React from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { SignInFormValues, signInSchema } from '../_schemas/signIn';

interface ILogInFormProps {
    onClose: () => void;
    setSignUpMode: () => void;
}

const LogInForm = ({ onClose, setSignUpMode }: ILogInFormProps) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const [capsLock, setCapsLock] = React.useState(false);

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const isSubmitting = form.formState.isSubmitting;

    const onSubmit = async (values: SignInFormValues) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (result?.error) {
                toast.error('E-mail or password invalid.');
                return;
            }

            toast.success('Welcome to Luxury Market');
            onClose();
            router.refresh();
        } catch (error) {
            console.error('Error when log in', error);
            toast.error('Error when log in');
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-96 max-w-full space-y-4 rounded-xl bg-background/50 p-6 shadow-sm backdrop-blur"
                noValidate
            >
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                        Access your account to continue.
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel className="flex items-center justify-between">
                                E-mail
                                {fieldState.error ? (
                                    <span className="text-xs font-medium text-destructive">
                                        {fieldState.error.message}
                                    </span>
                                ) : null}
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                        <Mail
                                            className="h-4 w-4 text-muted-foreground"
                                            aria-hidden
                                        />
                                    </span>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        inputMode="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        aria-invalid={!!fieldState.error}
                                        className="pl-9"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                                Use the e-mail linked to your account.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel className="flex items-center justify-between">
                                Password
                                {fieldState.error ? (
                                    <span className="text-xs font-medium text-destructive">
                                        {fieldState.error.message}
                                    </span>
                                ) : null}
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                        <Lock
                                            className="h-4 w-4 text-muted-foreground"
                                            aria-hidden
                                        />
                                    </span>

                                    <Input
                                        {...field}
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        aria-invalid={!!fieldState.error}
                                        className="pl-9 pr-10"
                                        disabled={isSubmitting}
                                        onKeyUp={(e) => {
                                            const caps =
                                                e.getModifierState?.('CapsLock');
                                            setCapsLock(!!caps);
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        className="absolute inset-y-0 right-2 grid place-items-center rounded-md p-2 hover:bg-muted"
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </button>
                                </div>
                            </FormControl>

                            <div className="flex items-start justify-between">
                                <FormDescription className="text-xs">
                                    8–32 chars, with upper, lower, number, and
                                    special.
                                </FormDescription>
                                {capsLock ? (
                                    <span
                                        role="status"
                                        aria-live="polite"
                                        className="text-xs font-medium text-amber-600"
                                    >
                                        Caps Lock is ON
                                    </span>
                                ) : null}
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-between">
                    <div />
                    <a
                        href="/forgot-password"
                        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Forgot password?
                    </a>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                >
                    {isSubmitting ? 'Signing in…' : 'Continue'}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                    By continuing you agree to our{' '}
                    <a
                        href="/terms"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Terms
                    </a>{' '}
                    and{' '}
                    <a
                        href="/privacy"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Privacy Policy
                    </a>
                    .
                </p>
                <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            or
                        </span>
                    </div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Don’t have an account?{' '}
                    <Button
                        className="font-medium text-primary underline-offset-4 hover:underline"
                        onClick={setSignUpMode}
                        variant="link"
                    >
                        Sign up
                    </Button>
                </p>
            </form>
        </Form>
    );
};

export default LogInForm;
