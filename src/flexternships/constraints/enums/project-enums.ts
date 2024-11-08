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
  }

  export enum StatusType {
    PRIMARY = 'PRIMARY',
    SECONDARY = 'SECONDARY',
  }

  export enum ProjectStatus {
    OPEN = 'Open',
    IN_REVIEW = 'In Review',
    ACTIVE = 'Active',
    ONGOING = 'On Going',
    UPCOMING = 'Upcoming',
    CLOSED = 'Closed',
    TERMINATED = 'Terminated',
    COMPLETED = 'Completed'
  }

  export const SecondaryStatus = {
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