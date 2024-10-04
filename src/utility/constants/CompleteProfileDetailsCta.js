import { userProfileEdit } from './Constant';

const CompleteProfileDetailsCta = {
  TALENT: [
    {
      keyToMatch: 'tagline',
      label: 'Add Personal Details',
      path: `/${userProfileEdit.talent}/personal-details`,
    },
    {
      keyToMatch: 'educational_institute',
      label: 'Add Education Details',
      path: `/${userProfileEdit.talent}/educational-details`,
    },
    {
      keyToMatch: 'availability',
      label: 'Add Availability Details',
      path: `/${userProfileEdit.talent}/availability-details`,
    },
    {
      keyToMatch: 'payment_account',
      label: 'Add Payment Details',
      path: `/${userProfileEdit.talent}/payment-details`,
    },
    {
      keyToMatch: 'intern-hiring',
      label: 'Get Hired',
      path: `/${userProfileEdit.talent}/intern-hiring`,
    },
    {
      keyToMatch: 'intern-xobin-hiring',
      label: 'Get Hired (I)',
      path: `/${userProfileEdit.talent}/intern-xobin-hiring`,
    },
    { keyToMatch: 'social_links', label: 'Add Social Details', path: `/${userProfileEdit.talent}/social-details` },
    { keyToMatch: 'image_uri', label: 'Complete Your Profile', path: `/${userProfileEdit.talent}/account-details` },
    {
      keyToMatch: 'work_experience',
      label: 'Complete Your Profile',
      path: `/${userProfileEdit.talent}/personal-details`,
    },
    { keyToMatch: 'languages', label: 'Complete Your Profile', path: `/${userProfileEdit.talent}/personal-details` },
    { keyToMatch: 'additional_info', label: 'Complete Additional Info', path: `/${userProfileEdit.talent}/additional-details` },

  ],
  CLIENT: [
    { keyToMatch: 'company_name', label: 'Add Personal Details', path: `/${userProfileEdit.client}/personal-details` },
    {
      keyToMatch: 'educational_institute',
      label: 'Add Education Details',
      path: `/${userProfileEdit.client}/educational-details`,
    },
    {
      keyToMatch: 'availability',
      label: 'Add Availability Details',
      path: `/${userProfileEdit.client}/availability-details`,
    },
    { keyToMatch: 'social_links', label: 'Add Social Details', path: `/${userProfileEdit.client}/social-details` },
    { keyToMatch: 'image_uri', label: 'Complete Your Profile', path: `/${userProfileEdit.client}/account-details` },
    { keyToMatch: 'company_logo', label: 'Complete Your Profile', path: `/${userProfileEdit.client}/personal-details` },
    {
      keyToMatch: 'company_strength',
      label: 'Complete Your Profile',
      path: `/${userProfileEdit.client}/personal-details`,
    },
  ],
  TEAM: [
    {
      keyToMatch: 'team_logo',
      label: 'Complete Your Profile',
      path: `/${userProfileEdit.team}/profile-details`,
    },
    {
      keyToMatch: 'payment_account',
      label: 'Add Payment Details',
      path: `/${userProfileEdit.talent}/payment-details`,
    },
  ],
  CLUB: [
    {
      keyToMatch: 'team_logo',
      label: 'Complete Your Profile',
      path: `/${userProfileEdit.club}/account-details`,
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
  } else if (missingValues?.includes('payment_account')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'payment_account');
  } else if (missingValues?.includes('social_links')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'social_links');
  } else if (missingValues?.includes('image_uri')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'image_uri');
  } else if (userType === 'TALENT' && missingValues?.includes('work_experience')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'work_experience');
  } else if (userType === 'TALENT' && missingValues?.includes('additional_info')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'additional_info');
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
  } else if (userType === 'CLUB' && missingValues?.includes('team_logo')) {
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'team_logo');
  } else {
    return null;
  }
};

export { returnCompleteProfileDetailsCta, CompleteProfileDetailsCta };
