import FlexternAvatar from '@/flexternships/app/components/core/avatars/FlexternAvatar';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import ExpandableText from '@/flexternships/app/components/core/ExpandableText';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';
import { GithubMetricType } from '@/flexternships/constraints/enums/analytics-enums';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { getGitHubBranchHistoryPaginatedService } from '@/flexternships/services/analytics-service';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GitHubBranchCommit, GitHubBranchHistory } from '@/flexternships/constraints/types/analytics-types';
import Spinner from '@/flexternships/app/components/core/Spinner';

function BranchHistorySkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <BoxSkeleton key={index} className="w-full h-24" />
      ))}
    </div>
  );
}

export default function BranchHistory() {
  const { projectId, userId } = useParams();
  const [branchHistoryData, setBranchHistoryData] = useState<GitHubBranchCommit[]>([]);
  const [metadata, setMetadata] = useState<GitHubBranchHistory['metadata']>({
    currentPage: 0,
    pageSize: 10,
    totalRecords: 0,
    hasNextPage: true,
  });
  const [isBranchHistoryLoading, setIsBranchHistoryLoading] = useState(false);

  // Function to fetch branch history data
  const fetchBranchHistory = async (options = { resetPage: false }) => {
    if (!projectId || !userId) {
      throw new Error('Invalid page url or project/user id not found');
    }

    // Start loading state
    setIsBranchHistoryLoading(true);

    try {
      const currentPage = options.resetPage ? 1 : metadata.currentPage + 1;
      const fetchOptions = { metricType: GithubMetricType.COMMITS, page: currentPage, pageSize: metadata.pageSize };
      const data = await getGitHubBranchHistoryPaginatedService(projectId, userId, fetchOptions);

      if (data) {
        setBranchHistoryData((prevData) => (options.resetPage ? data.data : [...prevData, ...data.data]));
        setMetadata(data.metadata);
      }
    } catch (error: unknown) {
      showToastMessage(ToastType.ERROR, error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      // Stop loading state
      setIsBranchHistoryLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch of branch history data
    fetchBranchHistory({ resetPage: true });
  }, [projectId, userId]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
        !isBranchHistoryLoading &&
        metadata.hasNextPage
      ) {
        fetchBranchHistory();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [metadata.hasNextPage, isBranchHistoryLoading]);

  if (isBranchHistoryLoading && metadata.currentPage === 0) {
    return <BranchHistorySkeleton />;
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        {branchHistoryData.length > 0
          ? branchHistoryData.map((item: GitHubBranchCommit, index: number) => (
              <SimpleElevatedCard key={index} className="bg-white flex items-start p-4 flex-wrap gap-y-5">
                <div className="flex items-center gap-2 w-full md:w-1/3">
                  <FlexternAvatar
                    className="text-base"
                    imageUri={item.imageUri}
                    firstName={item.firstName}
                    lastName={item.lastName}
                  />
                  <div>
                    <div className="text-[#5E5873] font-montserrat text-sm font-medium leading-[23px]">
                      {item.firstName} {item.lastName}
                    </div>
                    <div className="text-[#6E6B7B] font-montserrat text-sm font-normal leading-[21px]">{item.role}</div>
                  </div>
                </div>

                <div className="w-full md:w-2/3 border-l border-[#E0E0E0] pl-5">
                  <div className="text-[#B9B9C3] font-montserrat text-xs font-medium leading-5">
                    {formatEpochToHumanReadable(item.timestamp)}
                  </div>
                  <ExpandableText charLimit={200}>{item.message}</ExpandableText>
                </div>
              </SimpleElevatedCard>
            ))
          : !isBranchHistoryLoading && <div className="text-lg text-center text-grey">No branch history found</div>}
        {isBranchHistoryLoading && (
          <div className="flex justify-center items-center py-4">
            <Spinner className="size-10" />
          </div>
        )}
      </div>
    </div>
  );
}
