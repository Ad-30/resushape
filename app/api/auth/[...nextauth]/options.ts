import connectToDb from "@/lib/connectToDb";
import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({

            profile(profile) {

                console.log("Google Profile", profile);

                return {
                    ...profile,
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    isVerified: profile.email_verified
                };
            },

            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.id = user.id;
            }

            return token;
        },
        async session({ session, token }) {

            const sessionUser = await User.findOne({
                email: session.user.email
            });

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {

            await connectToDb();
            const user = await User.findOne({ email: profile?.email });

            if (!user) {
                await User.create({
                    email: profile?.email,
                    name: profile?.name,
                    image: profile?.picture,
                });
            }

            return true;
        }
    },


    secret: process.env.NEXTAUTH_SECRET

};
