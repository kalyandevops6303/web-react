import SimpleElevatedCard from '../../components/core/cards/SimpleElevatedCard';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'react-feather';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { useEffect } from 'react';
import BoxSkeleton from '../../components/core/skeletons/BoxSkeleton';
import { Grade } from '@/flexternships/app/components/tds/grade/Grade';
import TooltipInfo from '../../components/core/tooltips/TooltipInfo';

export default function GithubInsightsCard() {
  const params = useParams();

  const data = useAnalyticsStore((state) => state.commits);
  const getData = useAnalyticsStore((state) => state.getCommits);
  const isCommitsLoading = useAnalyticsStore((state) => state.isCommitsLoading);

  useEffect(() => {
    getData(params?.projectId);
  }, [params?.projectId]);

  if (isCommitsLoading) {
    return <BoxSkeleton className="w-full h-[200px]" />;
  }

  return (
    <SimpleElevatedCard className="bg-white rounded-lg w-full">
      <div className="border-b border-grey-50">
        <div className="px-5 py-4 flex items-center justify-between">
          <h1 className="text-dark-100 font-montserrat text-lg font-medium leading-xxl-custom">Commits & Quality</h1>
          <Link to={`/analytics/project/${params?.projectId}/team/commits`}>
            <div className="flex items-center gap-1">
              <p className="text-trublue-secondary-500 text-center font-montserrat text-sm font-semibold leading-normal tracking-wider">
                View all
              </p>
              <ChevronRight size={16} color="#0185E4" />
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center p-5 gap-4 w-full">
        <div className="flex flex-col items-center gap-y-2 w-full md:w-1/2">
          <div className="text-dark-100 font-montserrat text-[22px] font-semibold leading-[26px] text-center">
            {data?.pullRequestsCount}
          </div>
          <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">Pull Requests</div>
        </div>
        <div className="flex flex-col items-center gap-y-2 w-full md:w-1/2">
          <div className="text-dark-100 font-montserrat text-[22px] font-semibold leading-[26px] text-center">
            {data?.commitsCount}
          </div>
          <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">Commits</div>
        </div>

        {data?.securityRatingGrade && (
          <div className="flex flex-col items-center gap-y-2 w-full md:w-1/2">
            <div className="text-dark-100 font-montserrat text-[22px] font-semibold leading-[26px] text-center">
              <Grade value={data?.securityRatingGrade} />
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">
              <div className="flex items-center gap-1">
                <div>Security</div>
                <TooltipInfo iconSize={14}>Security Rating</TooltipInfo>
              </div>
            </div>
          </div>
        )}

        {data?.reliabilityRatingGrade && (
          <div className="flex flex-col items-center gap-y-2 w-full md:w-1/2">
            <div className="text-dark-100 font-montserrat text-[22px] font-semibold leading-[26px] text-center">
              <Grade value={data?.reliabilityRatingGrade} />
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">
              <div className="flex items-center gap-1">
                <div>Reliability</div>
                <TooltipInfo iconSize={14}>Reliability Rating</TooltipInfo>
              </div>
            </div>
          </div>
        )}

        {data?.maintainabilityRatingGrade && (
          <div className="flex flex-col items-center gap-y-2 w-full md:w-1/2">
            <div className="text-dark-100 font-montserrat text-[22px] font-semibold leading-[26px] text-center">
              <Grade value={data?.maintainabilityRatingGrade} />
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">
              <div className="flex items-center gap-1">
                <div>Maintainability</div>
                <TooltipInfo iconSize={14}>Maintainability Rating</TooltipInfo>
              </div>
            </div>
          </div>
        )}
      </div>
    </SimpleElevatedCard>
  );
}
