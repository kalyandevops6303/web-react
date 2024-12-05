import { FlexternUserAppRole, FlexternUserCheckpoint, GlobalModalType, UserType } from '../enums/core-enums';

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
  name: string;
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
  accountStatus: 'ACTIVE'; // Assuming these are the possible account statuses
  phone: string;
  phoneCountry: {
    code: string;
    dialCode: string;
    name: string;
  };
  isBlocked?: boolean;
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

// App Types
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
  metadata?: Record<string, string>;
};

export type AppState = {
  isWip: boolean;
  modal: GlobalModalType | undefined;
  modalContent: GlobalModalContent | undefined;
  modalActions: GlobalModalActions | undefined;
};

export type AppActions = {
  openModal: (
    modalType: GlobalModalType,
    modalActions?: GlobalModalActions,
    modalContent?: Partial<GlobalModalContent>,
    metadata?: Record<string, string>,
  ) => void;
  closeModal: () => void;
  setWip: (modalContent: GlobalModalContent, modalActions: GlobalModalActions) => void;
  unsetWip: () => void;
  resetStore: () => void;
};

export type AppStore = AppState & AppActions;
