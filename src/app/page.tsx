import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from './_components/ui/sheet';
import { Button } from './_components/ui/button';

export default function Home() {
    return (
        <div className="flex h-screen w-screen flex-col items-center p-3">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant={'ghost'}>
                                <MenuIcon />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side={'left'}>
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove your
                                    data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    <span>Luxury Market</span>
                </div>
                <div></div>
            </div>
        </div>
    );
}
