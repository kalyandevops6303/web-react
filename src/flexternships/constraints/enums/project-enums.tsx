import { ProjectPrimaryStatus } from './core-enums';

export enum UserTypeChipClassnames {
  TALENT = 'bg-[#FFD700] text-[#333333]',
  CLIENT = 'text-blue-700 bg-blue-100',
}

export enum ProjectStatusChipClassnames {
  OPEN = 'bg-skyblue-light text-skyblue border border-skyblue',
  IN_REVIEW = 'bg-yellow-100 text-yellow-600 border border-yellow-400',
  ACTIVE = 'bg-green-200 text-green-600 border border-green-400',
  ONGOING = 'bg-green-200 text-green-600 border border-green-400',
  UPCOMING = 'bg-orange-200 text-orange-600 border border-orange-400',
  CLOSED = 'bg-gray-300 text-gray-600 border border-gray-500',
  TERMINATED = 'bg-red-100 text-red-600 border border-red-400',
  COMPLETED = 'bg-orange-200 text-orange-600 border border-orange-400',
  WITHDRAWN = 'border border-[#FF6D00] bg-[rgba(255,109,0,0.12)] text-[#FF6D00]',
}

export enum StatusType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

export const SecondaryProjectStatus = {
  OPEN: 'Open',
  TO_BE_LISTED: 'To Be Listed',
  IN_REVIEW: 'In Review',
  TERMINATED: 'Terminated',
  CLOSED: 'Closed',
  LISTING_EXPIRED: 'Expired',
  ON_GOING: 'On Going',
  COMPLETED: 'Completed',
  ACTIVE: 'Active',
  BID_SUBMITTED: 'Bid Submitted',
  BID_IN_REVIEW: 'Bid In Review',
  BID_ACCEPTED: 'Bid Accepted',
  BID_CHANGE_REQUEST: 'Change Request',
  SIGN_CONTRACT: 'Sign Contract',
  SIGN_NDA: 'Sign NDA',
  PAYMENT_PENDING: 'Payment Pending',
  WITHDRAWN: 'Withdrawn',
  DISPUTED: 'Disputed',
  SIGN_REQUESTED: 'Sign Requested',
  NOT_FUNDED: 'Not Funded',
  INITIATE_FUNDS: 'Initiate Funds',
};

export const enum DocTypes {
  NDA = 'NDA',
  CONTRACT = 'CONTRACT',
}

export const ProjectPanelCaptionDate1 = {
  [ProjectPrimaryStatus.OPEN]: 'Posted On',
  [ProjectPrimaryStatus.DRAFT]: '',
  [ProjectPrimaryStatus.ACTIVE]: 'Posted On',
  [ProjectPrimaryStatus.ON_GOING]: 'Start Date',
  [ProjectPrimaryStatus.TERMINATED]: 'Start Date',
  [ProjectPrimaryStatus.COMPLETED]: 'Start Date',
  [ProjectPrimaryStatus.WITHDRAWN]: 'Posted On',
  [ProjectPrimaryStatus.BLOCKED]: 'Start Date',
};

export const ProjectPanelCaptionDate2 = {
  [ProjectPrimaryStatus.OPEN]: 'Start Date',
  [ProjectPrimaryStatus.DRAFT]: '',
  [ProjectPrimaryStatus.ACTIVE]: 'Start Date',
  [ProjectPrimaryStatus.ON_GOING]: 'End Date',
  [ProjectPrimaryStatus.TERMINATED]: 'Terminate Date',
  [ProjectPrimaryStatus.COMPLETED]: 'End Date',
  [ProjectPrimaryStatus.WITHDRAWN]: 'Withdraw Date',
  [ProjectPrimaryStatus.BLOCKED]: 'End Date',
};

export const ProjectPanelIcon1Classnames = {
  [ProjectPrimaryStatus.OPEN]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  [ProjectPrimaryStatus.DRAFT]: '',
  [ProjectPrimaryStatus.ACTIVE]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  [ProjectPrimaryStatus.ON_GOING]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  [ProjectPrimaryStatus.TERMINATED]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  [ProjectPrimaryStatus.COMPLETED]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  [ProjectPrimaryStatus.WITHDRAWN]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  [ProjectPrimaryStatus.BLOCKED]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
};

export const ProjectPanelIcon2Classnames = {
  [ProjectPrimaryStatus.OPEN]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  [ProjectPrimaryStatus.DRAFT]: '',
  [ProjectPrimaryStatus.ACTIVE]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  [ProjectPrimaryStatus.ON_GOING]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  [ProjectPrimaryStatus.TERMINATED]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] text-[#0185E4] flex items-center justify-center',
  [ProjectPrimaryStatus.COMPLETED]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  [ProjectPrimaryStatus.WITHDRAWN]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] text-[#EA5455] flex items-center justify-center',
  [ProjectPrimaryStatus.BLOCKED]:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
};

export const ProjectPanelDate2Classnames = {
  [ProjectPrimaryStatus.OPEN]: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
  [ProjectPrimaryStatus.DRAFT]: '',
  [ProjectPrimaryStatus.ACTIVE]: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
  [ProjectPrimaryStatus.ON_GOING]: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
  [ProjectPrimaryStatus.TERMINATED]: 'text-[#EA5455]',
  [ProjectPrimaryStatus.COMPLETED]: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
  [ProjectPrimaryStatus.WITHDRAWN]: 'text-[#EA5455]',
  [ProjectPrimaryStatus.BLOCKED]: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
};
