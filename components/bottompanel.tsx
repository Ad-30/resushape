'use client';

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ConvertedApplicantData, convertToApplicantData } from "@/utils/dataConversion";
import { AwardsItem, EducationItem, ProfileData, ProjectItem, SkillsItem, WorkItem } from "@/app/interfaces";
import axios from "axios";
import ResumeContext from "@/context/ResumeContext";
import Cookies from "js-cookie";

const sections = ["/resumeTemplates", "/profile", "/education", "/work", "/skills", "/projects", "/awards"];

export default function BottomPanel() {

    const router = useRouter();
    const current = usePathname();
    const currentIndex = sections.indexOf(current);
    const [progress, setProgress] = useState(currentIndex * 100 / (sections.length - 1));
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { setResumeURL, setIsResumeLoading } = useContext(ResumeContext);

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);
        };

        updateWindowWidth();

        window.addEventListener('resize', updateWindowWidth);

        return () => window.removeEventListener('resize', updateWindowWidth);
    }, []);

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            router.push(sections[currentIndex - 1]);
            setProgress((prevProgress) => prevProgress - 100 / (sections.length - 1));
        }
    };

    const handleNextClick = () => {
        if (currentIndex < sections.length - 1) {
            router.push(sections[currentIndex + 1]);
            setProgress((prevProgress) => prevProgress + 100 / (sections.length - 1));
        }
    };

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

    const handleSubmit = async (applicantData: ConvertedApplicantData, imageURL: string) => {

        setIsResumeLoading(true);

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
            setResumeURL(url);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsResumeLoading(false);
        }
    };

    const handleOnClick = async () => {

        router.push('/mobileView')

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


    return (
        <footer className="flex items-center justify-between p-4 bg-black text-white">
            <Button variant="ghost" onClick={handlePrevClick}>← Prev</Button>
            {windowWidth <= 640 ? (
                <Button
                    className="mt-4 mb-4 bg-emerald-400 text-black rounded-full w-1/3 py-3 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-opacity-50 active:bg-emerald-700 shadow-md transition duration-150 ease-in-out"
                    size={'sm'}
                    onClick={handleOnClick}
                >
                    MAKE
                </Button>
            ) : (
                <Progress className="w-1/3 mx-4 bg-gray-800" color="rgb(93,155,136)" value={progress} />
            )}
            <Button variant="ghost" onClick={handleNextClick}>Next →</Button>
        </footer>
    );
}