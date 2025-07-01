import { MilestoneStatus, ProjectPrimaryStatus, ProjectSecondaryStatus } from '../enums/core-enums';
import { ListingDetails, ProjectDetails, ProjectRole } from './project-creation-types';

// Form Data Types
type Skill = {
  _id: string;
  name: string;
};

export type DashboardMilestone = {
  id: string;
  status: MilestoneStatus;
  title: string;
  duration: number;
  description: string;
  deliverables: string[];
  seq: number;
};

type TeamMemberDetails = {
  userId: string;
  roleId: string;
  roleName: string;
  firstName: string;
  lastName: string;
  imageUri?: string;
};

type ClientDetails = {
  userId: string;
  firstName: string;
  lastName: string;
  imageUri?: string;
  departmentName: string;
  corporateName: string;
};

type CohortDetails = {
  name: string;
  skills: Skill[];
};

export type DashboardProject = {
  id: string;
  primaryStatus: ProjectPrimaryStatus;
  secondaryStatus?: ProjectSecondaryStatus;
  skills: Skill[];
  details: ProjectDetails;
  roles: ProjectRole[];
  team: TeamMemberDetails[];
  clientInfo: ClientDetails;
  milestones: DashboardMilestone[];
  cohortDetails: CohortDetails;
  listingDetails: ListingDetails;
  isRead: boolean;
  isFavorite: boolean;
};
