import { FlexternUserAppRole, FlexternUserCheckpoint, UserType } from '../enums/core-enums';

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
