import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        id?: string;
    }

    interface Session {
        user: {
            id?: string;
        } & DefaultSession['user']
    }

    interface Profile {
        id: string;
        name: string;
        email: string;
        image: string;
        picture: string;
        isVerified: boolean;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
    }
}