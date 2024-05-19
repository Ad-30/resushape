"use client";

import BottomPanel from "@/components/bottompanel";
import LeftPanel from "@/components/leftpanel";
import RightPanel from "@/components/rightpanel";
import TopPanel from "@/components/toppanel";
import { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode; }) => {

    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <main className="flex flex-col h-screen">
            <TopPanel />
            <div className="flex flex-1 overflow-hidden">
                <LeftPanel setResumeUrl={setResumeUrl} setIsLoading={setIsLoading} />
                {children}
                <RightPanel resumeUrl={resumeUrl} isLoading={isLoading} />
            </div>
            <BottomPanel />
        </main>
    )
}

export default DashboardLayout;