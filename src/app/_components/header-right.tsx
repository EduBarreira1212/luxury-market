import React from 'react';
import { Button } from './ui/button';
import { User2 } from 'lucide-react';

type HeaderRightProp = {
    textColor: 'black' | 'white';
};

const HeaderRight = ({ textColor }: HeaderRightProp) => {
    return (
        <div className="flex items-center gap-2">
            <Button variant="link" className={`text-base text-${textColor}`}>
                Sell with us
            </Button>
            <Button variant="outline" className="items-center rounded-xl text-base">
                <User2 size={18} />
                Log in
            </Button>
        </div>
    );
};

export default HeaderRight;
