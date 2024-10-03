/* eslint-disable no-useless-escape */
import { Box, Check, Watch } from 'react-feather';

const SUPPORT_EMAIL = 'support@trumio.ai';

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
  CREATE_PASSWORD: 'CREATE_PASSWORD',
};
const userTypes = {
  client: 'CLIENT',
  talent: 'TALENT',
  team: 'TEAM',
  club: 'CLUB',
};

const teamTypes = {
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

const clubOrTeamStatuses = {
  SAVED: 'SAVED',
  DRAFT: 'DRAFT',
};

const bidStatusesOptions = [
  { label: 'New', value: 'NEW' },
  { label: 'Updated', value: 'UPDATED' },
  { label: 'Reviewed', value: 'REVIEWED' },
  { label: 'Accepted', value: 'ACCEPTED' },
  { label: 'Closed', value: 'REJECTED' },
  { label: 'Drafts', value: 'DRAFT' },
];

const teamStatusesOptions = [
  { label: 'Saved', value: 'SAVED' },
  { label: 'Drafts', value: 'DRAFT' },
];

const clubStatusesOptions = [
  { label: 'Accepted', value: 'ACCEPTED' },
  { label: 'Drafts', value: 'DRAFT' },
];

const statusesOptions = [
  { label: 'Open', value: 'OPEN' },
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
const projectStatusEnum = {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  IN_REVIEW: 'IN_REVIEW',
  ACTIVE: 'ACTIVE',
  ON_GOING: 'ON_GOING',
  CLOSED: 'CLOSED',
  TERMINATED: 'TERMINATED',
  COMPLETED: 'COMPLETED',
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
  FUNDS_AVAILABLE: 'FUNDS_AVAILABLE',
  FUNDS_UNAVAILABLE: 'FUNDS_UNAVAILABLE',
};

const CHECKOUT_STATUS = {
  CANCELLED: 'CANCELLED',
};

const paymentText = {
  PENDING: 'Pending',
  INITIATED: 'Initiated',
  PAID: 'Paid',
  FAILED: 'Failed',
  PAYMENT_DUE: 'Payment Pending',
  PAYMENT_PROCESSING: 'Payment Processing',
  PAYMENT_SUCCESSFUL: 'Payment Successful',
  PAYMENT_FAILED: 'Payment Failed',
  FUNDS_AVAILABLE: 'Funds Available',
  FUNDS_UNAVAILABLE: 'Funds Unavailable',
  PAYMENT_INITIATED: 'Payment Initiated',
  PROCESSING: 'Processing',
  SUCCESSFUL: 'Successful',
  NOT_FUNDED: 'Not Funded',
  RETRY_PAYMENT: 'Retry Payment',
  FUNDED: 'Funded',
};

const PAYMENT_TYPES = {
  CHECKOUT: 'CHECKOUT',
  TRANSFER: 'TRANSFER',
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

const invitationUserStatus = {
  REGISTERED: 'REGISTERED',
  UNREGISTERED: 'UNREGISTERED',
};

const fileScanStatus = {
  CLEAN: 'CLEAN',
  SCANNING: 'SCANNING',
  THREAT: 'THREAT',
};

const timeDalayToRetryScanning = 4000;

const minimumAvatarLength = 3;

const bidStages = {
  RECEIVED_BIDS: 'RECEIVED_BIDS',
  ACCEPTED_BID: 'ACCEPTED_BID',
  NDA: 'NDA',
  CONTRACT: 'CONTRACT',
  BID_SUBMITTED: 'BID_SUBMITTED',
  NO_STAGE: 'NO_STAGE',
};

const CUSTOMER_SUPPORT_TYPES = {
  missing_institute: 'missing_institute',
  missing_skill: 'missing_skill',
  missing_tool: 'missing_tool',
  missing_assessment: 'missing_assessment',
  missing_talent: 'missing_talent',
  education: 'education',
  tools_and_skills: 'tools_and_skills',
  other: 'other',
};

const CITIZEN_TYPES = {
  US: 'US',
  OTHER: 'OTHER',
};

const TEAM_STATUS = {
  SAVED: 'SAVED',
  DRAFT: 'DRAFT',
};

const REPORT_ENTITIES = {
  PROJECT: 'PROJECT',
  TEAM: 'TEAM',
  CLIENT: 'CLIENT',
  TALENT: 'TALENT',
  CLUB: 'CLUB',
};
const PROJECT_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  READ_ONLY: 'READ_ONLY',
};

const studyYears = [
  { label: '2020', value: 2020 },
  { label: '2021', value: 2021 },
  { label: '2022', value: 2022 },
  { label: '2023', value: 2023 },
  { label: '2024', value: 2024 },
];

export {
  ERROR_CODES,
  checkPoints,
  userTypes,
  userOnboarding,
  teamStatusesOptions,
  clubStatusesOptions,
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
  roleTypeOptions,
  PAYMENT_STATUS,
  clubStatus,
  snapShotStatus,
  bidStatus,
  fileScanStatus,
  timeDalayToRetryScanning,
  minimumAvatarLength,
  paymentText,
  bidStages,
  invitationUserStatus,
  CHECKOUT_STATUS,
  PAYMENT_TYPES,
  SUPPORT_EMAIL,
  projectStatusEnum,
  CUSTOMER_SUPPORT_TYPES,
  CITIZEN_TYPES,
  PROJECT_INVITATION_STATUS,
  TEAM_STATUS,
  teamTypes,
  clubOrTeamStatuses,
  REPORT_ENTITIES,
  studyYears,
};