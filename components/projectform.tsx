import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from 'react';

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

export default ProjectForm;
