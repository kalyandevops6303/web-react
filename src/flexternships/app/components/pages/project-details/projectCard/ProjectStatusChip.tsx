import { ProjectPrimaryStatus, ProjectSecondaryStatus } from '@/flexternships/constraints/enums/core-enums';
import { StatusType } from '@/flexternships/constraints/enums/project-enums';
import { getProjectPrimaryStatusText, getProjectSecondaryStatusText } from '@/flexternships/utils/core-utils';

interface ProjectStatusChipProps {
  status: ProjectSecondaryStatus | ProjectPrimaryStatus;
  statusType: keyof typeof StatusType;
  rounded?: boolean;
  lastInProgressMilestone?: number;
}

const ProjectStatusChip = ({
  status,
  statusType,
  rounded = false,
  lastInProgressMilestone,
}: ProjectStatusChipProps) => {
  const ProjectStatusChipClassnames = {
    [ProjectPrimaryStatus.OPEN]: 'bg-skyblue-light text-skyblue border border-skyblue',
    [ProjectPrimaryStatus.DRAFT]: '',
    [ProjectPrimaryStatus.ACTIVE]: 'bg-green-200 text-green-600 border border-green-400',
    [ProjectPrimaryStatus.ON_GOING]: 'bg-green-200 text-green-600 border border-green-400',
    [ProjectPrimaryStatus.TERMINATED]: 'bg-red-100 text-red-600 border border-red-400',
    [ProjectPrimaryStatus.COMPLETED]: 'bg-orange-200 text-orange-600 border border-orange-400',
    [ProjectPrimaryStatus.WITHDRAWN]: 'bg-orange-50 text-orange-500 border-2 border-orange-500',
    [ProjectPrimaryStatus.BLOCKED]: 'bg-[#EA5455] border border-[#EA5455] bg-[rgba(234,84,85,0.12)]',
  };

  const SecondaryStatusChipClassNames = {
    [ProjectSecondaryStatus.SIGN_DOCUMENTS]: 'bg-orange-50 text-orange-600',
    [ProjectSecondaryStatus.SIGN_CONTRACT]: 'bg-orange-50 text-orange-600',
    [ProjectSecondaryStatus.MILESTONE]: 'bg-orange-50 text-orange-600',
    [ProjectSecondaryStatus.SIGN_NDA]: 'bg-orange-50 text-orange-600',
    [ProjectSecondaryStatus.SIGN_REQUESTED]: 'bg-orange-50 text-orange-600',
    [ProjectSecondaryStatus.COMPLETED]: 'bg-green-200 text-green-600',
  };

  const statusClass =
    statusType === StatusType?.PRIMARY
      ? ProjectStatusChipClassnames[status as ProjectPrimaryStatus]
      : SecondaryStatusChipClassNames[status as ProjectSecondaryStatus];

  return (
    <h1
      className={`w-fit text-center text-xs px-2 py-1 font-semibold border rounded-md rounded-${
        rounded ? '2xl' : 'lg'
      } ${statusClass}`}
    >
      {(statusType === StatusType?.PRIMARY
        ? getProjectPrimaryStatusText(status as ProjectPrimaryStatus)
        : getProjectSecondaryStatusText(status as ProjectSecondaryStatus, lastInProgressMilestone)
      )?.toString() || status}
    </h1>
  );
};

export default ProjectStatusChip;
