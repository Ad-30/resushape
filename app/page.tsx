"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();
  console.log(session?.user);

  const signInWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/profile" })
  }


  return (
    <>
      {session ?
        (
          <Button
            className="rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-gray-50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-950"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            className="rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-gray-50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-950"
            onClick={signInWithGoogle}
          >
            Sign In
          </Button>
        )
      }

    </>
  );
}
