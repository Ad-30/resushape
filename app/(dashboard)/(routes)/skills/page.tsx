'use client'
import React, { useState, useEffect } from 'react';
import SkillsForm from '@/components/skillsform';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SkillsItem } from '@/app/interfaces';
import Cookies from 'js-cookie';



const Page = () => {
    const savedSkillsData = Cookies.get('skillsData');
    const initialSkillsData: { sectionHeading: string, skillsItems: SkillsItem[] } = savedSkillsData ? JSON.parse(savedSkillsData) : { sectionHeading: '', skillsItems: [] };
    const [skillsData, setSkillsData] = useState<{ sectionHeading: string, skillsItems: SkillsItem[] }>(initialSkillsData);
    const updateSkillsItem = (id: number, newItem: SkillsItem) => {
        setSkillsData(prevState => ({
            ...prevState,
            skillsItems: [
                ...(prevState.skillsItems || []).slice(0, id),
                newItem,
                ...(prevState.skillsItems || []).slice(id + 1)
            ]
        }));
    };

    const [skillsForms, setSkillsForms] = useState<React.ReactNode[]>(initialSkillsData?.skillsItems?.map((item: SkillsItem, index: number) => (
        <SkillsForm key={index} skillsCount={index + 1} updateSkillsItem={updateSkillsItem} initialValues={item} />
    )));
    if (skillsForms.length === 0) {
        setSkillsForms([<SkillsForm key={0} skillsCount={1} updateSkillsItem={updateSkillsItem} />]);
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            Cookies.set('skillsData', JSON.stringify(skillsData));
        }

    }, [skillsData]);
    const [sectionHeading, setSectionHeading] = useState(initialSkillsData.sectionHeading);
    const addSkill = () => {
        const newId = skillsForms.length;
        setSkillsForms(prevForms => [...prevForms, <SkillsForm key={prevForms.length} skillsCount={prevForms.length + 1} updateSkillsItem={updateSkillsItem} />]);
    };


    const removeSkill = () => {
        if (skillsForms.length > 1) {
            setSkillsForms(skillsForms.slice(0, -1));
            setSkillsData(prevData => ({ ...prevData, skillsItems: prevData.skillsItems.slice(0, -1) }));
        }
    };
    const handleSectionHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSectionHeading = e.target.value;
        setSectionHeading(newSectionHeading);
        setSkillsData(prevData => ({ ...prevData, sectionHeading: newSectionHeading }));
    };

    return (
        <main className="bg-black text-white w-full p-4 overflow-auto md:w-1/3 border border-gray-800">
            <h2 className="text-xl font-bold text-white">Skills</h2>
            <div className='mt-4 mb-8' >
                <Label htmlFor="section-heading">Section Heading</Label>
                <Input id="section-heading" placeholder="Skills" value={sectionHeading} onChange={handleSectionHeadingChange} />
            </div>

            {skillsForms}

            <div className="flex space-x-2 mt-8">
                <Button className="bg-black text-emerald-400 border border-emerald-400" onClick={addSkill}>
                    Add Skill
                </Button>
                <Button className="bg-black text-gray-700 border border-gray-700" onClick={removeSkill}>
                    Remove Skill
                </Button>
            </div>
        </main>
    );
};


export default Page;