import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './prisma';
import bcrypt from 'bcryptjs';
import { AppUser } from '../_types/auth';

type UserRole = 'seller' | 'buyer';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: 'E-mail', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials.email || !credentials.password) {
                    throw new Error('E-mail and password are required.');
                }

                const buyer = await db.buyer.findUnique({
                    where: { email: String(credentials.email) },
                    select: { id: true, name: true, email: true, password: true },
                });

                let role: UserRole | null = null;
                let user: {
                    id: string;
                    name: string;
                    email: string;
                    password: string;
                } | null = null;

                if (buyer) {
                    user = buyer;
                    role = 'buyer';
                }

                if (!buyer) {
                    const seller = await db.seller.findUnique({
                        where: { email: String(credentials.email) },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            password: true,
                        },
                    });

                    if (seller) {
                        user = seller;
                        role = 'seller';
                    }
                }

                if (!user || !role) return null;

                const ok = await bcrypt.compare(
                    String(credentials.password),
                    user.password,
                );
                if (!ok) return null;

                return { id: user.id, name: user.name, email: user.email, role };
            },
        }),
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const u = user as AppUser;
                token.id = u.id;
                token.role = u.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = String(token.id);
                session.user.role = token.role as 'buyer' | 'seller';
            }
            return session;
        },
    },
});
