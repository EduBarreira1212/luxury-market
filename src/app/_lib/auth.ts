import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './prisma';
import bcrypt from 'bcryptjs';
import { AppUser } from '../_types/auth';
import { z } from 'zod';

type UserRole = 'seller' | 'buyer';

const credsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: 'E-mail', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (raw) => {
                try {
                    const parsed = credsSchema.safeParse({
                        email: String(raw?.email ?? '')
                            .trim()
                            .toLowerCase(),
                        password: String(raw?.password ?? ''),
                    });

                    if (!parsed.success) {
                        return null;
                    }

                    const { email, password } = parsed.data;

                    const buyer = await db.buyer.findFirst({
                        where: { email: { equals: email, mode: 'insensitive' } },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            password: true,
                        },
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
                        const seller = await db.seller.findFirst({
                            where: { email: { equals: email, mode: 'insensitive' } },
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

                    const ok = await bcrypt.compare(password, user.password);
                    if (!ok) return null;

                    return { id: user.id, name: user.name, email: user.email, role };
                } catch (err) {
                    console.error('[AUTH ERROR]', err);
                    return null;
                }
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
