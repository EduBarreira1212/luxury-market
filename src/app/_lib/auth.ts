import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './prisma';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                if (!credentials.email || !credentials.password) {
                    throw new Error('E-mail and password are required.');
                }

                let user = await db.buyer.findUnique({
                    where: { email: String(credentials.email) },
                });

                if (!user) {
                    user = await db.seller.findUnique({
                        where: { email: String(credentials.email) },
                    });
                }

                if (!user) throw new Error('User not found.');

                const passwordMatch = await bcrypt.compare(
                    String(credentials.password),
                    user.password,
                );

                if (!passwordMatch) throw new Error('Invalid credentials.');

                return user;
            },
        }),
    ],
});
