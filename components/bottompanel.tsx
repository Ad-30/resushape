import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function BottomPanel() {
    return (
        <footer className="flex items-center justify-between p-4 bg-black text-white">
            <Button variant="ghost">← Prev</Button>
            <Progress className="w-1/3 mx-4 bg-gray-800" color="rgb(93,155,136)" value={40} />
            <Button variant="ghost">Next →</Button>
        </footer>

    )
}