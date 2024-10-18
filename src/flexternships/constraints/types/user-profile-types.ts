
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


export type FlexternUserProfileForm = {
    isProfileDetailsLoading: boolean;
    profileDetails: FlexternClientProfileDetails;
}

export type FlexternUserProfileFormActions = {
    populateProfileDetails: () => Promise<void>;
}

export type FlexternUserProfileStore = FlexternUserProfileForm & FlexternUserProfileFormActions;
