import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import CustomBreadCrumbs from '@/flexternships/app/components/core/CustomBreadCrumbs';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton';
import BranchHistory from './BranchHistory';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { useEffect } from 'react';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';

export default function Commits() {
  const { projectId, userId } = useParams();
  const navigate = useNavigate();

  const data = useAnalyticsStore((state) => state.commits);
  const getData = useAnalyticsStore((state) => state.getCommits);
  const isCommitsLoading = useAnalyticsStore((state) => state.isCommitsLoading);

  useEffect(() => {
    getData(projectId, userId);
  }, [projectId, userId]);

  const handleViewInGithub = () => {
    if (!data || !data.githubUrl) return showToastMessage(ToastType.ERROR, 'Error opening GitHub URL');
    window.open(data.githubUrl, '_blank');
  };

  const goToIndividualAnalytics = () => {
    navigate(`/analytics/project/${projectId}/individual/${userId}`);
  };

  return (
    <div className="flex flex-col gap-5 mx-2 md:mx-0 mt-20 md:mt-0">
      <CustomBreadCrumbs
        items={[
          {
            label: 'Analytics',
            href: `/analytics/project/${projectId}/team`,
          },
          {
            label: 'Individual Analytics',
            href: `/analytics/project/${projectId}/individual/${userId}`,
          },
          {
            label: 'Commits & Quality',
            href: `/analytics/project/${projectId}/individual/${userId}/commits`,
          },
        ]}
        startWithHome
      />

      <div className="flex items-center justify-between w-full">
        <PrimaryIconText
          icon={<ArrowLeft size={16} className="text-trublue-secondary-500" />}
          text="Analytics"
          className="text-sm font-medium leading-6 font-montserrat text-dark-100 w-fit"
          onClick={goToIndividualAnalytics}
        />

        {isCommitsLoading ? (
          <BoxSkeleton className="w-[100px] h-[30px]" />
        ) : (
          <SecondaryButton onClick={handleViewInGithub}>View in Github</SecondaryButton>
        )}
      </div>

      {isCommitsLoading ? (
        <BoxSkeleton className="w-full h-[100px]" />
      ) : (
        <SimpleElevatedCard className="flex items-center gap-4 bg-white p-4 w-fit text-center">
          <div className="w-[194px]">
            <div className="text-dark text-center font-montserrat text-xl font-semibold leading-[26px]">
              {data?.commits}
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">Commits</div>
          </div>
          <div className="w-[1px] h-[50px] bg-border" />
          <div className="w-[194px]">
            <div className="text-dark text-center font-montserrat text-xl font-semibold leading-[26px]">
              {data?.issues}
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">Issues</div>
          </div>
          <div className="w-[1px] h-[50px] bg-border" />
          <div className="w-[194px]">
            <div className="text-dark text-center font-montserrat text-xl font-semibold leading-[26px]">
              {data?.pullRequests}
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">
              Pull Requests
            </div>
          </div>
        </SimpleElevatedCard>
      )}

      <div>
        <div className="text-dark-100 font-montserrat text-lg font-semibold leading-[26px]">Branch History</div>
        <div className="text-grey-heading font-montserrat text-sm font-medium leading-[23px] flex items-center gap-2">
          Project: {isCommitsLoading ? <BoxSkeleton className="w-full h-[30px]" /> : data?.projectName}
        </div>
      </div>

      <BranchHistory />
    </div>
  );
}
