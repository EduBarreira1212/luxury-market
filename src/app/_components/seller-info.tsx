import { Seller } from '@prisma/client';
import React from 'react';

type SellerInfoProps = {
    seller: Seller;
};

const SellerInfo = ({ seller }: SellerInfoProps) => {
    return (
        <div className="flex w-full flex-col gap-2 border-t-2 py-3 text-lg">
            <h2 className="mb-2 text-xl">For sale by</h2>
            <span className="text-lg">{seller?.name}</span>
            <div className="flex flex-col">
                <span className="text-slate-500">Adress</span>
                <span>{seller?.adress}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-slate-500">E-mail</span>
                <span>{seller?.email}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-slate-500">Phone number</span>
                <span>{seller?.phoneNumber}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-slate-500">About</span>
                <span>{seller?.about}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-slate-500">Registred since:</span>
                <span>{seller?.createdAt.getFullYear()}</span>
            </div>
        </div>
    );
};

export default SellerInfo;
