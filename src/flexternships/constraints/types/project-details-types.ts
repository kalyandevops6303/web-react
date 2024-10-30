

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
  
  export enum DurationType {
    WEEK = "WEEK"
  }
  
  type Document = {
    file_name: string;
    file_key: string;
    download_url?: string;
    size: number;
    created_at: number;
  }
  
  type ExpectedDuration = {
    duration: number;
    duration_type: DurationType;
    hours_per_week: number;
  }
  
export  type ProjectDetails = {
    _id: string;
    created_at: number;
    updated_at: number;
    is_deleted: boolean;
    details: {
      name: string;
      description: string;
      expected_duration: ExpectedDuration;
      expected_start_date: number;
      documents: Document[];
    };
    roles: ProjectRole[];
    listing_details: ListingDetails;
    status: ProjectStatus;
    client_user_id: string;
    org_slug_id: string;
    is_documents_sent: boolean;
    is_documents_signed: boolean;
    client_info?: ClientInfo[];
    skills_data: Skill[];
    tools_data?: Tool[];
  }
  
  type ProjectRole = {
    role_id: string;
    proficiency: {
      skills: string[];
      tools: string[];
    };
    count: number;
  }

  type ListingDetails = {
    start_date: string;
    end_date: string;
    start_date_epoch: number;
    end_date_epoch: number;
  }
  
  type ClientInfo = {
    _id: string;
    user_id: string;
    company_industry: string;
    company_logo: string;
    company_name: string;
    company_strength: number;
    company_tagline: string;
    created_at: number;
    currency_preference: string;
    educational_institute: {
      institution: string;
    }[];
    first_name: string;
    image_uri: string;
    is_deleted: boolean;
    last_name: string;
    office_address: {
      country: string;
      state: string;
      city: string;
      street_address: string;
      house_number: string;
      zip_code: string;
    };
    project_area_of_interest: {
      skills: string[];
      tools: string[];
      area: string;
    };
    projects_listed_count: number;
    rating: number;
    social_links: {
      platform: string;
      url: string;
    }[];
    title: string;
    updated_at: number;
    projects_worked_on_count: number;
    org_slug_id: string;
    is_org_admin: boolean;
    department_name: string;
  }
  
  type Skill = {
    _id: string;
    name: string;
    created_at: number;
    updated_at: number;
    is_deleted: boolean;
    assessment?: {
      assessment_id: number;
      assessment_name: string;
      created_by: string;
      is_deleted: boolean;
    };
  }
  
  type Tool = Skill;
  
  
  
  export type ProjectDetailsState = {
    isProjectsLoading: boolean;
    projectDetails: ProjectDetails;
  };
  
  export type ProjectDetailsActions = {
    getProjectDetails: (projectId: string) => Promise<void>;
  };
  
  export type ProjectStore = ProjectDetailsState & ProjectDetailsActions;
  