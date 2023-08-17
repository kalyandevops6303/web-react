/* eslint-disable no-useless-escape */
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

const statusesOptions = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In-review', value: 'IN_REVIEW' },
  { label: 'Terminated', value: 'TERMINATED' },
  { label: 'Closed', value: 'CLOSED' },
];
const projectTypesOptions = [
  { label: 'Fixed', value: 'FIXED' },
  { label: 'Variable', value: 'VARIABLE' },
];
const sortingOptions = [
  { label: 'New', value: 'NEW' },
  { label: 'Recommended', value: 'RECOMMADED' },
];
const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const maxFileSize = 5000000; // 5MB
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
};
