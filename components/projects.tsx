'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import ProjectForm from "./projectform";

interface ProjectFormProps {
    key: number;
    projectCount: number;
}

const ProjectForm: React.FC<ProjectFormProps> = (props) => {
    const [toolsCount, setToolsCount] = useState(1);

    const handleAddTool = () => {
        setToolsCount(prevCount => prevCount + 1);
    };

    const handleRemoveTool = () => {
        if (toolsCount > 1) {
            setToolsCount(prevCount => prevCount - 1);
        }
    };

    return (
        <div className="space-y-4 mt-8">
            <hr className="border-t-4 border-emerald-400" />

            <div className="flex justify-center">
                <Button className="border rounded-full bg-transparent text-emerald-400 border-gray-700 hover:border-emerald-400 hover:text-emerald-400">{props.projectCount}</Button>
            </div>

            <div>
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="Piper Chat" />
            </div>
            <div>
                <Label htmlFor="project-description">Project Description</Label>
                <Input id="project-description" placeholder="A video chat app with great picture quality." />
            </div>
            <div>
                <Label htmlFor="project-link">Link to Project</Label>
                <Input id="project-link" placeholder="http://piperchat.com" />
            </div>

            <Label >Tools used</Label>
            {[...Array(toolsCount)].map((_, index) => (
                <div key={index}>
                    <Input id={`tool-${index}`} placeholder="Java" />
                </div>
            ))}

            <div className="flex items-center space-x-2">
                <Button className="border rounded-full bg-transparent text-emerald-400 border-gray-700 hover:border-emerald-400 hover:text-emerald-400" onClick={handleAddTool}>+</Button>
                <Button className="border rounded-full bg-transparent text-emerald-400 border-gray-700 hover:border-emerald-400 hover:text-emerald-400" onClick={handleRemoveTool}>-</Button>
            </div>
        </div>
    );
}

// export default ProjectForm;

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
