import { FlexternUserAppRole, FlexternUserCheckpoint, UserType } from "../enums/core-enums";

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

export type FlexternClientAccountDetails = {
    firstname: string;
    lastname: string;
    imageUri: string;
}

export type FlexternClientCompanyDetails = {
    companyName: string;
    companyLogo: string;
    title: string;
    companyTagline: string;
    companyIndustry: string;
    companyStrength: number;
    officeAddress: {
        country: string;
        state: string;
        city: string;
        streetAddress: string;
        buildingNumber: string;
        zipCode: string;
    };
}

export type FlexternClientSocialDetails = {
    socialLinks: Array<{
        platform: string;
        url: string;
    }>;
}


export type FlexternClientProfileDetails = FlexternClientAccountDetails & FlexternClientCompanyDetails & FlexternClientSocialDetails;

export type FlexternTalentProfileDetails = {}

export type FlexternUser = {
    isUserDetailsLoading: boolean;
    isProfileDetailsLoading: boolean;
    userDetails: FlexternClientDetails | FlexternTalentDetails;
    profileDetails: FlexternClientProfileDetails | FlexternTalentProfileDetails;
}

export type FlexternUserActions = {
    populateUserDetails: () => Promise<void>;
}

export type FlexternUserStore = FlexternUser & FlexternUserActions;