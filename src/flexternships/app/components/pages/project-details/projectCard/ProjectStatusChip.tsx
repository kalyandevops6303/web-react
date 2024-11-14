import { PrimaryProjectStatus, SecondaryProjectStatus, StatusType } from '@/flexternships/constraints/enums/project-enums';

interface ProjectStatusChipProps {
  status: keyof typeof SecondaryProjectStatus | keyof typeof PrimaryProjectStatus;
  statusType: keyof typeof StatusType;
  rounded?: boolean;
}

const ProjectStatusChip = ({ status, statusType, rounded = false }: ProjectStatusChipProps) => {
  const ProjectStatusChipClassnames = {
    OPEN: 'bg-skyblue-light text-skyblue border border-skyblue',
    IN_REVIEW: 'bg-yellow-100 text-yellow-600 border border-yellow-400',
    ACTIVE: 'bg-green-200 text-green-600 border border-green-400',
    ONGOING: 'bg-green-200 text-green-600 border border-green-400',
    UPCOMING: 'bg-orange-200 text-orange-600 border border-orange-400',
    CLOSED: 'bg-gray-300 text-gray-600 border border-gray-500',
    TERMINATED: 'bg-red-100 text-red-600 border border-red-400',
    COMPLETED: 'bg-orange-200 text-orange-600 border border-orange-400',
  };

  const SecondaryStatusChipClassNames = {
    NEW: 'bg-blue-50 text-blue-500',
    ACTIVE: 'bg-green-50 text-green-600 border-2 border-green-500',
    OPEN: 'bg-sky-50 text-blue-600 border border-blue-600',
    DISPUTED: 'bg-red-50 text-red-600 border-2 border-red-500',
    COMPLETED: 'bg-orange-50 text-amber-500 border-2 border-amber-500',
    ACCEPTED: 'bg-orange-50 text-amber-500 border-2 border-amber-500',
    CREATED: 'bg-orange-50 text-amber-500 border-2 border-amber-500',
    YET_TO_START: 'bg-orange-50 text-amber-500 border-2 border-amber-500',
    TO_BE_LISTED: 'bg-orange-50 text-amber-500 border-2 border-amber-500',
    ON_GOING: 'bg-green-50 text-green-600 border-2 border-green-500',
    WITHDRAWN: 'bg-orange-50 text-orange-500 border-2 border-orange-500',
    REVIEWED: 'bg-gray-200 text-gray-700',
    IN_PROGRESS: 'bg-gray-200 text-gray-700',
    DRAFT: 'bg-gray-200 text-gray-700',
    ONGOING: 'bg-orange-50 text-orange-600',
    UPCOMING: 'bg-sky-50 text-blue-600',
    IN_REVIEW: 'bg-orange-100 text-orange-500',
    TERMINATED: 'bg-red-100 text-red-900',
    REJECTED: 'bg-red-100 text-red-900',
    LISTING_EXPIRED: 'bg-red-100 text-red-900',
    SIGN_CONTRACT: 'bg-orange-50 text-orange-600',
    CLOSED: 'bg-gray-100 text-gray-600',
    OPEN_PROJECT: 'bg-green-50 text-green-500',
    INVITED: 'bg-purple-50 text-purple-600',
    UPDATED: 'bg-purple-50 text-purple-600',
    PENDING: 'bg-orange-50 text-orange-600',
  };

  const statusClass =
    statusType === StatusType?.PRIMARY
      ? ProjectStatusChipClassnames[status as keyof typeof ProjectStatusChipClassnames]
      : SecondaryStatusChipClassNames[status as keyof typeof SecondaryStatusChipClassNames];

  return (
    <h1
      className={`w-fit text-center text-xs px-2 py-1 font-semibold border rounded-md rounded-${
        rounded ? '2xl' : 'lg'
      } ${statusClass}`}
    >
      {(statusType === StatusType?.PRIMARY
        ? PrimaryProjectStatus[status as keyof typeof PrimaryProjectStatus]
        : SecondaryProjectStatus[status as keyof typeof SecondaryProjectStatus]
      )?.toString() || status}
    </h1>
  );
};

export default ProjectStatusChip;
