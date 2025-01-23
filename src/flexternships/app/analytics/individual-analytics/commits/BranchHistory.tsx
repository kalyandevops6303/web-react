import FlexternAvatar from '@/flexternships/app/components/core/avatars/FlexternAvatar';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import ExpandableText from '@/flexternships/app/components/core/ExpandableText';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Add this interface before the component
interface BranchHistoryItem {
  imageUri: string;
  firstName: string;
  lastName: string;
  role: string;
  commitEpoch: number;
  commitMessage: string;
}

export default function BranchHistory() {
  const { projectId, userId } = useParams();

  const data = useAnalyticsStore((state) => state.branchHistory);
  const getData = useAnalyticsStore((state) => state.getBranchHistory);
  const isBranchHistoryLoading = useAnalyticsStore((state) => state.isBranchHistoryLoading);

  useEffect(() => {
    getData(projectId, userId);
  }, [projectId, userId]);

  if (isBranchHistoryLoading) {
    return <BoxSkeleton className="w-full h-[200px]" />;
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        {data?.map((item: BranchHistoryItem, index: number) => (
          <SimpleElevatedCard key={index} className="bg-white flex items-start p-4 flex-wrap gap-y-5">
            <div className="flex items-center gap-2 w-full md:w-1/2">
              <FlexternAvatar imageUri={item.imageUri} firstName={item.firstName} lastName={item.lastName} />
              <div>
                <div className="text-[#5E5873] font-montserrat text-sm font-medium leading-[23px]">
                  {item.firstName} {item.lastName}
                </div>
                <div className="text-[#6E6B7B] font-montserrat text-sm font-normal leading-[21px]">{item.role}</div>
              </div>
            </div>

            <div className="w-full md:w-1/2 border-l border-[#E0E0E0] pl-4">
              <div className="text-[#B9B9C3] font-montserrat text-xs font-medium leading-5">
                {formatEpochToHumanReadable(item.commitEpoch)}
              </div>
              <ExpandableText>{item.commitMessage}</ExpandableText>
            </div>
          </SimpleElevatedCard>
        ))}
      </div>
    </div>
  );
}
