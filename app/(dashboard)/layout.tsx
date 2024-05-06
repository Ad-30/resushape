import BottomPanel from "@/components/bottompanel";
import LeftPanel from "@/components/leftpanel";
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