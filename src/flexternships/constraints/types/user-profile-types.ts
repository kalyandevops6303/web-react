import { ClientDelegateRole } from '../enums/profile-enums';
import { City, CompanyIndustry, Country, State, Timezone } from './core-types';

export type FlexternClientAccountDetails = {
  firstname: string;
  lastname: string;
  timezone: Timezone;
  imageUri?: string; // submits file key gets public uri
};

export enum CompanyStrength {
  '1-100' = 100,
  '100-500' = 500,
  '500-1000' = 1000,
  '1000+' = 1001,
}

export type FlexternClientCompanyDetails = {
  department: string;
  companyLogo: string;
  title: string;
  companyTagline: string;
  companyIndustry: CompanyIndustry;
  companyStrength: CompanyStrength;
  officeAddress: {
    country: Country;
    state: State;
    city: City;
    streetAddress: string;
    buildingNumber: string;
    zipCode: string;
  };
};

export type FlexternClientSocialDetails = {
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
};

export type FlexternClientProfileDetails = FlexternClientAccountDetails &
  FlexternClientCompanyDetails &
  FlexternClientSocialDetails;

export type FlexternUserProfileForm = {
  currentTabIndex: number;
  isProfileDetailsLoading: boolean;
  profileDetails: FlexternClientProfileDetails;
};

export type FlexternUserProfileFormActions = {
  populateClientInfoDetails: () => Promise<void>; // includes account details
  populateClientOrgDetails: () => Promise<void>;
  upsertClientAccountInfo: (data: FlexternClientAccountDetails) => Promise<void>;
  nextTab: () => void;
  previousTab: () => void;
  updateClientSocialInfo: (data: FlexternClientSocialDetails) => Promise<void>;
  updateClientCompanyInfo: (data: FlexternClientCompanyDetails) => Promise<void>;
  resetStore: () => void;
  setCurrentTabIndex: (index: number) => void;
};

export type FlexternUserProfileStore = FlexternUserProfileForm & FlexternUserProfileFormActions;

// Public Profile Types
export type FlexternClientPublicProfileDetails = {
  firstname: string;
  lastname: string;
  imageUri?: string;
  title: string;
  completedProjectsCount: number;
  openListingsCount: number;
  companyDetails: {
    companyLogo: string;
    companyName: string;
    companyTagline: string;
  };
  officeAddress: {
    country: string;
    state: string;
    city: string;
    streetAddress: string;
    houseNumber: string;
    zipCode: string;
  };
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  delegates: Array<{
    firstname: string;
    lastname: string;
    imageUri: string;
    delegateType: ClientDelegateRole | undefined;
  }>;
};

export type FlexternClientProjectDetails = {
  metadata: {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    hasNextPage: boolean;
  };
  projects: Array<{
    id: string;
    name: string;
    description: string;
    roles: string[];
  }>;
};
