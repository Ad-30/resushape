'use client'
import React, { useState, useEffect } from 'react';
import WorkForm from '@/components/workform';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { WorkItem } from '@/app/interfaces';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';


const Page = () => {

    const { data: session } = useSession();

    // const savedWorkData = session?.user.resumeDetails.work;
    // const initialWorkData: { sectionHeading: string, workItems: WorkItem[] } = savedWorkData ? { sectionHeading: session.user.resumeDetails.headings.work, workItems: session.user.resumeDetails.work } : { sectionHeading: '', workItems: [] };

    const cookiesWorkData = Cookies.get('workData');
    const parsedWorkData = cookiesWorkData ? JSON.parse(cookiesWorkData) : null;

    const savedWorkData = session?.user.resumeDetails.work;
    const defaultWorkData = { sectionHeading: '', workItems: [] }

    const initialWorkData: { sectionHeading: string, workItems: WorkItem[] } = parsedWorkData?.workItems && parsedWorkData.workItems.length > 0
        ? parsedWorkData
        : savedWorkData && savedWorkData.length > 0
            ? { sectionHeading: session.user.resumeDetails.headings.work, workItems: savedWorkData }
            : defaultWorkData;

    const [workData, setWorkData] = useState<{ sectionHeading: string, workItems: WorkItem[] }>(initialWorkData);

    const updateWorkItem = (id: number, newItem: WorkItem) => {
        setWorkData(prevState => ({
            ...prevState,
            workItems: [
                ...(prevState.workItems || []).slice(0, id),
                newItem,
                ...(prevState.workItems || []).slice(id + 1)
            ]
        }));
    };
    const [workForms, setWorkForms] = useState<React.ReactNode[]>(initialWorkData?.workItems?.map((item: WorkItem, index: number) => (
        <WorkForm key={index} workCount={index + 1} updateWorkItem={updateWorkItem} initialValues={item} />
    )));
    if (workForms.length === 0) {
        setWorkForms([<WorkForm key={0} workCount={1} updateWorkItem={updateWorkItem} />]);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            Cookies.set('workData', JSON.stringify(workData));
        }

    }, [workData]);

    Cookies.set('workData', JSON.stringify(workData));

    const [sectionHeading, setSectionHeading] = useState(initialWorkData.sectionHeading);
    const addWork = () => {
        const newId = workForms.length;
        setWorkForms(prevForms => [...prevForms, <WorkForm key={prevForms.length} workCount={prevForms.length + 1} updateWorkItem={updateWorkItem} />]);
    };

    const removeWork = () => {
        if (workForms.length > 1) {
            setWorkForms(workForms.slice(0, -1));
            setWorkData(prevData => ({ ...prevData, workItems: prevData.workItems.slice(0, -1) }));
        }
    };
    const handleSectionHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSectionHeading = e.target.value;
        setSectionHeading(newSectionHeading);
        setWorkData(prevData => ({ ...prevData, sectionHeading: newSectionHeading }));
    };

    return (
        <main className="bg-black text-white w-full p-4 overflow-auto md:w-1/3 border border-gray-800">
            <h2 className="text-xl font-bold text-white">Work</h2>
            <div className='mt-4 mb-8' >
                <Label htmlFor="section-heading">Section Heading</Label>
                <Input id="section-heading" placeholder="Work" value={sectionHeading} onChange={handleSectionHeadingChange} />
            </div>

            {workForms}

            <div className="flex space-x-2 mt-8">
                <Button className="bg-black text-emerald-400 border border-emerald-400" onClick={addWork}>
                    Add Job
                </Button>
                <Button className="bg-black text-gray-700 border border-gray-700" onClick={removeWork}>
                    Remove Job
                </Button>
            </div>
        </main>
    );
};


export default Page;