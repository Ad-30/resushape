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
import PDFViewerComponent from '@/components/pdf-viewer-component';
const MobileView = () => {
    const { resumeURL, isResumeLoading } = useContext(ResumeContext);

    const toolbarPluginInstance = toolbarPlugin();
    const zoomPluginInstance = zoomPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();

    const { Toolbar } = toolbarPluginInstance;
    const { GoToNextPage, GoToPreviousPage, CurrentPageLabel } = pageNavigationPluginInstance;
    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

    return (
        <div className="relative flex-1 overflow-hidden bg-black">

            <PDFViewerComponent resumeURL={resumeURL} isResumeLoading={isResumeLoading} />


        </div>
    );
};

export default MobileView;
