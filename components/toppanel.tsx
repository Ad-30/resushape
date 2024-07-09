"use client"

import { LogOutIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { User } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

export default function TopPanel() {

    const { data: session } = useSession();
    const user: User = session?.user as User;

    return (
        <header className="flex h-16 w-full items-center justify-between bg-gray-950 px-4 md:px-6">
            <Link className="text-lg font-bold text-gray-50" href="/">
                <h1 className="text-2xl lg:ml-12 font-bold text-white">resu<span className="text-emerald-400">shape</span></h1>
            </Link>
            <div className="flex items-center gap-4">

                {user && <div className="hidden lg:flex items-center gap-4 text-sm font-medium text-gray-400">
                    <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarImage alt="user" src={`${user.image}`} />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
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
                            >
                                Sign In
                            </Button>

                        )
                    }
                </div>}

                <div className="lg:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-8 w-8 cursor-pointer">
                                <AvatarImage alt="user" src={`${user?.image}`} />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-gray-900 text-gray-50 border-none">
                            <DropdownMenuLabel className="font-semibold">{user?.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-emerald-400" />
                            <DropdownMenuItem>
                                <Button
                                    className="rounded-md w-full border border-emerald-600 bg-black px-3 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-950 hover:text-gray-50 mt-2"
                                    onClick={() => signOut()}
                                >
                                    <LogOutIcon className="mr-2 h-4 w-4" />
                                    Sign Out
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>
        </header>
    )
}