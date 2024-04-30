import * as z from "zod";

export const ProfileSchema = z.object({
    fullName: z.string({
        message: "Name is required",
    }),
    email: z.string().email({
        message: "Email is required",
    }),
    phonenumber: z.string().min(10).max(10),
    location: z.string(),
    link: z.string()
});

export const EducationSchema = z.object({
    sectionHeading: z.string(),
    school: z.string(),
    schoolLocation: z.string(),
    degree: z.string(),
    major: z.string(),
    gpa: z.number(),
    startDate: z.date(),
    endDate: z.date().nullable(),
});

export const WorkSchema = z.object({
    sectionHeading: z.string(),
    company: z.string(),
    jobTitle: z.string(),
    jobLocation: z.string(),
    position: z.string(),
    startDate: z.date(),
    endDate: z.date().nullable(),
    description: z.string(),
});

export const SkillsSchema = z.object({
    sectionHeading: z.string(),
    skills: z.array(z.string()),
});

export const ProjectSchema = z.object({
    // sectionHeading: z.string(),
    projectName: z.string(),
    projectDescription: z.string(),
    projectLink: z.string(),
    toolsUsed: z.array(z.string()),
});

export const AwardsSchema = z.object({
    sectionHeading: z.string(),
    awardName: z.string(),
    awardDate: z.date(),
    awarder: z.string(),
    description: z.string(),
});