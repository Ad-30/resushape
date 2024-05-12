import 'next-auth';
import { DefaultSession } from 'next-auth';
import { ResumeDocument } from './models/Resume';

declare module 'next-auth' {
    interface User {
        id?: string;
    }

    interface Session {
        user: {
            id?: string;
            resumeDetails: ResumeDocument;
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