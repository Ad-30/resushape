import React from 'react';

type FileContextType = {
    resumeURL: string | null;
    setResumeURL: React.Dispatch<React.SetStateAction<string | null>>;
    isResumeLoading: boolean;
    setIsResumeLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResumeContext = React.createContext<FileContextType>({
    resumeURL: '',
    setResumeURL: () => { },
    isResumeLoading: false,
    setIsResumeLoading: () => { },
});

export default ResumeContext;