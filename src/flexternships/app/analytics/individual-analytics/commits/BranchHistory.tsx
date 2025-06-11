import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';
import { GithubMetricType } from '@/flexternships/constraints/enums/analytics-enums';
import { getGitHubPullRequestHistoryPaginatedService } from '@/flexternships/services/analytics-service';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GitHubBranchHistory, GitHubPullRequest } from '@/flexternships/constraints/types/analytics-types';
import Spinner from '@/flexternships/app/components/core/Spinner';
import PullRequestCard from './PullRequestCard';

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
  const [branchHistoryData, setBranchHistoryData] = useState<GitHubPullRequest[]>([]);
  const [metadata, setMetadata] = useState<GitHubBranchHistory['metadata']>({
    currentPage: 0,
    pageSize: 10,
    totalRecords: 0,
    hasNextPage: true,
  });
  const [isBranchHistoryLoading, setIsBranchHistoryLoading] = useState(true);

  // Function to fetch branch history data
  const fetchBranchHistory = async (options = { resetPage: false }) => {
    if (!projectId) {
      throw new Error('Invalid page url or project/user id not found');
    }

    // Start loading state
    setIsBranchHistoryLoading(true);

    try {
      const currentPage = options.resetPage ? 1 : metadata.currentPage + 1;
      const fetchOptions = {
        metricType: GithubMetricType.PULL_REQUESTS,
        page: currentPage,
        pageSize: metadata.pageSize,
      };
      const data = await getGitHubPullRequestHistoryPaginatedService(projectId, userId, fetchOptions);

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
  }, [projectId]);

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
          ? branchHistoryData.map((item: GitHubPullRequest, index: number) => (
              <div key={index}>
                <PullRequestCard data={item} />
              </div>
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
