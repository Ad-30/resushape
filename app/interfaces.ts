export interface AwardsFormProps {
    key: number;
    awardsCount: number;
    updateAwardsItem: any;
    initialValues?: AwardsItem;
}

export interface AwardsItem {
    awardName: string;
    awardDate: string;
    awarder: string;
    description: string;
}

export interface EducationFormProps {
    key: number;
    educationCount: number;
    updateEducationItem: any;
    initialValues?: EducationItem;
}

export interface EducationItem {
    school: string;
    schoolLocation: string;
    degree: string;
    major: string;
    gpa: string;
    startDate: string;
    endDate: string;
}

export interface ProjectFormProps {
    key: number;
    projectCount: number;
    updateProjectItem: any;
    initialValues?: ProjectItem;
}
export interface ProjectItem {
    projectName: string,
    projectDescription: string,
    projectLink: string,
    toolsUsed: string[],
}

export interface SkillsFormProps {
    key: number;
    skillsCount: number;
    updateSkillsItem: any;
    initialValues?: SkillsItem;
}

export interface SkillsItem {
    skillName: string;
    skillDetail: string[];
}

export interface WorkFormProps {
    key: number;
    workCount: number;
    updateWorkItem: any;
    initialValues?: WorkItem;
}
export interface WorkItem {
    companyName: string,
    jobTitle: string,
    jobLocation: string,
    position: string,
    startDate: string,
    endDate: string,
    description: string[],
}

export interface ProfileData {
    fullName: string,
    email: string,
    phoneNumber: string,
    location: string,
    link: string,
    profilePicture: string,
    fileName: string,
}
