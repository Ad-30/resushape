'use client'
import React, { useState, useEffect, useContext } from 'react';
import AwardsForm from '@/components/awardsform';;
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AwardsItem } from '@/app/interfaces'
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { convertToApplicantData } from '@/utils/dataConversion';
import ResumeContext from '@/context/ResumeContext';

const Page = () => {

    const { data: session } = useSession();
    const { awardsData, setAwardsData } = useContext(ResumeContext);

    const cookiesAwardsData = Cookies.get('awardsData');
    const parsedAwardsData = cookiesAwardsData ? JSON.parse(cookiesAwardsData) : null;

    const savedAwardsData = session?.user?.resumeDetails?.awards;
    const defaultAwardsData = { sectionHeading: '', awardsItems: [] };

    const initialAwardsData: { sectionHeading: string, awardsItems: AwardsItem[] } = parsedAwardsData?.awardsItems && (parsedAwardsData.awardsItems.length > 0 || parsedAwardsData.sectionHeading !== "")
        ? parsedAwardsData
        : savedAwardsData && (savedAwardsData.length > 0 || session?.user.resumeDetails.headings.awards !== "")
            ? { sectionHeading: session?.user.resumeDetails.headings.awards, awardsItems: savedAwardsData }
            : defaultAwardsData;

    // const [awardsData, setAwardsData] = useState<{ sectionHeading: string, awardsItems: AwardsItem[] }>(initialAwardsData);

    const updateAwardsItem = (id: number, newItem: AwardsItem) => {
        setAwardsData(prevState => ({
            ...prevState,
            awardsItems: [
                ...(prevState.awardsItems || []).slice(0, id),
                newItem,
                ...(prevState.awardsItems || []).slice(id + 1)
            ]
        }));
    };

    const [awardsForms, setAwardsForms] = useState<React.ReactNode[]>("" || initialAwardsData?.awardsItems?.map((item: AwardsItem, index: number) => (
        <AwardsForm key={index} awardsCount={index + 1} updateAwardsItem={updateAwardsItem} initialValues={item} />
    )));
    if (awardsForms.length === 0) {
        setAwardsForms([<AwardsForm key={0} awardsCount={1} updateAwardsItem={updateAwardsItem} />]);
    }

    useEffect(() => {
        // Save project data to cookie whenever it changes
        if (typeof window !== 'undefined') {
            Cookies.set('awardsData', JSON.stringify(awardsData));
        }

    }, [awardsData]);

    Cookies.set('awardsData', JSON.stringify(awardsData));

    const [sectionHeading, setSectionHeading] = useState(initialAwardsData.sectionHeading);

    const addAward = () => {
        const newId = awardsForms.length;
        setAwardsForms(prevForms => [...prevForms, <AwardsForm key={prevForms.length} awardsCount={prevForms.length + 1} updateAwardsItem={updateAwardsItem} />]);
    };


    const removeAward = () => {
        if (awardsForms.length > 1) {
            setAwardsForms(awardsForms.slice(0, -1));
            setAwardsData(prevData => ({ ...prevData, awardsItems: prevData.awardsItems.slice(0, -1) }));
        }
    };
    const handleSectionHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSectionHeading = e.target.value;
        setSectionHeading(newSectionHeading);
        setAwardsData(prevData => ({ ...prevData, sectionHeading: newSectionHeading }));
    };

    return (
        <main className="bg-black text-white w-full p-4 overflow-auto md:w-1/3 border border-gray-800">
            <h2 className="text-xl font-bold text-white">Awards</h2>
            <div className='mt-4 mb-8' >
                <Label htmlFor="section-heading">Section Heading</Label>
                <Input id="section-heading" placeholder="Awards" value={sectionHeading} onChange={handleSectionHeadingChange} />
            </div>

            {awardsForms}

            <div className="flex space-x-2 mt-8">
                <Button className="bg-black text-emerald-400 border border-emerald-400" onClick={addAward}>
                    Add Award
                </Button>
                <Button className="bg-black text-gray-700 border border-gray-700" onClick={removeAward}>
                    Remove Award
                </Button>
            </div>
        </main>
    );
};


export default Page;