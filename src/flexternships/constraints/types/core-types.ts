import {
  FlexternUserAppRole,
  FlexternUserCheckpoint,
  GlobalModalType,
  UserType,
  MessageRole,
  UserStatus,
  UserInvitationType,
} from '../enums/core-enums';

// Paginated Data Types

export type ParsedPaginatedData<T = any> = {
  metadata: {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    hasNextPage: boolean;
  };
  data: (T & { id: string; name: string })[];
};

export type PaginatedData<T = any> = {
  metadata: {
    current_page: number;
    page_size: number;
    total_records: number;
    has_next_page: boolean;
  };
  data: (T & { _id: string; name: string })[];
};

// Static Data Types

export type Skill = {
  _id: string;
  name: string;
};

export type Tool = {
  _id: string;
  name: string;
};

export type Role = {
  _id: string;
  role_id: string;
  name: string;
  proficiency: {
    skills?: string[];
    tools?: string[];
  };
  count: number;
};

export type CompanyIndustry = {
  _id: string;
  name: string;
};

export type Country = {
  _id: string;
  name: string;
};

export type State = {
  _id: string;
  name: string;
};

export type City = {
  _id: string;
  name: string;
};

export type Timezone = {
  _id?: string;
  name: string;
  offset?: number;
  offsetName?: string;
  abbreviation?: string;
};

export type FlexternClientDetails = {
  id: string;
  userType: UserType;
  firstName: string;
  lastName: string;
  timezone: Timezone;
  departmentName: string;
  email: string;
  phoneVerified: boolean;
  appRoles: Array<FlexternUserAppRole>;
  checkpoint: FlexternUserCheckpoint;
  emailVerified: boolean;
  countryCode: string;
  oauthType: string;
  accountStatus: 'ACTIVE';
  phone: string;
  phoneCountry: {
    code: string;
    dialCode: string;
    name: string;
  };
  isBlocked?: boolean;
  adminClient?: {
    department: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUri?: string;
    title: string;
    companyName: string;
  };
};

export type FlexternTalentDetails = {
  id: string;
  userType: UserType;
  firstName: string;
  lastName: string;
  timezone: Timezone;
  email: string;
  phone: string;
  countryCode: string;
  appRoles: Array<FlexternUserAppRole>;
  checkpoint: FlexternUserCheckpoint;
  phoneCountry: {
    code: string;
    dialCode: string;
    name: string;
  };
  isBlocked?: boolean;
};

export type FlexternUser = {
  isUserDetailsLoading: boolean;
  userDetails: FlexternClientDetails | FlexternTalentDetails;
};

export type FlexternUserActions = {
  populateUserDetails: (force?: boolean) => Promise<void>;
  resetStore: () => void;
};

export type FlexternUserStore = FlexternUser & FlexternUserActions;

export type GlobalModalActions = {
  onConfirm: () => Promise<void>;
  onClose: () => void;
  onCancel: () => void;
};

export type GlobalModalContent = {
  title: string;
  description: string;
  confirmButtonText: string;
  cancelButtonText: string;
  metadata?: { nextPath?: string } & Record<string, string>;
};

export type AppState = {
  isWip: boolean;
  modal: GlobalModalType | undefined;
  modalContent: GlobalModalContent | undefined;
  modalActions: GlobalModalActions | undefined;
  unreadNotificationsCount: number;
};

export type AppActions = {
  openModal: (
    modalType: GlobalModalType,
    modalActions?: GlobalModalActions,
    modalContent?: Partial<GlobalModalContent>,
    metadata?: { nextPath?: string } & Record<string, string>,
  ) => void;
  closeModal: () => void;
  setWip: (modalContent: GlobalModalContent, modalActions: GlobalModalActions) => void;
  unsetWip: () => void;
  getCurrentNextPath: () => string | undefined;
  fetchNotificationsCount: () => void;
  resetStore: () => void;
};

export type AppStore = AppState & AppActions;

export type ValidatedRequestToken = {
  invitationByUserId: string;
  emailInvited: string;
  projectId: string;
  invitationType: UserInvitationType;
  userStatus: UserStatus;
};

export type Feature = {
  featureId: string;
  featureName: string;
};

export type ChatMessage = {
  role: MessageRole;
  content: any;
  projects?: ChatProject[];
  domain?: string;
};

export type ChatMilestone = {
  title: string;
  description: string;
  time: string;
  roles: string[];
  deliverables: string[];
};

export type ChatProject = {
  title: string;
  description: string;
  domain?: string;
  milestones?: Array<ChatMilestone>;
  skills?: string[];
  tools?: string[];
  duration?: string;
  teamSize?: number;
  roles?: Role[];
};

export type WebSocketMessage = {
  message_type: 'initial' | 'clarification' | 'number_request' | 'projects' | 'error';
  content: any;
  projects?: Array<ChatProject>;
  num_projects?: number;
  domain?: string;
};
