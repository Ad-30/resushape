import Link from "next/link"
import { LogOutIcon, UserIcon } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { User } from "next-auth"
import { usePathname, useRouter } from "next/navigation";


export function Navbar(props: any) {
    const { data: session } = useSession();
    const user: User = session?.user as User;
    const currentPathname = usePathname();
    const signInWithGoogle = async () => {
        await signIn("google")
    }
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 h-16 flex items-center bg-gray-950 shadow-lg transition-all duration-300 ease-in-out">
            <Link className="flex items-center justify-center" href="/">
                <h1 className="text-2xl lg:ml-12 font-bold text-white">resu<span className="text-emerald-400">shape</span></h1>
            </Link>
            <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                <Link className={`text-sm font-medium hidden md:block hover:text-emerald-500 transition-colors ${currentPathname === '/' ? 'text-emerald-500' : ''}`} href="/">
                    Home
                </Link>
                <Link className={`text-sm font-medium hidden md:block hover:text-emerald-500 transition-colors ${currentPathname === '/aboutus' ? 'text-emerald-500' : ''}`} href="/aboutus">
                    About Us
                </Link>
                {session && <Link className="text-sm font-medium hidden md:block hover:text-emerald-500 transition-colors" href="/resumeTemplates">
                    Create
                </Link>}
                {!session ? (<Link className="text-sm font-medium hover:text-emerald-500 transition-colors" href="#" onClick={signInWithGoogle}>
                    Sign In
                </Link>) : (<div className="">
                    <DropdownMenu >

                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-8 w-8 cursor-pointer">
                                <AvatarImage alt="user" src={`${user?.image}`} />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48 bg-gray-900 text-gray-50 border-none">

                            <DropdownMenuLabel className="font-semibold">{user?.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-emerald-400" />

                            <DropdownMenuItem className="lg:hidden">
                                <Link className={`text-sm font-medium hover:text-emerald-500 transition-colors ${currentPathname === '/' ? 'text-emerald-500' : ''}`} href="/">
                                    Home
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="lg:hidden">
                                <Link className={`text-sm font-medium hover:text-emerald-500 transition-colors ${currentPathname === '/aboutus' ? 'text-emerald-500' : ''}`} href="/aboutus">
                                    About Us
                                </Link>
                            </DropdownMenuItem >

                            {session &&
                                <DropdownMenuItem className="lg:hidden">
                                    <Link className="text-sm font-medium hover:text-emerald-500 transition-colors" href="/resumeTemplates">
                                        Create Resume
                                    </Link>
                                </DropdownMenuItem>}
                            <Button
                                className="rounded-md w-full border border-emerald-600 bg-black px-3 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-950 hover:text-gray-50 mt-2"
                                onClick={() => signOut()}
                            >
                                <LogOutIcon className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>)}

            </nav>
        </header>
    )
}