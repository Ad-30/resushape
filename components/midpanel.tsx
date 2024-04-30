import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function MidPanel() {
    return (
        <main className="w-full p-4 overflow-auto md:w-1/3">
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">YOUR PROJECTS</h2>
                <div>
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input id="project-name" placeholder="Piper Chat" />
                </div>
                <div>
                    <Label htmlFor="project-description">Project Description</Label>
                    <Textarea id="project-description" placeholder="A video chat app with great picture quality." />
                </div>
                <div>
                    <Label htmlFor="project-link">Link to Project</Label>
                    <Input id="project-link" placeholder="http://piperchat.com" />
                </div>
                <div className="flex items-center space-x-2">
                    <Label htmlFor="tools-used">Tools Used</Label>
                    <div className="flex items-center space-x-2">
                        <Input id="tools-used" placeholder="Java" />
                        <Button variant="ghost">+</Button>
                        <Button variant="ghost">-</Button>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <Button>Add Project</Button>
                    <Button variant="destructive">Remove Project</Button>
                </div>
            </div>
        </main>
    )
}