export type TeamMemberDetails = {
  name?: string;
  profileImage?: string;
  designation?: string;
  rating?: number;
  ratingText?: string;
  ratingColor?: string;
  kudos?: number;
  wow?: number;
};

export type ProjectTabType = {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  route: string;
  component: JSX.Element;
  talentVisible: boolean;
  clientVisible: boolean;
};

export type BreadCrumbType = {
  title: string;
  link: string;
};

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  IN_REVIEW = 'IN_REVIEW',
  ACTIVE = 'ACTIVE',
  ON_GOING = 'ON_GOING',
  CLOSED = 'CLOSED',
  TERMINATED = 'TERMINATED',
  COMPLETED = 'COMPLETED',
}

export enum DurationType {
  WEEK = 'WEEK',
}

type Document = {
  fileName: string;
  fileKey: string;
  downloadUrl?: string;
  size: number;
  createdAt: number;
};

type ExpectedDuration = {
  duration: number;
  durationType: DurationType;
  hoursPerWeek: number;
};

export type ProjectDetails = {
  id: string;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  details: {
    name: string;
    description: string;
    expectedDuration: ExpectedDuration;
    expectedStartDate: number;
    documents: Document[];
  };
  roles: ProjectRole;
  listingDetails: ListingDetails;
  status: ProjectStatus;
  clientUserId: string;
  orgSlugId: string;
  isDocumentsSent: boolean;
  isDocumentsSigned: boolean;
  clientInfo?: ClientInfo[];
  skillsData: Skill[];
  toolsData?: Tool[];
};

type ProjectRole = {
  roleId: string;
  proficiency: {
    skills: string[];
    tools: string[];
  };
  count: number;
};

type ListingDetails = {
  startDate: string;
  endDate: string;
  startDateEpoch: number;
  endDateEpoch: number;
};

type ClientInfo = {
  id: string;
  userId: string;
  companyIndustry: string;
  companyLogo: string;
  companyName: string;
  companyStrength: number;
  companyTagline: string;
  createdAt: number;
  currencyPreference: string;
  educationalInstitute: {
    institution: string;
  }[];
  firstName: string;
  imageUri: string;
  isDeleted: boolean;
  lastName: string;
  officeAddress: {
    country: string;
    state: string;
    city: string;
    streetAddress: string;
    houseNumber: string;
    zipCode: string;
  };
  projectAreaOfInterest: {
    skills: string[];
    tools: string[];
    area: string;
  };
  projectsListedCount: number;
  rating: number;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  title: string;
  updatedAt: number;
  projectsWorkedOnCount: number;
  orgSlugId: string;
  isOrgAdmin: boolean;
  departmentName: string;
};

type Skill = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
};

type Tool = Skill;

export type ProjectDetailsState = {
  isProjectsLoading: boolean;
  projectDetails: ProjectDetails;
  teamDetails: Array<TeamMemberDetails>;
};

export type ProjectDetailsActions = {
  getProjectDetails: (projectId: string) => Promise<void>;
  populateTeamDetails: (projectId?: string) => Promise<void>;
  resetStore: () => void;
};

export type ProjectStore = ProjectDetailsState & ProjectDetailsActions;