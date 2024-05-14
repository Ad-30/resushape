import connectToDb from "@/lib/connectToDb";
import Resume, { ResumeDocument } from "@/models/Resume";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export const POST = async (request: Request) => {

    await connectToDb();

    const session = await getServerSession(options);

    const { selectedTemplate, basics, education, work, skills, projects, awards } = await request.json()

    // console.log(profile, education, work, skills, projects, awards);

    try {

        const existingResume = await Resume.findOne({
            creator: session?.user.id
        }).populate('creator');

        if (existingResume) {
            existingResume.selectedTemplate = selectedTemplate
            existingResume.headings = {
                education: education.sectionHeading,
                work: work.sectionHeading,
                skills: skills.sectionHeading,
                projects: projects.sectionHeading,
                awards: awards.sectionHeading
            }
            existingResume.basics = basics.profile;
            existingResume.education = education.educationItems;
            existingResume.work = work.workItems;
            existingResume.skills = skills.skillsItems;
            existingResume.projects = projects.projectItems;
            existingResume.awards = awards.awardsItems;
            await existingResume.save();

        } else {
            const resume: ResumeDocument = new Resume({
                creator: session?.user.id,
                selectedTemplate: selectedTemplate,
                headings: {
                    education: education.sectionHeading,
                    work: work.sectionHeading,
                    skills: skills.sectionHeading,
                    projects: projects.sectionHeading,
                    awards: awards.sectionHeading
                },
                basics: basics.profile,
                education: education.educationItems,
                work: work.workItems,
                skills: skills.skillsItems,
                projects: projects.projectItems,
                awards: awards.awardsItems
            });

            await resume.save();
        }


        return Response.json(
            {
                success: true,
                message: 'Resume created successfully'
            },
            { status: 201 }
        )

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Resume could not be saved'
            },
            { status: 500 }
        )
    }


}

export const GET = async (request: Request) => {

    await connectToDb();

    try {

        const Resumes = Resume.find({}).populate('creator');

        return Response.json(
            {
                success: true,
                data: Resumes
            },
            { status: 200 }
        )

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Could not fetch resumes'
            },
            { status: 500 }
        )
    }
}

export const DELETE = async (request: Request) => {

    const session = await getServerSession(options);
    await connectToDb();

    try {

        if (Boolean(session?.user.resumeDetails)) {
            await Resume.findByIdAndDelete(session?.user.resumeDetails._id);

            return Response.json(
                {
                    success: true,
                    message: 'Resume deleted successfully'
                },
                { status: 200 }
            )
        }
        return Response.json(
            {
                success: false,
                message: 'Resume not found'
            },
            { status: 404 }
        )

    } catch (error) {
        console.log(error);

        return Response.json(
            {
                success: false,
                message: 'Could not delete resume'
            },
            { status: 500 }
        )
    }

}