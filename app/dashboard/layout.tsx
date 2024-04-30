import Generator from "@/components/generator";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        // <div className="relative h-full">

        <main >
            <Generator />
            {children}
        </main>
        // </div>
    )
}

export default DashboardLayout;