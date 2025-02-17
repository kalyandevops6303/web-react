import routes from '@/flexternships/routes';

export const CHAT_ENTRY_POINT = 'https://teams.microsoft.com';

export const DEFAULT_SUPPORT_TYPE = 'others';
export const SUPPORT_EMAIL = 'support@trumio.ai';

export const NAVBAR_ITEMS = [
  {
    path: routes.dashboard.path,
    label: 'Dashboard',
    activeTabMatch: routes.dashboard.path,
  },
  {
    path: `${routes.marketplace.path}/all_listings`,
    label: 'Marketplace',
    activeTabMatch: routes.marketplace.path,
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
