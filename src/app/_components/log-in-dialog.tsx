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

const LogInDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="items-center rounded-xl text-base"
                >
                    <User2 size={18} />
                    Log in
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Log in</DialogTitle>
                </DialogHeader>
                <LogInForm />
            </DialogContent>
        </Dialog>
    );
};

export default LogInDialog;
