import mongoose, { Document, Schema, models } from 'mongoose';

interface Headings {
    education: string;
    work: string;
    skills: string;
    projects: string;
    awards: string;
}

interface Basics {
    fullName: string;
    email: string;
    phoneNumber: string;
    location: string;
    link: string;
    profilePicture: string;
    fileName: string,
}

interface Education {
    school: string;
    schoolLocation: string;
    degree: string;
    major: string;
    gpa: string;
    startDate: string;
    endDate: string;
}

interface Work {
    companyName: string;
    jobTitle: string;
    jobLocation: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string[];
}

interface Skill {
    skillName: string;
    skillDetail: string[];
}

interface Project {
    projectName: string;
    projectDescription: string;
    projectLink: string;
    toolsUsed: string[];
}

interface Award {
    awardName: string;
    awardDate: string;
    awarder: string;
    description: string;
}

export interface ResumeDocument extends Document {
    creator: Schema.Types.ObjectId;
    selectedTemplate: Number;
    headings: Headings;
    basics: Basics;
    education: Education[];
    work: Work[];
    skills: Skill[];
    projects: Project[];
    awards: Award[];
}

const resumeSchema = new Schema<ResumeDocument>({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    selectedTemplate: Number,
    headings: {
        education: String,
        work: String,
        skills: String,
        projects: String,
        awards: String,
    },
    basics: {
        fullName: String,
        email: String,
        phoneNumber: String,
        location: String,
        link: String,
        profilePicture: String,
        fileName: String,
    },
    education: [
        {
            school: String,
            schoolLocation: String,
            degree: String,
            major: String,
            gpa: String,
            startDate: String,
            endDate: String,
        },
    ],
    work: [
        {
            companyName: String,
            jobTitle: String,
            jobLocation: String,
            position: String,
            startDate: String,
            endDate: String,
            description: [String],
        },
    ],
    skills: [
        {
            skillName: String,
            skillDetail: [String],
        },
    ],
    projects: [
        {
            projectName: String,
            projectDescription: String,
            projectLink: String,
            toolsUsed: [String],
        },
    ],
    awards: [
        {
            awardName: String,
            awardDate: String,
            awarder: String,
            description: String,
        },
    ],
});

const Resume = models.Resume || mongoose.model<ResumeDocument>('Resume', resumeSchema);

export default Resume;
