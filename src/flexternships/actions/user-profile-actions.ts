import { FlexternClientAccountDetails, FlexternClientCompanyDetails, FlexternClientCompanySocialDetails, FlexternUserProfileForm } from "../constraints/types/user-profile-types";
import { getFlexternClientOrgInfo, getUserDetails, updateFlexternClientInfo, upsertFlexternClientAccountInfo } from "../services/user-management"

export const populateClientInfoDetails = async (set: any) => {
    set({ isProfileDetailsLoading: true });
    const data = await getUserDetails();
    set((state: FlexternUserProfileForm) => ({
        ...state,
        profileDetails: {
            ...state.profileDetails,
            firstname: data.client_info?.first_name,
            lastname: data.client_info?.last_name,
            imageUri: data.client_info?.image_uri,
            title: data.client_info?.title,
        }
    }));
    set({ isProfileDetailsLoading: false });
}

export const populateClientOrgDetails = async (set: any) => {
    set({ isProfileDetailsLoading: true });
    const data = await getFlexternClientOrgInfo();
    set((state: FlexternUserProfileForm) => ({
        ...state,
        profileDetails: {
            ...state.profileDetails,
            companyName: data.company_name,
            companyLogo: data.company_logo,
            companyTagline: data.company_tagline,
            companyIndustry: data.company_industry,
            companyStrength: data.company_strength,
            officeAddress: {
                country: data.office_address?.country,
                state: data.office_address?.state,
                city: data.office_address?.city,
                streetAddress: data.office_address?.street_address,
                buildingNumber: data.office_address?.building_number,
                zipCode: data.office_address?.zip_code
            },
            socialLinks: data.social_links?.map((link: any) => ({
                platform: link.platform,
                url: link.url
            }))
        }
    }));
    set({ isProfileDetailsLoading: false });
}

export const upsertClientAccountInfo = async (data: FlexternClientAccountDetails, set: any) => {
    
    set((state: FlexternUserProfileForm) => ({
        ...state,
        profileDetails: {
            ...state.profileDetails,
            firstname: data.firstname,
            lastname: data.lastname,
            imageUri: data.imageUri,
        }
    }));
    await upsertFlexternClientAccountInfo({
        firstname: data.firstname,
        lastname: data.lastname,
        ...(data.imageUri?.startsWith('https') ? {} : {imageUri: data.imageUri})
    });
}

export const updateClientCompanyInfo = async (data: FlexternClientCompanyDetails | FlexternClientCompanySocialDetails, set: any) => {
    set((state: FlexternUserProfileForm) => ({
        ...state,
        profileDetails: {
            ...state.profileDetails,
            ...data,
        }
    }));
    let fileKeyAdjustedData = {}
    if('companyLogo' in data) {
        const {companyLogo, ...restData} = data
        fileKeyAdjustedData = {
            ...restData,
            ...(companyLogo.startsWith('https') ? {} : {companyLogo})
        }
    } else {
        fileKeyAdjustedData = data
    }
    await updateFlexternClientInfo(fileKeyAdjustedData);
}

export const nextTab = (set: any) => {
    // This is called after validation
    // do not overshoot on the max tabs
    set((state: FlexternUserProfileForm) => ({ currentTabIndex: state.currentTabIndex + 1 }))
}


export const previousTab = (set: any) => {
    set((state: FlexternUserProfileForm) => ({ currentTabIndex: (state.currentTabIndex > 0 ? (state.currentTabIndex - 1) : 0) }))
}