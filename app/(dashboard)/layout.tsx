import BottomPanel from "@/components/bottompanel";
import Generator from "@/components/generator";
import LeftPanel from "@/components/leftpanel";
import MidPanel from "@/components/midpanel";
import RightPanel from "@/components/rightpanel";
import TopPanel from "@/components/toppanel";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="flex flex-col h-screen">
            <TopPanel />
            <div className="flex flex-1 overflow-hidden">
                <LeftPanel />
                {children}
                {/* <MidPanel /> */}
                <RightPanel />
            </div>
            <BottomPanel />
        </main>
    )
}

export default DashboardLayout;