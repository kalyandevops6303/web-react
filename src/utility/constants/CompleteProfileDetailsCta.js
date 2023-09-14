import { userOnboarding } from './Constant';

const CompleteProfileDetailsCta = {
  TALENT: [
    {
      keyToMatch: 'tagline',
      label: 'Add Personal Details',
      path: `/${userOnboarding.talent}/personal-details`,
    },
    {
      keyToMatch: 'educational_institute',
      label: 'Add Education Details',
      path: `/${userOnboarding.talent}/educational-details`,
    },
    {
      keyToMatch: 'availability',
      label: 'Add Availability Details',
      path: `/${userOnboarding.talent}/availability-details`,
    },
    { keyToMatch: 'social_links', label: 'Add Social Details', path: `/${userOnboarding.talent}/social-details` },
    { keyToMatch: 'image_uri', label: 'Complete Your Profile', path: `/${userOnboarding.talent}/account-details` },
    {
      keyToMatch: 'work_experience',
      label: 'Complete Your Profile',
      path: `/${userOnboarding.talent}/personal-details`,
    },
    { keyToMatch: 'languages', label: 'Complete Your Profile', path: `/${userOnboarding.talent}/personal-details` },
  ],
  CLIENT: [
    { keyToMatch: 'company_name', label: 'Add Personal Details', path: `/${userOnboarding.client}/personal-details` },
    {
      keyToMatch: 'educational_institute',
      label: 'Add Education Details',
      path: `/${userOnboarding.client}/educational-details`,
    },
    {
      keyToMatch: 'availability',
      label: 'Add Availability Details',
      path: `/${userOnboarding.client}/availability-details`,
    },
    { keyToMatch: 'social_links', label: 'Add Social Details', path: `/${userOnboarding.client}/social-details` },
    { keyToMatch: 'image_uri', label: 'Complete Your Profile', path: `/${userOnboarding.client}/account-details` },
    { keyToMatch: 'company_logo', label: 'Complete Your Profile', path: `/${userOnboarding.client}/personal-details` },
    {
      keyToMatch: 'company_strength',
      label: 'Complete Your Profile',
      path: `/${userOnboarding.client}/personal-details`,
    },
  ],
  TEAM: [
    {
      keyToMatch: 'team_logo',
      label: 'Complete Your Profile',
      path: '/create-team/profile-details',
    },
  ],
};

// eslint-disable-next-line consistent-return
const returnCompleteProfileDetailsCta = (userType, missingValues) => {
  if (userType === 'CLIENT' && missingValues?.includes('company_name')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'company_name');
    // eslint-disable-next-line no-else-return
  } else if (userType === 'TALENT' && missingValues?.includes('tagline')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'tagline');
  } else if (missingValues?.includes('educational_institute')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'educational_institute');
  } else if (missingValues?.includes('availability')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'availability');
  } else if (missingValues?.includes('social_links')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'social_links');
  } else if (missingValues?.includes('image_uri')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'image_uri');
  } else if (userType === 'TALENT' && missingValues?.includes('work_experience')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'work_experience');
  } else if (
    userType === 'TALENT' &&
    (missingValues?.includes('languages_read') ||
      missingValues?.includes('languages_speak') ||
      missingValues?.includes('languages_write'))
  ) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'languages');
  } else if (userType === 'CLIENT' && missingValues?.includes('company_logo')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'company_logo');
  } else if (userType === 'CLIENT' && missingValues?.includes('company_strength')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'company_strength');
  } else if (userType === 'TEAM' && missingValues?.includes('team_logo')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'team_logo');
  } else {
    return null;
  }
};

export { returnCompleteProfileDetailsCta, CompleteProfileDetailsCta };
