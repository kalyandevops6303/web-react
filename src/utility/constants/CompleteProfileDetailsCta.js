import { isArray, isEmpty } from 'lodash';
import { userOnboarding, userProfileEdit } from './Constant';

const isOnboarding = window.location.pathname.includes('onboarding');
const baseRouteToRedirect = isOnboarding ? userOnboarding : userProfileEdit;
const CompleteProfileDetailsCta = {
  TALENT: [
    {
      keyToMatch: 'tagline',
      label: 'Add Personal Details',
      path: `/${baseRouteToRedirect.talent}/personal-details`,
    },
    {
      keyToMatch: 'educational_institute',
      label: 'Add Education Details',
      path: `/${baseRouteToRedirect.talent}/educational-details`,
    },
    {
      keyToMatch: 'resume',
      label: 'Add Resume',
      path: `/${baseRouteToRedirect.talent}/personal-details`,
    },
    {
      keyToMatch: 'availability',
      label: 'Add Availability Details',
      path: `/${baseRouteToRedirect.talent}/availability-details`,
    },
    {
      keyToMatch: 'payment_account',
      label: 'Add Payment Details',
      path: `/${baseRouteToRedirect.talent}/payment-details`,
    },
    {
      keyToMatch: 'intern-hiring',
      label: 'Get Hired',
      path: `/${baseRouteToRedirect.talent}/intern-hiring`,
    },
    {
      keyToMatch: 'intern-xobin-hiring',
      label: 'Get Hired (I)',
      path: `/${baseRouteToRedirect.talent}/intern-xobin-hiring`,
    },
    { keyToMatch: 'social_links', label: 'Add Social Details', path: `/${baseRouteToRedirect.talent}/social-details` },
    { keyToMatch: 'image_uri', label: 'Complete Your Profile', path: `/${baseRouteToRedirect.talent}/account-details` },
    {
      keyToMatch: 'work_experience',
      label: 'Complete Your Profile',
      path: `/${baseRouteToRedirect.talent}/personal-details`,
    },
    {
      keyToMatch: 'languages',
      label: 'Complete Your Profile',
      path: `/${baseRouteToRedirect.talent}/personal-details`,
    },
    {
      keyToMatch: 'additional_info',
      label: 'Complete Additional Info',
      path: `/${baseRouteToRedirect.talent}/additional-details`,
    },
  ],
  CLIENT: [
    {
      keyToMatch: 'company_name',
      label: 'Add Personal Details',
      path: `/${baseRouteToRedirect.client}/personal-details`,
    },
    {
      keyToMatch: 'educational_institute',
      label: 'Add Education Details',
      path: `/${baseRouteToRedirect.client}/educational-details`,
    },
    {
      keyToMatch: 'availability',
      label: 'Add Availability Details',
      path: `/${baseRouteToRedirect.client}/availability-details`,
    },
    { keyToMatch: 'social_links', label: 'Add Social Details', path: `/${baseRouteToRedirect.client}/social-details` },
    { keyToMatch: 'image_uri', label: 'Complete Your Profile', path: `/${baseRouteToRedirect.client}/account-details` },
    {
      keyToMatch: 'company_logo',
      label: 'Complete Your Profile',
      path: `/${baseRouteToRedirect.client}/personal-details`,
    },
    {
      keyToMatch: 'company_strength',
      label: 'Complete Your Profile',
      path: `/${baseRouteToRedirect.client}/personal-details`,
    },
  ],
  TEAM: [
    {
      keyToMatch: 'team_logo',
      label: 'Complete Your Profile',
      path: `/${baseRouteToRedirect.team}/profile-details`,
    },
    {
      keyToMatch: 'payment_account',
      label: 'Add Payment Details',
      path: `/${baseRouteToRedirect.talent}/payment-details`,
    },
  ],
  CLUB: [
    {
      keyToMatch: 'team_logo',
      label: 'Complete Your Profile',
      path: `/${baseRouteToRedirect.club}/account-details`,
    },
  ],
};

// eslint-disable-next-line consistent-return
const returnCompleteProfileDetailsCta = (userType, missingValues) => {
  if (
    isEmpty(missingValues) ||
    typeof missingValues !== 'object' ||
    (typeof missingValues === 'object' && !isArray(missingValues))
  ) {
    return null;
  }

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
  } else if (missingValues?.includes('resume')) {
    // console.log("hello")
    // console.log(CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'resume'))
    return CompleteProfileDetailsCta[userType]?.find((item) => item.keyToMatch === 'resume');
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
