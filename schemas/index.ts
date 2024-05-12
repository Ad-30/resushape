import * as z from "zod";

export const ProfileSchema = z.object({
    fullName: z.string().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    location: z.string().optional(),
    link: z.string().optional(),
    file: typeof window === 'undefined' ? z.any().optional() : z.instanceof(FileList).optional(),
    profilePicture: z.string().optional(),
});

export const EducationSchema = z.object({
    school: z.string().optional(),
    schoolLocation: z.string().optional(),
    degree: z.string().optional(),
    major: z.string().optional(),
    gpa: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional()
});

export const WorkSchema = z.object({
    companyName: z.string().optional(),
    jobTitle: z.string().optional(),
    jobLocation: z.string().optional(),
    position: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.array(z.string().optional()).optional(),
});

export const SkillsSchema = z.object({
    skillName: z.string().optional(),
    skillDetail: z.array(z.string().optional()).optional(),
});

export const ProjectSchema = z.object({
    projectName: z.string().optional(),
    projectDescription: z.string().optional(),
    projectLink: z.string().optional(),
    toolsUsed: z.array(z.string().optional()).optional(),
});

export const AwardsSchema = z.object({
    awardName: z.string().optional(),
    awardDate: z.string().optional(),
    awarder: z.string().optional(),
    description: z.string().optional(),
});
export type SkillFormValues = z.infer<typeof SkillsSchema>;