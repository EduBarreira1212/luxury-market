'use client';

import { User2 } from 'lucide-react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import LogInForm from './log-in-form';
import { useState } from 'react';
import SignUpForm from './sign-up-form';

const LogInDialog = () => {
    const [open, setOpen] = useState(false);
    const [signUpMode, setSignUpMode] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="items-center rounded-xl text-base"
                    onClick={() => setOpen(true)}
                >
                    <User2 size={18} />
                    Sign in
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {signUpMode ? 'Sign up' : 'Sign in'}
                    </DialogTitle>
                </DialogHeader>
                {signUpMode ? (
                    <SignUpForm
                        onClose={() => setOpen(false)}
                        setSignUpMode={() => setSignUpMode(false)}
                    />
                ) : (
                    <LogInForm
                        onClose={() => setOpen(false)}
                        setSignUpMode={() => setSignUpMode(true)}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default LogInDialog;
