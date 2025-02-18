import StartDateSVG from '@flexternships/assets/svgs/project-details/start-date.svg';
import EndDateSVG from '@flexternships/assets/svgs/project-details/end-date.svg';
import ClosedDateSVG from '@flexternships/assets/svgs/project-details/closed-date.png';
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
      return (
        <div className="bg-[#60B3EC] rounded-full p-3">
          <Calendar />
        </div>
      );
    }
    case 'ONGOING':
    case 'TERMINATED':
    case 'COMPLETED':
    case 'ON_GOING':
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
    case 'ON_GOING':
    case 'BLOCKED':
    case 'COMPLETED': {
      return <img src={EndDateSVG} alt="End Date Icon" />;
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
    case 'CLOSED': {
      return (
        <div className="bg-[#CFD8DC] rounded-full">
          <img src={ClosedDateSVG} alt="End Date Icon" />
        </div>
      );
    }
    case 'WITHDRAWN': {
      return (
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="46" height="46" rx="23" fill="#EA5455" fill-opacity="0.12" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 23C12 16.9 16.9 12 23 12C29.0338 12 33.8934 16.7942 33.9983 22.8017C33.3784 22.4434 32.6884 22.1927 31.9539 22.0754C31.4963 17.5159 27.6877 14 23 14C18 14 14 18 14 23C14 28 18 32 23 32C24.0905 32 25.1335 31.8097 26.0977 31.4603C26.5191 32.0561 27.0463 32.5718 27.6521 32.9798C26.241 33.6349 24.6652 34 23 34C16.9 34 12 29.1 12 23ZM26.033 24.633C25.6383 25.2143 25.3428 25.8685 25.1712 26.5712L22.3 23.7C22.1 23.5 22 23.3 22 23V17C22 16.4 22.4 16 23 16C23.6 16 24 16.4 24 17V22.6L26.033 24.633Z"
            fill="#EA5455"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M27.914 24.5H34.086C34.3344 24.5 34.5 24.6556 34.5 24.8889V31.1111C34.5 31.3444 34.3344 31.5 34.086 31.5H27.914C27.6656 31.5 27.5 31.3444 27.5 31.1111V24.8889C27.5 24.6556 27.6656 24.5 27.914 24.5ZM28.328 30.7222H33.672V25.2778H28.328V30.7222Z"
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
  details?: { expectedStartDate?: number; expectedEndDate?: number };
  listingDetails?: { startDateEpoch?: number; endDateEpoch?: number };
  updatedAt?: number;
}): { [key in keyof typeof ProjectPrimaryStatus]?: number } => {
  return {
    OPEN: data?.details?.expectedStartDate,
    ACTIVE: data?.details?.expectedStartDate,
    ON_GOING: data?.details?.expectedEndDate,
    TERMINATED: data?.updatedAt,
    COMPLETED: data?.updatedAt || data?.details?.expectedEndDate,
    WITHDRAWN: data?.updatedAt,
    BLOCKED: data?.details?.expectedEndDate,
  };
};

export { getProjectPanelDate1Icon, getProjectPanelDate2Icon, getProjectPanelDate1Values, getProjectPanelDate2Values };
