'use client'
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const sections = ["/resumeTemplate", "/profile", "/education", "/work", "/skills", "/awards", "/projects"];

export default function BottomPanel() {
    const router = useRouter();
    const current = usePathname();
    const currentIndex = sections.indexOf(current);
    const [progress, setProgress] = useState(currentIndex * 100 / (sections.length - 1));

    useEffect(() => {
        setProgress(currentIndex * 100 / (sections.length - 1));
    }, [currentIndex]);

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            router.push(sections[currentIndex - 1]);
            setProgress((prevProgress) => prevProgress - 100 / (sections.length - 1));
        }
    };

    const handleNextClick = () => {
        if (currentIndex < sections.length - 1) {
            router.push(sections[currentIndex + 1]);
            setProgress((prevProgress) => prevProgress + 100 / (sections.length - 1));
        }
    };

    return (
        <footer className="flex items-center justify-between p-4 bg-black text-white">
            <Button variant="ghost" onClick={handlePrevClick}>← Prev</Button>
            <Progress className="w-1/3 mx-4 bg-gray-800" color="rgb(93,155,136)" value={progress} />
            <Button variant="ghost" onClick={handleNextClick}>Next →</Button>
        </footer>
    )
}