"use client";

import React, { useContext } from 'react';
import ResumeContext from '@/context/ResumeContext';
import PDFViewerComponent from '@/components/pdf-viewer-component';
const RightPanel = () => {
    const { resumeURL, isResumeLoading } = useContext(ResumeContext);
    return (
        <section className="bg-black border-gray-800 w-1/2 hidden md:block">
            <div className="h-full border-l-2 border-gray-200 flex flex-col justify-center relative">
                <PDFViewerComponent resumeURL={resumeURL} isResumeLoading={isResumeLoading} />
            </div>
        </section>
    );
};


export default RightPanel;
