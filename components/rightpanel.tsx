'use client'

import Link from "next/link";
import '@/app/globals.css'
interface RightPanelProps {
    resumeUrl: string | null;
    isLoading: boolean,
}

export default function RightPanel({ resumeUrl, isLoading }: RightPanelProps) {

    console.log(resumeUrl);
    const emptyPdfDataUrl = "https://mag.wcoomd.org/uploads/2018/05/blank.pdf";

    return (
        <section className="bg-white border border-gray-800 w-1/2 hidden md:block">
            <div className="h-full border-l-2 border-gray-200 flex justify-center relative" >

                {isLoading &&
                    <div className="w-full h-1 absolute top-0 left-0 overflow-hidden">
                        <div className="h-full bg-emerald-500 animate-pulse slide" style={{ animation: "move 2s linear infinite" }}></div>
                    </div>
                }

                <object data={resumeUrl ? resumeUrl : emptyPdfDataUrl} type="application/pdf" width="100%" height="100%">
                    <p>
                        It appears you don't have a PDF plugin for this browser. You can
                        <Link href={resumeUrl || ''} download>click here to download the PDF file.</Link>
                    </p>
                </object>

            </div>
        </section>
    )
}

