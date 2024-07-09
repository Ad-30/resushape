'use client'
import React, { useState, useEffect, useContext } from 'react';
import ProjectForm from '@/components/projectform';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ProjectItem } from '@/app/interfaces';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import ResumeContext from '@/context/ResumeContext';


const Page = () => {

    const { data: session } = useSession();
    const { projectData, setProjectData } = useContext(ResumeContext);

    const cookiesProjectsData = Cookies.get('projectData');
    const parsedProjectsData = cookiesProjectsData ? JSON.parse(cookiesProjectsData) : null;

    const savedProjectsData = session?.user?.resumeDetails?.projects;
    const defaultProjectsData = { sectionHeading: '', projectItems: [] };

    const initialProjectData: { sectionHeading: string, projectItems: ProjectItem[] } = parsedProjectsData && (parsedProjectsData.projectItems.length > 0 || parsedProjectsData.sectionHeading !== "")
        ? parsedProjectsData
        : savedProjectsData && (savedProjectsData.length > 0 || session?.user.resumeDetails.headings.projects !== "")
            ? { sectionHeading: session?.user.resumeDetails.headings.projects, projectItems: savedProjectsData }
            : defaultProjectsData;

    // const [projectData, setProjectData] = useState<{ sectionHeading: string, projectItems: ProjectItem[] }>(initialProjectData);

    const updateProjectItem = (id: number, newItem: ProjectItem) => {
        setProjectData(prevState => ({
            ...prevState,
            projectItems: [
                ...(prevState.projectItems || []).slice(0, id),
                newItem,
                ...(prevState.projectItems || []).slice(id + 1)
            ]

        }));
    };


    const [projectForms, setProjectForms] = useState<React.ReactNode[]>(initialProjectData?.projectItems?.map((item: ProjectItem, index: number) => (
        <ProjectForm key={index} projectCount={index + 1} updateProjectItem={updateProjectItem} initialValues={item} />
    )) || []);

    if (projectForms.length === 0) {
        setProjectForms([<ProjectForm key={0} projectCount={1} updateProjectItem={updateProjectItem} />]);
    }

    useEffect(() => {
        // Save project data to cookie whenever it changes
        if (typeof window !== 'undefined') {
            Cookies.set('projectData', JSON.stringify(projectData));
        }

    }, [projectData]);

    Cookies.set('projectData', JSON.stringify(projectData));

    const [sectionHeading, setSectionHeading] = useState(initialProjectData.sectionHeading);

    const addProject = () => {
        console.log('old add', projectData);

        const newId = projectForms.length;
        const newProjectItem: ProjectItem = {
            projectName: '',
            projectDescription: '',
            projectLink: '',
            toolsUsed: []
        };

        setProjectForms(prevForms => [
            ...prevForms,
            <ProjectForm
                key={newId}
                projectCount={newId + 1}
                updateProjectItem={updateProjectItem}
                initialValues={newProjectItem}
            />
        ]);

        setProjectData(prevData => ({
            ...prevData,
            projectItems: [...prevData.projectItems, newProjectItem]
        }));
        console.log('new add', projectData);

    };


    const removeProject = () => {
        if (projectForms.length > 1) {
            setProjectForms(projectForms.slice(0, -1));
            setProjectData(prevData => ({ ...prevData, projectItems: prevData.projectItems.slice(0, -1) }));
        }
    };

    const handleSectionHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSectionHeading = e.target.value;
        setSectionHeading(newSectionHeading);
        setProjectData(prevData => ({ ...prevData, sectionHeading: newSectionHeading }));
    };

    return (
        <main className="bg-black text-white w-full p-4 overflow-auto md:w-1/3 border border-gray-800">
            <h2 className="text-xl font-bold text-white">Projects</h2>
            <div className='mt-4 mb-8' >
                <Label htmlFor="section-heading">Section Heading</Label>
                <Input id="section-heading" placeholder="Projects" value={sectionHeading} onChange={handleSectionHeadingChange} />
            </div>

            {projectForms}

            <div className="flex space-x-2 mt-8">
                <Button className="bg-black text-emerald-400 border border-emerald-400" onClick={addProject}>
                    Add Project
                </Button>
                <Button className="bg-black text-gray-700 border border-gray-700" onClick={removeProject}>
                    Remove Project
                </Button>
            </div>
        </main>
    );
};

export default Page;
