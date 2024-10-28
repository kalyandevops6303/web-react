

export type ProjectTabType = {
    id: string,
    title: string,
    icon: JSX.Element,
    description: string,
    route: string,
    component: JSX.Element,
    talentVisible: boolean,
    clientVisible: boolean
}

export type BreadCrumbType = {
    title: string,
    link: string
}

export enum ProjectStatus {
    DRAFT = 'DRAFT',
    OPEN = 'OPEN',
    IN_REVIEW = 'IN_REVIEW',
    ACTIVE = 'ACTIVE',
    ON_GOING = 'ON_GOING',
    CLOSED = 'CLOSED',
    TERMINATED = 'TERMINATED',
    COMPLETED = 'COMPLETED'
  }
  
  export type ProjectDetails = {
    _id: string;
    created_at: number;
    updated_at: number;
    is_deleted: boolean;
    details: {
      name: string;
      description: string;
      expected_duration: {
        duration: number;
        duration_type: "WEEK";
        hours_per_week: number;
      };
      expected_start_date: number;
      documents: {
        file_name: string;
        file_key: string;
        download_url?: string; // Marked optional as it may be empty
        size: number;
        created_at: number;
      }[];
    };
    roles: {
      role_id: string;
      proficiency: {
        skills: string[];
        tools: string[];
      };
      count: number;
    }[];
    listing_details: {
      start_date: string;
      end_date: string;
      start_date_epoch: number;
      end_date_epoch: number;
    };
    status: ProjectStatus;
    client_user_id: string;
    org_slug_id: string;
    skills_data?: {
      _id: string;
      created_at: number;
      updated_at: number;
      is_deleted: boolean;
      name: string;
    }[];
    tools_data?: {
      _id: string;
      name: string;
      is_deleted: boolean;
      created_at: number;
      updated_at: number;
      assessment?: {
        assessment_id: number;
        assessment_name: string;
        created_by: string;
        is_deleted: boolean;
      };
    }[];
  };
  
  
  export type ProjectDetailsState = {
    isProjectsLoading: boolean;
    projectsList: ProjectDetails[];
    projectDetails: ProjectDetails;
  };
  
  export type ProjectDetailsActions = {
    getProjectsList: (projectsList: ProjectDetails[]) => Promise<void>;
    getProjectDetails: (projectId: string) => Promise<void>;
  };
  
  export type ProjectStore = ProjectDetailsState & ProjectDetailsActions;
  