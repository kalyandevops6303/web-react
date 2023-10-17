/* eslint-disable no-useless-escape */
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
  team: 'TEAM',
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
const bidTypes = {
  simple: 'SIMPLE',
  advanced: 'ADVANCED',
};
const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const bidStatusesOptions = [
  { label: 'New', value: 'NEW' },
  { label: 'Reviewed', value: 'REVIEWED' },
  { label: 'Accepted', value: 'ACCEPTED' },
  { label: 'Closed', value: 'REJECTED' },
];

const statusesOptions = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In-review', value: 'IN_REVIEW' },
  { label: 'Terminated', value: 'TERMINATED' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'On Going', value: 'ON_GOING' },
];
const statusForAllListing = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In-review', value: 'IN_REVIEW' },
];
const projectTypesOptions = [
  { label: 'Fixed', value: 'FIXED' },
  { label: 'Variable', value: 'VARIABLE' },
];
const sortingOptions = [
  { label: 'New', value: 'NEW' },
  { label: 'Recommended', value: 'RECOMMENDED' },
  { label: 'Favorite', value: 'FAVOURITE' },
];
const USD = {
  _id: '6478b0d1679b91d695ad534a',
  name: 'US Dollar',
  code: 'USD',
};
const disputeStatuses = {
  open: 'OPEN',
  underReview: 'UNDER_REVIEW',
  responded: 'RESPONDED',
  resolved: 'RESOLVED',
};
const disputeStatusEnum = {
  OPEN: 'Open',
  UNDER_REVIEW: 'Under Review',
  RESPONDED: 'Responded',
  RESOLVED: 'Resolved',
};
export {
  ERROR_CODES,
  checkPoints,
  userTypes,
  userOnboarding,
  sortingOptions,
  statusesOptions,
  projectTypesOptions,
  validEmailRegex,
  maxFileSize,
  createBidSteps,
  bidTypes,
  USD,
  disputeStatuses,
  disputeStatusEnum,
  bidStatusesOptions,
  statusForAllListing,
};
