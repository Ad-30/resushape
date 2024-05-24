interface ConvertedEducation {
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    location: string;
}

interface ConvertedWork {
    company: string;
    location?: string;
    position: string;
    website?: string;
    startDate: string;
    endDate: string;
    highlights?: string[];
}

interface ConvertedSkill {
    name: string;
    level?: string;
    keywords: string[];
}

interface ConvertedProject {
    name: string;
    url?: string;
    keywords: string[];
    description: string;
}

interface ConvertedAward {
    awarder?: string;
    title: string;
    date: string;
    summary?: string;
}

export interface ConvertedApplicantData {
    selectedTemplate: Number;
    headings: {
        work: string;
        projects: string;
        awards: string;
        education: string;
        skills: string;
    };
    basics: {
        name: string;
        email: string;
        phone: string;
        website?: string;
        location: {
            address: string;
        };
    };
    education: ConvertedEducation[];
    work: ConvertedWork[];
    skills: ConvertedSkill[];
    projects: ConvertedProject[];
    awards: ConvertedAward[];
    sections: string[];
}

export function convertToApplicantData(data: any): ConvertedApplicantData {
    console.log(data);
    const convertedData: ConvertedApplicantData = {
        selectedTemplate: data.selectedTemplate,
        headings: data.headings,
        basics: {
            name: data.basics.fullName,
            email: data.basics.email,
            phone: data.basics.phoneNumber,
            website: data.basics.link,
            location: {
                address: data.basics.location
            }
        },
        education: data.education.map((edu: any) => ({
            institution: edu.school,
            area: edu.major,
            studyType: edu.degree,
            startDate: edu.startDate,
            endDate: edu.endDate,
            gpa: edu.gpa,
            location: edu.schoolLocation
        })),
        work: data.work.map((job: any) => ({
            company: job.companyName,
            location: job.jobLocation,
            position: job.position,
            startDate: job.startDate,
            endDate: job.endDate,
            highlights: job.description
        })),
        skills: data.skills.map((skill: any) => ({
            name: skill.skillName,
            keywords: skill.skillDetail
        })),
        projects: data.projects.map((project: any) => ({
            name: project.projectName,
            url: project.projectLink,
            keywords: project.toolsUsed,
            description: project.projectDescription
        })),
        awards: data.awards.map((award: any) => ({
            awarder: award.awarder,
            title: award.awardName,
            date: award.awardDate,
            summary: award.description
        })),
        sections: Object.keys(data.headings)
    };

    return convertedData;
}

