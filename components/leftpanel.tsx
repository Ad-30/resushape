'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import './List.css';
export default function LeftPanel() {
    const pathname = usePathname();
    return (
        <div className="hidden md:block w-1/6 bg-black p-4 space-y-4 border border-gray-800">
            <nav className="bg-black text-white space-y-4 ">
                {/* <ul className="space-y-4 "> */}
                <div className={`hover-line flex justify-center font-bold ${pathname === '/resumeTemplate' ? 'text-emerald-400' : ''}`}><Link href="/resumeTemplate">
                    Templates
                </Link></div>
                <div className={`hover-line flex justify-center hover:decoration-emerald-300 cursor-move ${pathname === '/profile' ? 'text-emerald-400' : ''}`}><Link href="/profile">
                    Profile
                </Link></div>
                <div className={`hover-line flex justify-center hover:decoration-emerald-300 cursor-move ${pathname === '/education' ? 'text-emerald-400' : ''}`}><Link href="/education">
                    Education
                </Link></div>
                <div className={`hover-line flex justify-center hover:decoration-emerald-300 cursor-move ${pathname === '/work' ? 'text-emerald-400' : ''}`}><Link href="/work">
                    Work
                </Link></div>
                <div className={`hover-line flex justify-center hover:decoration-emerald-300 cursor-move ${pathname === '/skills' ? 'text-emerald-400' : ''}`}><Link href="/skills">
                    Skills
                </Link></div>
                <div className={`hover-line flex justify-center hover:decoration-emerald-300 cursor-move ${pathname === '/awards' ? 'text-emerald-400' : ''}`}><Link href="/awards">
                    Awards
                </Link></div>
                <div className={`hover-line flex justify-center hover:decoration-emerald-300 cursor-move ${pathname === '/projects' ? 'text-emerald-400' : ''}`}><Link href="/projects">
                    Projects
                </Link>
                </div>
                {/* </ul> */}
                <div className="flex justify-center">
                    <Button className="mt-4 mb-4 bg-emerald-400 text-black rounded-full w-1/2 py-3" size={'sm'}>MAKE</Button>
                </div>
            </nav>

        </div>
    )
}