"use client";

import BottomPanel from "@/components/bottompanel";
import LeftPanel from "@/components/leftpanel";
import RightPanel from "@/components/rightpanel";
import TopPanel from "@/components/toppanel";
import ResumeContext from "@/context/ResumeContext";
import { useState } from "react";
import { AwardsItem, EducationItem, ProfileData, ProjectItem, SkillsItem, WorkItem } from "../interfaces";
import Cookies from 'js-cookie';
import { useSession } from "next-auth/react";

const DashboardLayout = ({ children }: { children: React.ReactNode; }) => {

    const { data: session } = useSession();

    const cookiesProfileData = Cookies.get('profileData');
    const parsedProfileData = cookiesProfileData ? JSON.parse(cookiesProfileData) : null;

    const savedProfileData = session?.user?.resumeDetails?.basics;
    const defaultProfileData = { fullName: "", email: "", phoneNumber: "", location: "", link: "", profilePicture: "", fileName: "" };

    const initialProfileData = parsedProfileData?.profile && Object.values(parsedProfileData.profile).some(value => value !== "")
        ? parsedProfileData
        : savedProfileData
            ? { profile: savedProfileData }
            : { profile: defaultProfileData };


    const cookiesTemplateData = Cookies.get('templateData');
    const parsedTemplateData = cookiesTemplateData ? JSON.parse(cookiesTemplateData) : null;

    const savedTemplateData = { selectedTemplate: session?.user?.resumeDetails?.selectedTemplate }
    const defaultTemplateData = { selectedTemplate: 1 }

    const initialTemplate: Number = parsedTemplateData?.selectedTemplate ? parsedTemplateData.selectedTemplate : savedTemplateData.selectedTemplate ? savedTemplateData.selectedTemplate : defaultTemplateData.selectedTemplate;


    const cookiesEducationData = Cookies.get('educationData');
    const parsedEducationData = cookiesEducationData ? JSON.parse(cookiesEducationData) : null;

    const savedEducationData = session?.user?.resumeDetails?.education;
    const defaultEducationData = { sectionHeading: '', educationItems: [] }

    const initialEducationData: { sectionHeading: string, educationItems: EducationItem[] } = parsedEducationData?.educationItems && (parsedEducationData.educationItems.length > 0 || parsedEducationData.sectionHeading !== "")
        ? parsedEducationData
        : savedEducationData && (savedEducationData.length > 0 || session.user.resumeDetails.headings.education !== '')
            ? { sectionHeading: session.user.resumeDetails.headings.education, educationItems: savedEducationData }
            : defaultEducationData;

    const cookiesWorkData = Cookies.get('workData');
    const parsedWorkData = cookiesWorkData ? JSON.parse(cookiesWorkData) : null;

    const savedWorkData = session?.user?.resumeDetails?.work;
    const defaultWorkData = { sectionHeading: '', workItems: [] }

    const initialWorkData: { sectionHeading: string, workItems: WorkItem[] } = parsedWorkData?.workItems && (parsedWorkData.workItems.length > 0 || parsedWorkData.sectionHeading !== "")
        ? parsedWorkData
        : savedWorkData && (savedWorkData.length > 0 || session?.user.resumeDetails.headings.work === "")
            ? { sectionHeading: session?.user.resumeDetails.headings.work, workItems: savedWorkData }
            : defaultWorkData;

    const cookiesSkillsData = Cookies.get('skillsData');
    const parsedSkillsData = cookiesSkillsData ? JSON.parse(cookiesSkillsData) : null;

    const savedSkillsData = session?.user?.resumeDetails?.skills;
    const defaultSkillsData = { sectionHeading: '', skillsItems: [] };

    const initialSkillsData: { sectionHeading: string, skillsItems: SkillsItem[] } = parsedSkillsData?.skillsItems && (parsedSkillsData.skillsItems.length > 0 || parsedSkillsData.sectionHeading !== "")
        ? parsedSkillsData
        : savedSkillsData && (savedSkillsData.length > 0 || session?.user.resumeDetails.headings.skills !== "")
            ? { sectionHeading: session?.user.resumeDetails.headings.skills, skillsItems: savedSkillsData }
            : defaultSkillsData;

    const cookiesProjectsData = Cookies.get('projectData');
    const parsedProjectsData = cookiesProjectsData ? JSON.parse(cookiesProjectsData) : null;

    const savedProjectsData = session?.user?.resumeDetails?.projects;
    const defaultProjectsData = { sectionHeading: '', projectItems: [] };

    const initialProjectData: { sectionHeading: string, projectItems: ProjectItem[] } = parsedProjectsData && (parsedProjectsData.projectItems.length > 0 || parsedProjectsData.sectionHeading !== "")
        ? parsedProjectsData
        : savedProjectsData && (savedProjectsData.length > 0 || session?.user.resumeDetails.headings.projects !== "")
            ? { sectionHeading: session?.user.resumeDetails.headings.projects, projectItems: savedProjectsData }
            : defaultProjectsData;

    const cookiesAwardsData = Cookies.get('awardsData');
    const parsedAwardsData = cookiesAwardsData ? JSON.parse(cookiesAwardsData) : null;

    const savedAwardsData = session?.user?.resumeDetails?.awards;
    const defaultAwardsData = { sectionHeading: '', awardsItems: [] };

    const initialAwardsData: { sectionHeading: string, awardsItems: AwardsItem[] } = parsedAwardsData?.awardsItems && (parsedAwardsData.awardsItems.length > 0 || parsedAwardsData.sectionHeading !== "")
        ? parsedAwardsData
        : savedAwardsData && (savedAwardsData.length > 0 || session?.user.resumeDetails.headings.awards !== "")
            ? { sectionHeading: session?.user.resumeDetails.headings.awards, awardsItems: savedAwardsData }
            : defaultAwardsData;


    const [resumeURL, setResumeURL] = useState<string | null>(null);
    const [isResumeLoading, setIsResumeLoading] = useState<boolean>(false);
    const [profileData, setProfileData] = useState<{ profile: ProfileData }>(initialProfileData);
    const [selectedTemplate, setSelectedTemplate] = useState<Number | undefined>(initialTemplate);
    const [educationData, setEducationData] = useState<{ sectionHeading: string, educationItems: EducationItem[] }>(initialEducationData);
    const [workData, setWorkData] = useState<{ sectionHeading: string, workItems: WorkItem[] }>(initialWorkData);
    const [skillsData, setSkillsData] = useState<{ sectionHeading: string, skillsItems: SkillsItem[] }>(initialSkillsData);
    const [projectData, setProjectData] = useState<{ sectionHeading: string, projectItems: ProjectItem[] }>(initialProjectData);
    const [awardsData, setAwardsData] = useState<{ sectionHeading: string, awardsItems: AwardsItem[] }>(initialAwardsData);

    return (
        <ResumeContext.Provider
            value={{ resumeURL, setResumeURL, isResumeLoading, setIsResumeLoading, profileData, setProfileData, selectedTemplate, setSelectedTemplate, educationData, setEducationData, workData, setWorkData, skillsData, setSkillsData, projectData, setProjectData, awardsData, setAwardsData }}
        >
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