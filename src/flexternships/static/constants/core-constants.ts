import routes from '@/flexternships/routes';

export const CHAT_ENTRY_POINT = 'https://teams.microsoft.com';

export const DEFAULT_SUPPORT_TYPE = 'others';
export const SUPPORT_EMAIL = 'support@trumio.ai';
export const CLIENT_SUPPORT_EMAIL = 'enterprisesupport@trumio.ai';
export const TALENT_SUPPORT_EMAIL = 'talentsupport@trumio.ai';

export const NAVBAR_ITEMS = [
  {
    path: routes.dashboard.path,
    label: 'Dashboard',
    activeTabMatch: routes.dashboard.path,
  },
  {
    path: `${routes.projects.path}/ongoing`,
    label: 'Projects',
    activeTabMatch: routes.projects.path,
  },
];

export const TALENT_PROFILE_SECTIONS = [
  { path: 'account-details', label: 'Account' },
  { path: 'personal-details', label: 'Personal' },
  { path: 'educational-details', label: 'Education' },
  { path: 'social-details', label: 'Social' },
  { path: 'additional-details', label: 'Additional Information' },
];

export const statusTextMap: Record<string, string> = {
  TERMS_AND_CONDITIONS: 'User terms of service',
  PRIVACY_POLICY: 'Privacy Policy',
};

export const BLOB_SAS_TOKEN_EXPIRY_DELTA = 2000; // 2 seconds before expiry
