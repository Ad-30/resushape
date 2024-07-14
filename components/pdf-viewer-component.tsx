import React, { useEffect, useState } from 'react';
import { Worker, Viewer, OpenFile } from '@react-pdf-viewer/core';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { searchPlugin } from '@react-pdf-viewer/search';
import { getFilePlugin, RenderDownloadProps } from '@react-pdf-viewer/get-file';
import { printPlugin, RenderPrintProps } from '@react-pdf-viewer/print';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { GoZoomOut, GoZoomIn } from "react-icons/go";
import { IoPrintSharp } from "react-icons/io5";
import { DownloadIcon } from 'lucide-react';
import '@/app/globals.css';
import { RenderGoToPageProps } from '@react-pdf-viewer/page-navigation';
import { RenderZoomOutProps, RenderZoomInProps } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

interface PDFViewerComponentProps {
    resumeURL: string | null;
    isResumeLoading: boolean;
}

const PDFViewerComponent: React.FC<PDFViewerComponentProps> = ({ resumeURL, isResumeLoading }) => {
    const getFilePluginInstance = getFilePlugin({
        fileNameGenerator: (file: OpenFile) => {
            const fileName = file.name.substring(file.name.lastIndexOf('/') + 1);
            return `resumshape-${fileName}`;
        },
    });
    const { Download } = getFilePluginInstance;
    const toolbarPluginInstance = toolbarPlugin();
    const zoomPluginInstance = zoomPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();

    const { Toolbar } = toolbarPluginInstance;
    const { GoToNextPage, GoToPreviousPage, CurrentPageLabel } = pageNavigationPluginInstance;
    const { ZoomOut, ZoomIn, Zoom } = zoomPluginInstance;
    const printPluginInstance = printPlugin();
    const { Print } = printPluginInstance;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    return (
        <>
            {isResumeLoading &&
                <div className="w-full h-1 absolute top-0 left-0 overflow-hidden">
                    <div className="h-full bg-emerald-500 animate-pulse slide" style={{ animation: "move 2s linear infinite" }}></div>
                </div>
            }
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <div className="flex flex-col h-full w-full">
                    <div className="bg-gray-800 text-white flex items-center justify-center p-2">
                        <Toolbar>
                            {(props: ToolbarSlot) => {
                                return (
                                    <div className={`flex items-center ${isMobile ? 'flex-wrap justify-center gap-8' : 'flex-wrap justify-center space-x-14'}`}>
                                        <div title="Previous Page" className={`${isMobile ? 'hidden' : ''}`}>
                                            <GoToPreviousPage>
                                                {(props: RenderGoToPageProps) => (
                                                    <button
                                                        className='border-none text-white cursor-pointer'
                                                        disabled={props.isDisabled}
                                                        onClick={props.onClick}
                                                    >
                                                        <IoIosArrowUp size={18} />
                                                    </button>
                                                )}
                                            </GoToPreviousPage>
                                        </div>
                                        <div className={`${isMobile ? 'hidden' : ''}`}>
                                            <CurrentPageLabel />
                                        </div>
                                        <div title="Next Page" className={`${isMobile ? 'hidden' : ''}`}>
                                            <GoToNextPage >
                                                {(props: RenderGoToPageProps) => (
                                                    <button
                                                        className='border-none text-white cursor-pointer'
                                                        disabled={props.isDisabled}
                                                        onClick={props.onClick}
                                                    >
                                                        <IoIosArrowDown size={18} />
                                                    </button>
                                                )}
                                            </GoToNextPage>
                                        </div>
                                        <div title="Zoom Out" >
                                            <ZoomOut >
                                                {(props: RenderZoomOutProps) => (
                                                    <button
                                                        className='border-none text-white cursor-pointer'
                                                        onClick={props.onClick}
                                                    >
                                                        <GoZoomOut size={18} />
                                                    </button>
                                                )}
                                            </ZoomOut>
                                        </div>
                                        <div title="Zoom Options" className='hidden' >
                                            <Zoom >
                                            </Zoom>
                                        </div>
                                        <div title="Zoom In" >
                                            <ZoomIn>
                                                {(props: RenderZoomInProps) => (
                                                    <button
                                                        className='border-none text-white cursor-pointer'
                                                        onClick={props.onClick}
                                                    >
                                                        <GoZoomIn size={18} />
                                                    </button>
                                                )}
                                            </ZoomIn>
                                        </div>
                                        <div>
                                            <Download>
                                                {
                                                    (props: RenderDownloadProps) => (
                                                        <button
                                                            className='border-none text-white cursor-pointer'
                                                            onClick={props.onClick}
                                                        >
                                                            <DownloadIcon size={18} />
                                                        </button>
                                                    )
                                                }
                                            </Download>
                                        </div>
                                        <div title="Print" className={`${isMobile ? 'hidden' : ''}`}>
                                            <Print >
                                                {(props: RenderPrintProps) => (
                                                    <button
                                                        className='border-none text-white cursor-pointer'
                                                        onClick={props.onClick}
                                                    >
                                                        <IoPrintSharp size={18} />
                                                    </button>
                                                )}
                                            </Print>
                                        </div>
                                        {/* <div title="Switch Theme">
                                                    <props.SwitchTheme />
                                                </div> */}
                                    </div>
                                );
                            }}
                        </Toolbar>
                    </div>
                    <div className="flex-1 h-full bg">
                        <Viewer
                            fileUrl={resumeURL || '/blank.pdf'}
                            plugins={[toolbarPluginInstance, zoomPluginInstance, pageNavigationPluginInstance, getFilePluginInstance, printPluginInstance]}
                            theme={{ theme: 'dark' }}
                        />
                    </div>
                </div>
            </Worker>

        </>
    );
};

export default PDFViewerComponent;