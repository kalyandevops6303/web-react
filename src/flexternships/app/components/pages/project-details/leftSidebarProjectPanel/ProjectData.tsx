import StartDateSVG from '../../../../../assets/svgs/project-details/start-date.svg';
import EndDateSVG from '../../../../../assets/svgs/project-details/end-date.svg';
import { Calendar } from 'react-feather';
import { ProjectPrimaryStatus } from '@/flexternships/constraints/enums/core-enums';

const getProjectPanelDate1Icon = (data: { status: string }) => {
  const { status } = data;
  switch (status) {
    case 'OPEN':
    case 'IN_REVIEW':
    case 'ACTIVE':
    case 'UPCOMING':
    case 'CLOSED':
    case 'WITHDRAWN': {
      return <Calendar />;
    }
    case 'ONGOING':
    case 'TERMINATED':
    case 'COMPLETED':
    case 'BLOCKED': {
      return <img src={StartDateSVG} alt="Start Date Icon" />;
    }
    default:
      return null;
  }
};

const getProjectPanelDate2Icon = (data: { status: string }) => {
  const { status } = data;

  switch (status) {
    case 'OPEN':
    case 'IN_REVIEW':
    case 'ACTIVE':
    case 'UPCOMING': {
      return <img src={StartDateSVG} alt="Start Date Icon" />;
    }
    case 'ONGOING':
    case 'COMPLETED': {
      return <img src={EndDateSVG} alt="End Date Icon" />;
    }
    case 'CLOSED': {
      return (
        <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="46" height="46" rx="23" fill="#607D8B" fillOpacity="0.12" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 23C12.5 16.9 17.4 12 23.5 12C29.5338 12 34.3934 16.7942 34.4983 22.8017C33.8784 22.4434 33.1884 22.1927 32.4539 22.0754C31.9963 17.5159 28.1877 14 23.5 14C18.5 14 14.5 18 14.5 23C14.5 28 18.5 32 23.5 32C24.5905 32 25.6335 31.8097 26.5977 31.4603C27.0191 32.0561 27.5463 32.5718 28.1521 32.9798C26.741 33.6349 25.1652 34 23.5 34C17.4 34 12.5 29.1 12.5 23ZM26.533 24.633C26.1383 25.2143 25.8428 25.8685 25.6712 26.5712L22.8 23.7C22.6 23.5 22.5 23.3 22.5 23V17C22.5 16.4 22.9 16 23.5 16C24.1 16 24.5 16.4 24.5 17V22.6L26.533 24.633Z"
            fill="#607D8B"
          />
        </svg>
      );
    }
    case 'TERMINATED': {
      return (
        <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="46" height="46" rx="23" fill="#EA5455" fillOpacity="0.12" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 23C12.5 16.9 17.4 12 23.5 12C29.5338 12 34.3934 16.7942 34.4983 22.8017C33.8784 22.4434 33.1884 22.1927 32.4539 22.0754C31.9963 17.5159 28.1877 14 23.5 14C18.5 14 14.5 18 14.5 23C14.5 28 18.5 32 23.5 32C24.5905 32 25.6335 31.8097 26.5977 31.4603C27.0191 32.0561 27.5463 32.5718 28.1521 32.9798C26.741 33.6349 25.1652 34 23.5 34C17.4 34 12.5 29.1 12.5 23ZM26.533 24.633C26.1383 25.2143 25.8428 25.8685 25.6712 26.5712L22.8 23.7C22.6 23.5 22.5 23.3 22.5 23V17C22.5 16.4 22.9 16 23.5 16C24.1 16 24.5 16.4 24.5 17V22.6L26.533 24.633Z"
            fill="#EA5455"
          />
        </svg>
      );
    }
    case 'WITHDRAWN': {
      return (
        <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" width="46" height="46" rx="23" fill="#EA5455" fillOpacity="0.12" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 23C12.5 16.9 17.4 12 23.5 12C29.5338 12 34.3934 16.7942 34.4983 22.8017C33.8784 22.4434 33.1884 22.1927 32.4539 22.0754C31.9963 17.5159 28.1877 14 23.5 14C18.5 14 14.5 18 14.5 23C14.5 28 18.5 32 23.5 32C24.5905 32 25.6335 31.8097 26.5977 31.4603C27.0191 32.0561 27.5463 32.5718 28.1521 32.9798C26.741 33.6349 25.1652 34 23.5 34C17.4 34 12.5 29.1 12.5 23ZM26.533 24.633C26.1383 25.2143 25.8428 25.8685 25.6712 26.5712L22.8 23.7C22.6 23.5 22.5 23.3 22.5 23V17C22.5 16.4 22.9 16 23.5 16C24.1 16 24.5 16.4 24.5 17V22.6L26.533 24.633Z"
            fill="#EA5455"
          />
        </svg>
      );
    }
    default:
      return null; // Return null for unknown statuses (optional)
  }
};

const getProjectPanelDate1Values = (data: {
  createdAt?: number;
  updatedAt?: number;
  postedAt?: number;
  details?: { expectedStartDate?: number };
  listingDetails?: { startDateEpoch?: number };
}): { [key in keyof typeof ProjectPrimaryStatus]?: number } => {
  return {
    OPEN: data?.postedAt,
    ACTIVE: data?.postedAt,
    ON_GOING: data?.details?.expectedStartDate,
    TERMINATED: data?.details?.expectedStartDate,
    COMPLETED: data?.details?.expectedStartDate,
    WITHDRAWN: data?.postedAt,
    BLOCKED: data?.details?.expectedStartDate,
  };
};

const getProjectPanelDate2Values = (data: {
  details?: { expectedStartDate?: number };
  listingDetails?: { startDateEpoch?: number; endDateEpoch?: number };
  updatedAt?: number;
}): { [key in keyof typeof ProjectPrimaryStatus]?: number } => {
  return {
    OPEN: data?.details?.expectedStartDate,
    ACTIVE: data?.details?.expectedStartDate,
    ON_GOING: data?.listingDetails?.endDateEpoch,
    TERMINATED: data?.updatedAt,
    COMPLETED: data?.listingDetails?.endDateEpoch,
    WITHDRAWN: data?.updatedAt,
    BLOCKED: data?.listingDetails?.endDateEpoch,
  };
};

export { getProjectPanelDate1Icon, getProjectPanelDate2Icon, getProjectPanelDate1Values, getProjectPanelDate2Values };
