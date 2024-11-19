import {
  FlexternClientAccountDetails,
  FlexternClientCompanyDetails,
  FlexternClientSocialDetails,
  FlexternUserProfileForm,
} from '../constraints/types/user-profile-types';
import {
  getFlexternClientOrgInfo,
  getUserDetails,
  updateFlexternClientInfo,
  upsertFlexternClientAccountInfo,
} from '../services/user-management';

export const populateClientInfoDetails = async (set: any) => {
  set({ isProfileDetailsLoading: true });
  const data = await getUserDetails();
  set((state: FlexternUserProfileForm) => ({
    ...state,
    profileDetails: {
      ...state.profileDetails,
      firstname: data.client_info?.first_name,
      lastname: data.client_info?.last_name,
      timezone: {
        _id: data.timezone._id,
        name: data.timezone.name,
      },
      imageUri: data.client_info?.image_uri,
      title: data.client_info?.title,
      department: data.client_info?.department,
      socialLinks: data.client_info?.social_links?.map((link: any) => ({
        platform: link.platform,
        url: link.url,
      })),
    },
  }));
  set({ isProfileDetailsLoading: false });
};

export const populateClientOrgDetails = async (set: any) => {
  set({ isProfileDetailsLoading: true });
  const data = await getFlexternClientOrgInfo();
  set((state: FlexternUserProfileForm) => ({
    ...state,
    profileDetails: {
      ...state.profileDetails,
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
        zipCode: data.office_address?.zip_code,
      },
    },
  }));
  set({ isProfileDetailsLoading: false });
};

export const upsertClientAccountInfo = async (data: FlexternClientAccountDetails, set: any) => {
  set((state: FlexternUserProfileForm) => ({
    ...state,
    profileDetails: {
      ...state.profileDetails,
      firstname: data.firstname,
      lastname: data.lastname,
      timezone: data.timezone,
      imageUri: data.imageUri,
    },
  }));
  await upsertFlexternClientAccountInfo({
    firstname: data.firstname,
    lastname: data.lastname,
    timezone: data.timezone,
    ...(data.imageUri?.startsWith('https') ? {} : { imageUri: data.imageUri }),
  });
};

export const updateClientSocialInfo = async (data: FlexternClientSocialDetails, set: any) => {
  set((state: FlexternUserProfileForm) => ({
    ...state,
    profileDetails: {
      ...state.profileDetails,
      ...data,
    },
  }));
  await updateFlexternClientInfo(data);
};

export const updateClientCompanyInfo = async (data: FlexternClientCompanyDetails, set: any) => {
  set((state: FlexternUserProfileForm) => ({
    ...state,
    profileDetails: {
      ...state.profileDetails,
      ...data,
    },
  }));
  let fileKeyAdjustedData = {};
  if ('companyLogo' in data) {
    const { companyLogo, ...restData } = data;
    fileKeyAdjustedData = {
      ...restData,
      ...(companyLogo.startsWith('https') ? {} : { companyLogo }),
    };
  } else {
    fileKeyAdjustedData = data;
  }
  await updateFlexternClientInfo(fileKeyAdjustedData);
};

export const setCurrentTabIndex = (index: number, set: any) => {
  set({ currentTabIndex: index });
};
