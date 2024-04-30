import { Button } from "@/components/ui/button"

export default function LeftPanel() {
    return (
        <div className="w-1/6 bg-gray-900 p-4 space-y-4 ">
            <nav className="bg-[#111827] text-white space-y-4 ">
                <ul className="space-y-4 ">
                    <li className="flex justify-center font-bold">Templates</li>
                    <li className="draggable hover:underline flex justify-center hover:decoration-emerald-300 cursor-move">Profile</li>
                    <li className="draggable hover:underline flex justify-center hover:decoration-emerald-300 cursor-move">Education</li>
                    <li className="draggable hover:underline flex justify-center hover:decoration-emerald-300 cursor-move">Work</li>
                    <li className="draggable hover:underline flex justify-center hover:decoration-emerald-300 cursor-move">Skills</li>
                    <li className="draggable hover:underline flex justify-center hover:decoration-emerald-300 cursor-move">Awards</li>
                    <li className="draggable hover:underline flex justify-center hover:decoration-emerald-300 cursor-move">Projects</li>
                </ul>
                <div className="flex justify-center">
                    <Button className="mt-4 mb-4 bg-emerald-400 text-black rounded-full w-1/2 py-3" size={'sm'}>MAKE</Button>
                </div>
            </nav>
            {/* <div className="flex-1" /> */}
        </div>
    )
}