/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: 'buyer' | 'seller';
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: 'buyer' | 'seller';
    }
}
