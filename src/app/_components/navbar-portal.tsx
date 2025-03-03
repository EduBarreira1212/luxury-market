import { MenuIcon, Car, Bike } from 'lucide-react';
import { Button } from './ui/button';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from './ui/sheet';
import Link from 'next/link';

const NavbarPortal = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={'ghost'} className="px-0 text-white">
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
                                asChild
                            >
                                <Link href="/cars">
                                    <Car size={25} />
                                    <span>Cars</span>
                                </Link>
                            </Button>
                        </li>
                        <li className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                className="h-7 items-center gap-2 p-0 text-base"
                                asChild
                            >
                                <Link href="/motorcycles">
                                    <Bike size={25} />
                                    <span>Motorcycles</span>
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </div>
                <div className="mt-3 border-t border-black pt-3">
                    <ul>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default NavbarPortal;
