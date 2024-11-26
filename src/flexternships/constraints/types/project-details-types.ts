import { PrimaryProjectStatus } from '../enums/project-enums';

export enum DurationType {
  WEEK = 'WEEK',
}

export type TeamMemberDetails = {
  id: string;
  name?: string;
  profileImage?: string;
  designation?: string;
  averageRating?: number;
  ratingText?: string;
  ratingColor?: string;
  appreciationScore?: number;
};

export type BadgeType = {
  id: string;
  name: string;
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

type StatusLog = {
  [key: string]: Array<{ [subKey: string]: number }>;
};

export type ProjectDetails = {
  [x: string]: any;
  id: string;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  postedAt: number;
  details: {
    name: string;
    description: string;
    expectedDuration: ExpectedDuration;
    expectedStartDate: number;
    documents: Document[];
  };
  roles: ProjectRole[];
  listingDetails: ListingDetails;
  status: PrimaryProjectStatus;
  clientUserId: string;
  orgSlugId: string;
  isDocumentsSent: boolean;
  isDocumentsSigned: boolean;
  clientInfo: ClientInfo;
  skillsData: Skill[];
  toolsData?: Tool[];
  clientDetails?: ClientInfo;
  secondaryStatus: SecondaryStatus;
};

type ProjectRole = {
  id: string;
  name: string;
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
};

type Tool = Skill;

type SecondaryStatus = {
  id: string;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  statusLog: StatusLog;
  next: string;
  entity: {
    entityType: string;
    entityId: string;
  };
  projectId: string;
};

export type ProjectDetailsState = {
  isProjectsLoading: boolean;
  projectDetails: ProjectDetails;
  isTeamDetailsLoading: boolean;
  teamDetails: Array<TeamMemberDetails>;
  projectInvitationDetails: any;
  isProjectInvitationDetailsLoading: boolean;
  performanceDetails: any;
  isPerformanceDetailsLoading: boolean;
};

export type ProjectDetailsActions = {
  getProjectDetails: (projectId: string) => Promise<void>;
  populateTeamDetails: (projectId?: string) => Promise<void>;
  resetStore: () => void;
  getProjectInvitationDetails: (projectId: string) => Promise<void>;
  getSelfOrTeamPerformanceDetails: (projectId: string, feedbackType: string) => Promise<void>;
  getPeerOrIndividualPerformanceDetails: (milestoneId: string, feedbackType: string) => Promise<void>;
};

export type ProjectStore = ProjectDetailsState & ProjectDetailsActions;
