"use client";

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

const Provider = ({ children }: { children: React.ReactNode }) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default Provider;
