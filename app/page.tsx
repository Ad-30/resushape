"use client";

import { Button } from "@/components/ui/button";
import { convertToApplicantData } from "@/utils/dataConversion";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {

  const { data: session } = useSession();
  console.log(session?.user.resumeDetails);

  const signInWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/profile" })
  }

  if (session) {
    const resume = String(session?.user.resumeDetails);
    const applicantData = convertToApplicantData(session?.user.resumeDetails)
    console.log(applicantData);
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
