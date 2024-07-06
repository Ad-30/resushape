"use client";

import React, { useContext } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import ResumeContext from '@/context/ResumeContext';
import '@/app/globals.css';
import { DownloadIcon } from 'lucide-react';

const RightPanel = () => {
    const { resumeURL, isResumeLoading } = useContext(ResumeContext);

    const toolbarPluginInstance = toolbarPlugin();
    const zoomPluginInstance = zoomPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();

    const { Toolbar } = toolbarPluginInstance;
    const { GoToNextPage, GoToPreviousPage, CurrentPageLabel } = pageNavigationPluginInstance;
    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

    return (
        <section className="bg-black border-gray-800 w-1/2 hidden md:block">
            <div className="h-full border-l-2 border-gray-200 flex flex-col justify-center relative">

                {isResumeLoading &&
                    <div className="w-full h-1 absolute top-0 left-0 overflow-hidden">
                        <div className="h-full bg-emerald-500 animate-pulse slide" style={{ animation: "move 2s linear infinite" }}></div>
                    </div>
                }

                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <div className="flex flex-col h-full w-full">
                        <div className="bg-gray-800 text-white flex items-center p-2">
                            <Toolbar>
                                {(props: ToolbarSlot) => {
                                    return (
                                        <div className="flex items-center space-x-14 text-white">
                                            <div title="Previous Page">
                                                <GoToPreviousPage />
                                            </div>
                                            <div>
                                                <CurrentPageLabel />
                                            </div>
                                            <div title="Next Page">
                                                <GoToNextPage />
                                            </div>
                                            <div title="Zoom Out">
                                                <ZoomOutButton />
                                            </div>
                                            <div title="Zoom Options">
                                                <ZoomPopover />
                                            </div>
                                            <div title="Zoom In">
                                                <ZoomInButton />
                                            </div>
                                            <div
                                                onClick={() => {
                                                    const url = resumeURL || '/blank.pdf';
                                                    const link = document.createElement('a');
                                                    link.href = url;
                                                    link.download = 'resume.pdf';
                                                    link.click();
                                                }}
                                                className="px-2 py-1 rounded text-white ml-2"
                                                title="Download"
                                            >
                                                <DownloadIcon color="white" />
                                            </div>
                                            <div title="Search">
                                                <props.ShowSearchPopover />
                                            </div>
                                            <div title="Print">
                                                <props.Print />
                                            </div>
                                            {/* <div title="Switch Theme">
                                                    <props.SwitchTheme />
                                                </div> */}
                                        </div>
                                    );
                                }}
                            </Toolbar>
                        </div>
                        <div className="flex-1">
                            <Viewer
                                fileUrl={resumeURL || '/blank.pdf'}
                                plugins={[toolbarPluginInstance, zoomPluginInstance, pageNavigationPluginInstance]}
                                defaultScale={SpecialZoomLevel.PageFit}
                                theme={{ theme: 'dark' }}
                            />
                        </div>
                    </div>
                </Worker>

            </div>
        </section>
    );
};

export default RightPanel;
