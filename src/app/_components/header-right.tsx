import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import LogInDialog from './log-in-dialog';

type HeaderRightProp = {
    textColor: 'black' | 'white';
};

const HeaderRight = ({ textColor }: HeaderRightProp) => {
    return (
        <div className="flex items-center gap-2">
            <Button variant="link" className={`text-base text-${textColor}`} asChild>
                <Link href="/seller">Sell with us</Link>
            </Button>
            <LogInDialog />
        </div>
    );
};

export default HeaderRight;
