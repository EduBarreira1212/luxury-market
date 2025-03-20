import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import LogInDialog from './log-in-dialog';
import { auth } from '../_lib/auth';
import AccountDropdown from './account-dropdown';

type HeaderRightProp = {
    textColor: 'black' | 'white';
};

const HeaderRight = async ({ textColor }: HeaderRightProp) => {
    const session = await auth();

    return (
        <div className="flex items-center gap-2">
            <Button variant="link" className={`text-base text-${textColor}`} asChild>
                <Link href="/seller">Sell with us</Link>
            </Button>
            {session?.user ? (
                <AccountDropdown
                    textColor={textColor}
                    username={session.user.name!}
                />
            ) : (
                <LogInDialog />
            )}
        </div>
    );
};

export default HeaderRight;
