'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

type AccountDropdownProps = {
    textColor: string;
    username: string;
};

const AccountDropdown = ({ textColor, username }: AccountDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={`flex text-${textColor}`}>
                {username} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col items-center">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem className="w-full">
                    <Button
                        variant="ghost"
                        className="flex w-full items-center"
                        onClick={() => {
                            signOut();
                        }}
                    >
                        Sign out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AccountDropdown;
