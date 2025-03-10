import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                // logic to salt and hash password
                // logic to verify if the user exists
                // No user found, so this is their first attempt to login
                // Optionally, this is also the place you could do a user registration
                // return user object with their profile data
            },
        }),
    ],
});
