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

export enum PrimaryProjectStatus {
  OPEN = 'Open',
  IN_REVIEW = 'In Review',
  ACTIVE = 'Active',
  ONGOING = 'On Going',
  UPCOMING = 'Upcoming',
  CLOSED = 'Closed',
  WITHDRAWN = 'Withdrawn',
  TERMINATED = 'Terminated',
  COMPLETED = 'Completed',
  BLOCKED = 'Blocked',
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

export const ProjectPanelCaptionDate1: any = {
  OPEN: 'Posted On',
  IN_REVIEW: 'Posted On',
  ACTIVE: 'Posted On',
  ONGOING: 'Start Date',
  UPCOMING: 'Posted On',
  CLOSED: 'Posted On',
  TERMINATED: 'Start Date',
  COMPLETED: 'Start Date',
  WITHDRAWN: 'Posted On',
  BLOCKED: 'Start Date',
};

export const ProjectPanelCaptionDate2: any = {
  OPEN: 'Start Date',
  IN_REVIEW: 'Start Date',
  ACTIVE: 'Start Date',
  ONGOING: 'End Date',
  UPCOMING: 'Start Date',
  CLOSED: 'Closed Date',
  TERMINATED: 'Terminate Date',
  COMPLETED: 'End Date',
  WITHDRAWN: 'Withdraw Date',
  BLOCKED: 'End Date',
};

export const ProjectPanelIcon1Classnames: any = {
  OPEN: 'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  IN_REVIEW:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  ACTIVE:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  ONGOING:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  UPCOMING:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  CLOSED:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  TERMINATED:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  COMPLETED:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  WITHDRAWN:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  BLOCKED:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
};

export const ProjectPanelIcon2Classnames: any = {
  OPEN: 'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  IN_REVIEW:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  ACTIVE:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  ONGOING:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  UPCOMING:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  CLOSED:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[rgba(255, 255, 255, 0.90)] text-[#607D8B] flex items-center justify-center',
  TERMINATED: 'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] text-[#0185E4] flex items-center justify-center',
  COMPLETED:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
  WITHDRAWN: 'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] text-[#EA5455] flex items-center justify-center',
  BLOCKED:
    'w-[46px] h-[46px] flex-shrink-0 rounded-[26px] bg-[#0185E41F] text-[#0185E4] flex items-center justify-center',
};

export const ProjectPanelDate2Classnames: any = {
  OPEN: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
  IN_REVIEW: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
  ACTIVE: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
  ONGOING: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
  UPCOMING: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
  CLOSED: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
  TERMINATED: 'text-[#EA5455]',
  COMPLETED: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
  WITHDRAWN: 'text-[#EA5455]',
  BLOCKED: 'text-[var(--1-theme-color-heading-display-text,#5E5873)]',
};
