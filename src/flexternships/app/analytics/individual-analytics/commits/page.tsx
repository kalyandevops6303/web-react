import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import BreadCrumbs from '@/flexternships/app/components/pages/project-details/BreadCrumbs';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton';
import BranchHistory from './BranchHistory';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { useEffect } from 'react';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';

export default function Commits() {
  const { projectId, userId } = useParams();
  const navigate = useNavigate();

  const data = useAnalyticsStore((state) => state.commits);
  const getData = useAnalyticsStore((state) => state.getCommits);
  const isCommitsLoading = useAnalyticsStore((state) => state.isCommitsLoading);
  useEffect(() => {
    getData(projectId, userId);
  }, [projectId, userId]);

  return (
    <div className="flex flex-col gap-5 mx-2 md:mx-0 mt-20 md:mt-0">
      <BreadCrumbs
        steps={[
          {
            title: 'Analytics',
            link: `/analytics/project/${projectId}/individual/${userId}`,
          },
          {
            title: '...',
            link: `/analytics/project/${projectId}/individual/${userId}`,
          },
          {
            title: 'Commits & Quality',
            link: `/analytics/project/${projectId}/individual/${userId}/commits`,
            isActive: true,
          },
        ]}
      />

      <div className="flex items-center justify-between w-full">
        <PrimaryIconText
          icon={<ArrowLeft size={16} color="#00B0FF" />}
          text="Analytics"
          className="text-sm font-medium leading-[150%] font-montserrat text-[#394042] w-fit"
          onClick={() => navigate(`/analytics/project/${projectId}/individual/${userId}`)}
        />

        {isCommitsLoading ? (
          <BoxSkeleton className="w-[100px] h-[30px]" />
        ) : (
          <SecondaryButton onClick={() => window.open(data?.githubUrl, '_blank')}>View in Github</SecondaryButton>
        )}
      </div>

      {isCommitsLoading ? (
        <BoxSkeleton className="w-full h-[100px]" />
      ) : (
        <SimpleElevatedCard className="flex items-center gap-4 bg-white p-4 w-fit text-center">
          <div className="w-[194px]">
            <div className="text-[#071013] text-center font-montserrat text-[22px] font-semibold leading-[26px]">
              {data?.commits}
            </div>
            <div className="text-[#6A7071] text-center font-montserrat text-[14px] font-medium leading-[22px]">
              Commits
            </div>
          </div>
          <div className="w-[1px] h-[50px] bg-[#E6E7E7]" />
          <div className="w-[194px]">
            <div className="text-[#071013] text-center font-montserrat text-[22px] font-semibold leading-[26px]">
              {data?.issues}
            </div>
            <div className="text-[#6A7071] text-center font-montserrat text-[14px] font-medium leading-[22px]">
              Issues
            </div>
          </div>
          <div className="w-[1px] h-[50px] bg-[#E6E7E7]" />
          <div className="w-[194px]">
            <div className="text-[#071013] text-center font-montserrat text-[22px] font-semibold leading-[26px]">
              {data?.pullRequests}
            </div>
            <div className="text-[#6A7071] text-center font-montserrat text-[14px] font-medium leading-[22px]">
              Pull Requests
            </div>
          </div>
        </SimpleElevatedCard>
      )}

      <div>
        <div className="text-[#394042] font-montserrat text-lg font-semibold leading-[26px]">Branch History</div>
        <div className="text-[#5E5873] font-montserrat text-sm font-medium leading-[23px] flex items-center gap-2">
          Project: {isCommitsLoading ? <BoxSkeleton className="w-full h-[30px]" /> : data?.projectName}
        </div>
      </div>

      <BranchHistory />
    </div>
  );
}
