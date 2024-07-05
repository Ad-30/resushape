"use client";

import BottomPanel from "@/components/bottompanel";
import LeftPanel from "@/components/leftpanel";
import RightPanel from "@/components/rightpanel";
import TopPanel from "@/components/toppanel";
import ResumeContext from "@/context/ResumeContext";
import { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode; }) => {

    const [resumeURL, setResumeURL] = useState<string | null>(null);
    const [isResumeLoading, setIsResumeLoading] = useState<boolean>(false);

    return (
        <ResumeContext.Provider value={{ resumeURL, setResumeURL, isResumeLoading, setIsResumeLoading }}>
            <main className="flex flex-col h-screen">
                <TopPanel />
                <div className="flex flex-1 overflow-hidden">
                    <LeftPanel />
                    {children}
                    <RightPanel />
                </div>
                <BottomPanel />
            </main>
        </ResumeContext.Provider>
    )
}

export default DashboardLayout;