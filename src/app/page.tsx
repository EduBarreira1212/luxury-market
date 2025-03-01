import { MenuIcon, Car, Bike } from 'lucide-react';
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
                        <SheetContent side="left" className="w-60">
                            <SheetHeader>
                                <SheetTitle>Welcome!</SheetTitle>
                                <SheetDescription>
                                    Click on an option to see more
                                </SheetDescription>
                            </SheetHeader>

                            <div className="mt-3 border-t border-black pt-3">
                                <ul>
                                    <li className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            className="h-7 items-center gap-2 p-0 text-base"
                                        >
                                            <Car size={25} />
                                            <span>Cars</span>
                                        </Button>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            className="h-7 items-center gap-2 p-0 text-base"
                                        >
                                            <Bike size={25} />
                                            <span>Motorcycles</span>
                                        </Button>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-3 border-t border-black pt-3">
                                <ul>
                                    <li>About</li>
                                    <li>Contact</li>
                                </ul>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <span>Luxury Market</span>
                </div>
                <div></div>
            </div>
        </div>
    );
}
