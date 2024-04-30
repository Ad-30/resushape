'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ProjectForm from "./projectform";

export default function Projects() {
    const [projectForms, setProjectForms] = useState([<ProjectForm key={0} projectCount={1} />]);

    const addProjectForm = () => {
        setProjectForms(prevForms => [...prevForms, <ProjectForm key={prevForms.length} projectCount={prevForms.length + 1} />]);
    };

    const removeProjectForm = () => {
        if (projectForms.length > 1) {
            setProjectForms(prevForms => prevForms.slice(0, -1));
        }
    };

    return (
        <main className="bg-black text-white w-full p-4 overflow-auto md:w-1/3 border border-gray-800">
            <h2 className="text-xl font-bold text-white">YOUR PROJECTS</h2>
            <div >
                <Label htmlFor="section-heading">Section Heading</Label>
                <Input id="section-heading" placeholder="Projects" />
            </div>
            {projectForms}
            <div className="flex space-x-2 mt-8">
                <Button onClick={addProjectForm} className="bg-black text-emerald-400 border border-emerald-400">Add Project</Button>
                <Button onClick={removeProjectForm} className="bg-black text-gray-700 border border-gray-700">Remove Project</Button>
            </div>
        </main>
    );
}
