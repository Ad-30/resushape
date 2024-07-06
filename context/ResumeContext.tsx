import { AwardsItem, EducationItem, ProfileData, ProjectItem, SkillsItem, WorkItem } from '@/app/interfaces';
import React from 'react';

type FileContextType = {
    resumeURL: string | null;
    setResumeURL: React.Dispatch<React.SetStateAction<string | null>>;
    isResumeLoading: boolean;
    setIsResumeLoading: React.Dispatch<React.SetStateAction<boolean>>;
    profileData: { profile: ProfileData };
    setProfileData: React.Dispatch<React.SetStateAction<{ profile: ProfileData }>>;
    selectedTemplate: Number | undefined;
    setSelectedTemplate: React.Dispatch<React.SetStateAction<Number | undefined>>;
    educationData: { sectionHeading: string, educationItems: EducationItem[] };
    setEducationData: React.Dispatch<React.SetStateAction<{ sectionHeading: string, educationItems: EducationItem[] }>>;
    workData: { sectionHeading: string, workItems: WorkItem[] };
    setWorkData: React.Dispatch<React.SetStateAction<{ sectionHeading: string, workItems: WorkItem[] }>>;
    skillsData: { sectionHeading: string, skillsItems: SkillsItem[] };
    setSkillsData: React.Dispatch<React.SetStateAction<{ sectionHeading: string, skillsItems: SkillsItem[] }>>;
    projectData: { sectionHeading: string, projectItems: ProjectItem[] };
    setProjectData: React.Dispatch<React.SetStateAction<{ sectionHeading: string, projectItems: ProjectItem[] }>>;
    awardsData: { sectionHeading: string, awardsItems: AwardsItem[] };
    setAwardsData: React.Dispatch<React.SetStateAction<{ sectionHeading: string, awardsItems: AwardsItem[] }>>;
};

const ResumeContext = React.createContext<FileContextType>({
    resumeURL: '',
    setResumeURL: () => { },
    isResumeLoading: false,
    setIsResumeLoading: () => { },
    profileData: { profile: { fullName: "", email: "", phoneNumber: "", location: "", link: "", profilePicture: "", fileName: "" } },
    setProfileData: () => { },
    selectedTemplate: 1,
    setSelectedTemplate: () => { },
    educationData: { sectionHeading: '', educationItems: [] },
    setEducationData: () => { },
    workData: { sectionHeading: '', workItems: [] },
    setWorkData: () => { },
    skillsData: { sectionHeading: '', skillsItems: [] },
    setSkillsData: () => { },
    projectData: { sectionHeading: '', projectItems: [] },
    setProjectData: () => { },
    awardsData: { sectionHeading: '', awardsItems: [] },
    setAwardsData: () => { },
});

export default ResumeContext;