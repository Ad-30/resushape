'use client'
import React, { useState, useEffect } from 'react';
import EducationForm from '@/components/educationform';;
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EducationItem } from '@/app/interfaces'
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';

const Page = () => {

    const { data: session } = useSession();

    // const savedEducationData = session?.user.resumeDetails.education;
    // const initialEducationData: { sectionHeading: string, educationItems: EducationItem[] } = savedEducationData ? { sectionHeading: session.user.resumeDetails.headings.education, educationItems: savedEducationData } : { sectionHeading: '', educationItems: [] };

    const cookiesEducationData = Cookies.get('educationData');
    const parsedEducationData = cookiesEducationData ? JSON.parse(cookiesEducationData) : null;

    const savedEducationData = session?.user?.resumeDetails?.education;
    const defaultEducationData = { sectionHeading: '', educationItems: [] }

    const initialEducationData: { sectionHeading: string, educationItems: EducationItem[] } = parsedEducationData?.educationItems && (parsedEducationData.educationItems.length > 0 || parsedEducationData.sectionHeading !== "")
        ? parsedEducationData
        : savedEducationData && (savedEducationData.length > 0 || session.user.resumeDetails.headings.education !== '')
            ? { sectionHeading: session.user.resumeDetails.headings.education, educationItems: savedEducationData }
            : defaultEducationData;

    const [educationData, setEducationData] = useState<{ sectionHeading: string, educationItems: EducationItem[] }>(initialEducationData);

    const updateEducationItem = (id: number, newItem: EducationItem) => {
        setEducationData(prevState => ({
            ...prevState,
            educationItems: [
                ...(prevState.educationItems || []).slice(0, id),
                newItem,
                ...(prevState.educationItems || []).slice(id + 1)
            ]
        }));
    };
    const [educationForms, setEducationForms] = useState<React.ReactNode[]>(initialEducationData?.educationItems?.map((item: EducationItem, index: number) => (
        <EducationForm key={index} educationCount={index + 1} updateEducationItem={updateEducationItem} initialValues={item} />
    )));
    if (educationForms.length === 0) {
        setEducationForms([<EducationForm key={0} educationCount={1} updateEducationItem={updateEducationItem} />]);
    }
    useEffect(() => {
        // Save project data to cookie whenever it changes
        if (typeof window !== 'undefined') {
            Cookies.set('educationData', JSON.stringify(educationData));
            // console.log(educationData);
        }

    }, [educationData]);

    Cookies.set('educationData', JSON.stringify(educationData));

    const [sectionHeading, setSectionHeading] = useState(initialEducationData.sectionHeading);

    const addSchool = () => {
        const newId = educationForms.length;
        setEducationForms(prevForms => [...prevForms, <EducationForm key={prevForms.length} educationCount={prevForms.length + 1} updateEducationItem={updateEducationItem} />]);
    };

    const removeSchool = () => {
        if (educationForms.length > 1) {
            setEducationForms(educationForms.slice(0, -1));
            setEducationData(prevData => ({ ...prevData, awardsItems: prevData.educationItems.slice(0, -1) }));
        }
    };
    const handleSectionHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSectionHeading = e.target.value;
        setSectionHeading(newSectionHeading);
        setEducationData(prevData => ({ ...prevData, sectionHeading: newSectionHeading }));
    };

    return (
        <main className="bg-black text-white w-full p-4 overflow-auto md:w-1/3 border border-gray-800">
            <h2 className="text-xl font-bold text-white">YOUR EDUCATIONAL BACKGROUND</h2>
            <div className='mt-4 mb-8' >
                <Label htmlFor="section-heading">Section Heading</Label>
                <Input id="section-heading" placeholder="Education" value={sectionHeading} onChange={handleSectionHeadingChange} />
            </div>

            {educationForms}

            <div className="flex space-x-2 mt-8">
                <Button className="bg-black text-emerald-400 border border-emerald-400" onClick={addSchool}>
                    Add School
                </Button>
                <Button className="bg-black text-gray-700 border border-gray-700" onClick={removeSchool}>
                    Remove School
                </Button>
            </div>
        </main>
    );
};


export default Page;