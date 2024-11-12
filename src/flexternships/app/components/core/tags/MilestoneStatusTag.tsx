import { MilestoneStatus, UserType } from '@/flexternships/constraints/enums/core-enums';
import { cn } from '@/flexternships/lib/utils';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { getMilestoneStatusTextByUserType } from '@/flexternships/utils/core-utils';

function MilestoneStatusTag(props: Props) {
  const { status } = props;
  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const css = {
    [MilestoneStatus.CREATED]: '',
    [MilestoneStatus.IN_PROGRESS]: 'text-orange bg-yellow',
    [MilestoneStatus.IN_REVIEW]:
      userDetails?.userType === UserType.CLIENT ? 'text-orange bg-yellow' : 'text-success bg-success',
    [MilestoneStatus.COMPLETED]: 'text-success bg-success',
  };

  return (
    <div className={cn(css[status], 'text-xs font-semibold leading-4.5 not-italic px-2 py-[1px] rounded-[24px]', 'bg-opacity-10')}>
      {getMilestoneStatusTextByUserType(status, userDetails?.userType)}
    </div>
  );
}

export default MilestoneStatusTag;

type Props = {
  status: MilestoneStatus;
};
