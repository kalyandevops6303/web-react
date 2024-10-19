import { FlexternUserAppRole, FlexternUserCheckpoint, UserType } from "../enums/core-enums";

// Static Data Types

export type Skill = {
    _id: string
    name: string
}

export type Tool = {
    _id: string
    name: string
}

export type Role = {
    _id: string
    name: string
}

export type CompanyIndustry = {
    _id: string
    name: string
}

export type Country = {
    _id: string
    name: string
}

export type State = {
    _id: string
    name: string
}

export type City = {
    _id: string
    name: string
}


export type FlexternClientDetails = {
    id: string;
    userType: UserType;
    email: string;
    phoneVerified: boolean;
    appRoles: Array<FlexternUserAppRole>;
    checkpoint: FlexternUserCheckpoint;
    emailVerified: boolean;
    countryCode: string;
    oauthType: string;
    accountStatus: "ACTIVE"; // Assuming these are the possible account statuses
    phone: string;
    phoneCountry: {
      code: string;
      dialCode: string;
      name: string;
    }
}

export type FlexternTalentDetails = {
    id: string;
    userType: UserType;
    appRoles: Array<FlexternUserAppRole>;
    checkpoint: FlexternUserCheckpoint;
}


export type FlexternUser = {
    isUserDetailsLoading: boolean;
    userDetails: FlexternClientDetails | FlexternTalentDetails;
}

export type FlexternUserActions = {
    populateUserDetails: () => Promise<void>;
}

export type FlexternUserStore = FlexternUser & FlexternUserActions;