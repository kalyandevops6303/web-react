import { Box, Check, Watch } from 'react-feather';

const ERROR_CODES = {
  EC_401: 401,
  EC_404: 404,
  EC_406: 406,
  EC_409: 409,
  EC_400: 400,
  EC_422: 422,
};
const checkPoints = {
  COMPLETE: 'COMPLETE',
  MOBILE_VERIFICATION: 'MOBILE_VERIFICATION',
  ACCOUNT_DETAILS: 'ACCOUNT_DETAILS',
  PROFILE_DETAILS: 'PROFILE_DETAILS',
};
const userTypes = {
  client: 'CLIENT',
  talent: 'TALENT',
};
const userOnboarding = {
  client: 'client-onboarding',
  talent: 'talent-onboarding',
};
const createBidSteps = [
  { title: 'Team', subtitle: 'Add role & hourly rates', icon: <Box size={18} /> },
  { title: 'Milestone', subtitle: 'Add milestone & role', icon: <Watch size={18} /> },
  { title: 'Preview', subtitle: 'Review before posting', icon: <Check size={18} /> },
];
const maxFileSize = 5000000; // 5MB
export { ERROR_CODES, checkPoints, userTypes, userOnboarding, createBidSteps, maxFileSize };
