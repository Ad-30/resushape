"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Landing } from "@/components/landing";

export default function Home() {

  const { data: session } = useSession();
  console.log(session?.user);

  const signInWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/profile" })
  }


  return (
    <>

      <Landing signInWithGoogle={signInWithGoogle} />


    </>
  );
}