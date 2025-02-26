import StartDateSVG from '@flexternships/assets/svgs/project-details/start-date.svg';
import EndDateSVG from '@flexternships/assets/svgs/project-details/end-date.svg';
import ClosedDateSVG from '@flexternships/assets/svgs/project-details/closed-date.png';
import WithdrawnDateSVG from '@flexternships/assets/svgs/project-details/withdrawn-date.svg';
import TerminatedDateSVG from '@flexternships/assets/svgs/project-details/terminated-date.svg';
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
      return <img src={TerminatedDateSVG} alt="End Date Icon" />;
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
        <div className="bg-[#CFD8DC] rounded-full">
          <img src={WithdrawnDateSVG} alt="Withdrawn Date Icon" />
        </div>
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
