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
const createBidTalentSteps = [
  { title: 'Milestone', subtitle: 'Add milestone', icon: <Watch size={18} /> },
  { title: 'Preview', subtitle: 'Review before posting', icon: <Check size={18} /> },
];
const createBidTeamSteps = [
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
  { label: 'Active', value: 'ACTIVE' },
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

const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  INITIATED: 'INITIATED',
  PAID: 'PAID',
  FAILED: 'FAILED',
  PAYMENT_DUE: 'PAYMENT_DUE',
  PAYMENT_PROCESSING: 'PAYMENT_PROCESSING',
  PAYMENT_SUCCESSFUL: 'PAYMENT_SUCCESSFUL',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
};

const clubStatus = {
  ACCEPTED: 'ACCEPTED',
  IN_REVIEW: 'IN_REVIEW',
  DECLINED: 'DECLINED',
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
  createBidTalentSteps,
  createBidTeamSteps,
  bidTypes,
  disputeStatuses,
  disputeStatusEnum,
  bidStatusesOptions,
  statusForAllListing,
  PAYMENT_STATUS,
  clubStatus,
};
