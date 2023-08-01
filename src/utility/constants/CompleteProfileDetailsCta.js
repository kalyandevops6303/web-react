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
  } else {
    return null;
  }
};

export { returnCompleteProfileDetailsCta, CompleteProfileDetailsCta };
