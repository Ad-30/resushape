'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import './List.css';
import { AwardsItem, EducationItem, ProfileData, ProjectItem, SkillsItem, WorkItem } from "@/app/interfaces";
import { useEffect, useState } from "react";
import { ConvertedApplicantData, convertToApplicantData } from "@/utils/dataConversion";
import { useSession } from "next-auth/react";

interface LeftPanelProps {
    setResumeUrl: (url: string) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export default function LeftPanel({ setResumeUrl, setIsLoading }: LeftPanelProps) {

    const savedProfileData = Cookies.get('profileData');
    const savedEducationData = Cookies.get('educationData');
    const savedWorkData = Cookies.get('workData');
    const savedSkillsData = Cookies.get('skillsData');
    const savedProjectData = Cookies.get('projectData');
    const savedAwardsData = Cookies.get('awardsData');
    const savedTemplateData = Cookies.get('templateData');

    const profileData: { profile: ProfileData } = savedProfileData ? JSON.parse(savedProfileData) : { profile: { fullName: "", email: "", phoneNumber: "", location: "", link: "", profilePicture: "", fileName: "" } };
    const educationData: { sectionHeading: string, educationItems: EducationItem[] } = savedEducationData ? JSON.parse(savedEducationData) : { sectionHeading: '', educationItems: [] };
    const workData: { sectionHeading: string, workItems: WorkItem[] } = savedWorkData ? JSON.parse(savedWorkData) : { sectionHeading: '', workItems: [] };
    const skillsData: { sectionHeading: string, skillsItems: SkillsItem[] } = savedSkillsData ? JSON.parse(savedSkillsData) : { sectionHeading: '', skillsItems: [] };
    const projectData: { sectionHeading: string, projectItems: ProjectItem[] } = savedProjectData ? JSON.parse(savedProjectData) : { sectionHeading: '', projectItems: [] };
    const awardsData: { sectionHeading: string, awardsItems: AwardsItem[] } = savedAwardsData ? JSON.parse(savedAwardsData) : { sectionHeading: '', awardsItems: [] };
    const templateData: { selectedTemplate: Number } = savedTemplateData ? JSON.parse(savedTemplateData) : { selectedTemplate: 1 }

    const { data: session } = useSession();
    const router = useRouter();

    const resumeDetails = {
        creator: session?.user.id,
        selectedTemplate: templateData.selectedTemplate,
        headings: {
            education: educationData.sectionHeading,
            work: workData.sectionHeading,
            skills: skillsData.sectionHeading,
            projects: projectData.sectionHeading,
            awards: awardsData.sectionHeading
        },
        basics: profileData.profile,
        education: educationData.educationItems,
        work: workData.workItems,
        skills: skillsData.skillsItems,
        projects: projectData.projectItems,
        awards: awardsData.awardsItems
    }

    useEffect(() => {
        console.log(profileData);
        console.log(educationData);
        console.log(workData);
        console.log(skillsData);
        console.log(projectData);
        console.log(awardsData);
        console.log(templateData);

    }, [profileData, educationData, workData, skillsData, projectData, awardsData])

    const handleSubmit = async (applicantData: ConvertedApplicantData, imageURL: string) => {

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('applicantData', JSON.stringify(applicantData));
            formData.append('imageURL', imageURL);

            const response = await fetch('https://ad30.pythonanywhere.com/latexResume', {
                method: 'POST',
                body: formData,
                // headers: {
                //     'X-Access-Key': process.env.X_Access_Key || ''
                // },
            });

            console.log(response);


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setResumeUrl(url);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOnClick = async () => {

        try {
            const response = await axios.post('/api/resume', {
                selectedTemplate: templateData.selectedTemplate,
                basics: profileData,
                education: educationData,
                work: workData,
                skills: skillsData,
                projects: projectData,
                awards: awardsData
            })
        } catch (error) {
            console.error(error);
        } finally {
            await handleSubmit(convertToApplicantData(resumeDetails), profileData.profile.profilePicture || '')
        }
    }

    const pathname = usePathname();
    return (
        <div className="hidden md:block w-1/6 bg-black p-4 space-y-4 border border-gray-800">
            <nav className="bg-black text-white space-y-4 ">

                <div className={`hover-line flex justify-center font-bold ${pathname === '/resumeTemplates' ? 'text-emerald-400' : ''}`}>
                    <Link href="/resumeTemplates">
                        Templates
                    </Link>
                </div>

                <div className={`hover-line flex justify-center hover:decoration-emerald-300 cursor-move ${pathname === '/profile' ? 'text-emerald-400' : ''}`}>
                    <Link href="/profile">
                        Profile
                    </Link>
                </div>
                <div className={`hover-line flex justify-center hover:decoration-emerald-300 cursor-move ${pathname === '/education' ? 'text-emerald-400' : ''}`}>
                    <Link href="/education">
                        Education
                    </Link>
                </div>

                <div className={`hover-line flex justify-center hover:decoration-emerald-300 cursor-move ${pathname === '/work' ? 'text-emerald-400' : ''}`}>
                    <Link href="/work">
                        Work
                    </Link>
                </div>

                <div className={`hover-line flex justify-center hover:decoration-emerald-300 cursor-move ${pathname === '/skills' ? 'text-emerald-400' : ''}`}>
                    <Link href="/skills">
                        Skills
                    </Link>
                </div>

                <div className={`hover-line flex justify-center hover:decoration-emerald-300 cursor-move ${pathname === '/projects' ? 'text-emerald-400' : ''}`}>
                    <Link href="/projects">
                        Projects
                    </Link>
                </div>

                <div className={`hover-line flex justify-center hover:decoration-emerald-300 cursor-move ${pathname === '/awards' ? 'text-emerald-400' : ''}`}>
                    <Link href="/awards">
                        Awards
                    </Link>
                </div>

                <div className="flex justify-center">
                    <Button
                        className="mt-4 mb-4 text-gray-700 bg-emerald-400 hover:text-black rounded-full w-1/2 py-3 transition ease-in-out duration-300 hover:scale-105 hover:bg-emerald-400"
                        size={'sm'}
                        onClick={handleOnClick}
                    >
                        MAKE
                    </Button>
                </div>
            </nav>

        </div>
    )
}