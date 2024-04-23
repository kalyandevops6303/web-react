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
  club: 'CLUB',
};
const userOnboarding = {
  client: 'client-onboarding',
  talent: 'talent-onboarding',
};
const userProfileEdit = {
  client: 'client-profile-edit',
  talent: 'talent-profile-edit',
  team: 'team-profile-edit',
  club: 'club-profile-edit',
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

const roleTypeOptions = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Member', value: 'MEMBER' },
];

const clubStatus = {
  ACCEPTED: 'ACCEPTED',
  IN_REVIEW: 'IN_REVIEW',
  DECLINED: 'REJECTED',
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

const snapShotStatus = {
  DRAFT: 'DRAFT',
};

const bidStatus = {
  BID_UPDATED: 'BID_UPDATED',
  BID_REVIEWED: 'BID_REVIEWED',
  BID_ACCEPTED: 'BID_ACCEPTED',
  BID_SUBMITTED: 'BID_SUBMITTED',
  BID_CHANGE_ACCPETED: 'BID_CHANGE_ACCEPTED',
  BID_CHANGE_REJECTED: 'BID_CHANGE_REJECTED',
  BID_CHANGE_REQUEST: 'BID_CHANGE_REQUEST',
};

const fileScanStatus = {
  CLEAN: 'CLEAN',
  SCANNING: 'SCANNING',
  THREAT: 'THREAT',
};

const timeDalayToRetryScanning = 4000;

const minimumAvatarLength = 3;

export {
  ERROR_CODES,
  checkPoints,
  userTypes,
  userOnboarding,
  userProfileEdit,
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
  roleTypeOptions,
  PAYMENT_STATUS,
  clubStatus,
  snapShotStatus,
  bidStatus,
  fileScanStatus,
  timeDalayToRetryScanning,
  minimumAvatarLength,
};
