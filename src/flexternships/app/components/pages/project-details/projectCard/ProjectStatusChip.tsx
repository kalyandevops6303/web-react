import { ProjectPrimaryStatus, ProjectSecondaryStatus } from '@/flexternships/constraints/enums/core-enums';
import { StatusType } from '@/flexternships/constraints/enums/project-enums';
import { useProjectMilestonesStore } from '@/flexternships/stores/project-milestones-store';
import { getProjectPrimaryStatusText, getProjectSecondaryStatusText } from '@/flexternships/utils/core-utils';
import { useNavigate, useParams } from 'react-router-dom';

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
  const navigation = useNavigate();
  const { projectId } = useParams();
  const projectMilestones = useProjectMilestonesStore((state) => state.projectMilestones);
  const ProjectStatusChipClassnames = {
    [ProjectPrimaryStatus.OPEN]: 'bg-skyblue-light text-skyblue border border-skyblue',
    [ProjectPrimaryStatus.DRAFT]: '',
    [ProjectPrimaryStatus.ACTIVE]: 'bg-[#28C76F1F] text-success border border-success',
    [ProjectPrimaryStatus.ON_GOING]: 'bg-[#28C76F1F] text-success border border-success',
    [ProjectPrimaryStatus.TERMINATED]: 'bg-[#B71C1C1F] text-[#B71C1C] border border-[#B71C1C]',
    [ProjectPrimaryStatus.COMPLETED]: 'bg-skyblue-light text-skyblue border border-skyblue',
    [ProjectPrimaryStatus.WITHDRAWN]: 'bg-orange-light text-orange-dark border-1 border-orange-dark',
    [ProjectPrimaryStatus.BLOCKED]: 'bg-[#EA54551F] text-[#EA5455] border border-[#EA5455]',
  };

  const SecondaryStatusChipClassNames = {
    [ProjectSecondaryStatus.SIGN_DOCUMENTS]: 'bg-[#00B0FF1F] text-[#00B0FF]',
    [ProjectSecondaryStatus.SIGN_CONTRACT]: 'bg-[#00B0FF1F] text-[#00B0FF]',
    [ProjectSecondaryStatus.MILESTONE]: 'bg-[#FF6D001F] text-[#FF6D00]',
    [ProjectSecondaryStatus.SIGN_NDA]: 'bg-orange-50 text-orange-600',
    [ProjectSecondaryStatus.SIGN_REQUESTED]: 'bg-[#00B0FF1F] text-[#00B0FF]',
    [ProjectSecondaryStatus.COMPLETED]: 'bg-[#00C8531F] text-[#00C853]',
  };

  const SecondaryStatusChipRedirectionLinks = {
    [ProjectSecondaryStatus.SIGN_DOCUMENTS]: `/project-details/${projectId}/projects`,
    [ProjectSecondaryStatus.SIGN_CONTRACT]: `/project-details/${projectId}/doc/contract`,
    [ProjectSecondaryStatus.MILESTONE]:
      lastInProgressMilestone !== undefined
        ? `/project-details/${projectId}/milestone/${projectMilestones[lastInProgressMilestone - 1]?.id}`
        : '/project-details/${projectId}/milestone',
    [ProjectSecondaryStatus.SIGN_NDA]: `/project-details/${projectId}/doc/nda`,
    [ProjectSecondaryStatus.SIGN_REQUESTED]: `/project-details/${projectId}/projects`,
    [ProjectSecondaryStatus.COMPLETED]: 'bg-[#00C8531F] text-[#00C853]',
  };

  const statusClass =
    statusType === StatusType?.PRIMARY
      ? ProjectStatusChipClassnames[status as ProjectPrimaryStatus]
      : SecondaryStatusChipClassNames[status as ProjectSecondaryStatus];

  const handleRedirection = () => {
    statusType === StatusType?.SECONDARY &&
      navigation(SecondaryStatusChipRedirectionLinks[status as ProjectSecondaryStatus]);
  };

  return (
    <h1
      onClick={handleRedirection}
      className={`w-fit text-center text-xs px-2 py-1 font-semibold border rounded-md rounded-${
        rounded ? '2xl' : 'lg'
      } ${statusClass} ${statusType === StatusType?.SECONDARY && 'cursor-pointer'}`}
    >
      {(statusType === StatusType?.PRIMARY
        ? getProjectPrimaryStatusText(status as ProjectPrimaryStatus)
        : getProjectSecondaryStatusText(status as ProjectSecondaryStatus, lastInProgressMilestone)
      )?.toString() || status}
    </h1>
  );
};

export default ProjectStatusChip;
