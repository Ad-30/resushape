import { Button } from "@/components/ui/button";
import Link from "next/link";
import './List.css';
export default function LeftPanel() {
    return (
        <div className="hidden md:block w-1/6 bg-black p-4 space-y-4 border border-gray-800">
            <nav className="bg-black text-white space-y-4 ">
                {/* <ul className="space-y-4 "> */}
                <div className="hover-line flex justify-center font-bold">
                    <Link href="/resumeTemplates">
                        Templates
                    </Link>
                </div>
                <div className="hover-line flex justify-center hover:decoration-emerald-300 cursor-move">
                    <Link href="/profile">
                        Profile
                    </Link>
                </div>
                <div className="hover-line flex justify-center hover:decoration-emerald-300 cursor-move">
                    <Link href="/education">
                        Education
                    </Link>
                </div>
                <div className="hover-line flex justify-center hover:decoration-emerald-300 cursor-move">
                    <Link href="/work">
                        Work
                    </Link>
                </div>
                <div className="hover-line flex justify-center hover:decoration-emerald-300 cursor-move">
                    <Link href="/skills">
                        Skills
                    </Link>
                </div>
                <div className="hover-line flex justify-center hover:decoration-emerald-300 cursor-move">
                    <Link href="/projects">
                        Projects
                    </Link>
                </div>
                <div className="hover-line flex justify-center hover:decoration-emerald-300 cursor-move">
                    <Link href="/awards">
                        Awards
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