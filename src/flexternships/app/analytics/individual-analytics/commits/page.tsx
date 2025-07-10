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
import { Grade } from '@/flexternships/app/components/tds/grade/Grade';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import TalentHeader from '../talent-header';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { addQueryParams } from '@/flexternships/utils/miscellaneous-utils';
import { useAppStore } from '@/flexternships/stores/core-stores';

export default function Commits() {
  const { projectId, userId } = useParams();
  const navigate = useNavigate();
  const projectDetails = useProjectsStore((state) => state.projectDetails);
  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);
  const isProjectDetailsLoading = useProjectsStore((state) => state.projectDetailsLoading);
  const data = useAnalyticsStore((state) => state.commits);
  const getData = useAnalyticsStore((state) => state.getCommits);
  const talentHeaderData = useAnalyticsStore((state) => state.individualOverview);
  const getTalentHeaderData = useAnalyticsStore((state) => state.getIndividualOverview);
  const isCommitsLoading = useAnalyticsStore((state) => state.isCommitsLoading);
  const blobSasTokenParams = useAppStore((state) => state.blobSasTokenParams);

  useEffect(() => {
    if (projectId && userId) {
      getData(projectId, userId);
      getTalentHeaderData(userId, projectId);
      getProjectDetails(projectId);
    } else if (projectId) {
      getData(projectId);
      getProjectDetails(projectId);
    }
  }, [projectId, userId]);

  const handleViewInGithub = () => {
    if (!data || !data.githubUrl) return showToastMessage(ToastType.ERROR, 'Error opening GitHub URL');
    window.open(data.githubUrl, '_blank');
  };

  const goToIndividualAnalytics = () => {
    navigate(`/analytics/project/${projectId}/team`);
  };

  return (
    <div className="flex flex-col gap-5 px-7">
      <CustomBreadCrumbs
        items={[
          {
            label: 'Analytics',
            href: `/analytics/project/${projectId}/team`,
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
          icon={<ArrowLeft size={18} className="text-trublue-secondary-500" />}
          text="Analytics"
          onClick={goToIndividualAnalytics}
        />

        {isCommitsLoading ? (
          <BoxSkeleton className="w-[100px] h-10" />
        ) : (
          <SecondaryButton onClick={handleViewInGithub} className="m-0">
            View in Github
          </SecondaryButton>
        )}
      </div>

      {userId && (
        <div>
          {isProjectDetailsLoading ? (
            <BoxSkeleton className="w-full h-[100px]" />
          ) : (
            <TalentHeader
              firstName={talentHeaderData?.firstName}
              lastName={talentHeaderData?.lastName}
              role={talentHeaderData?.role?.name}
              imageUri={addQueryParams(talentHeaderData?.imageUri, blobSasTokenParams)}
              education={{
                name: talentHeaderData?.educationalInstitute?.education?.name,
                startYear: talentHeaderData?.educationalInstitute?.startYear,
                endYear: talentHeaderData?.educationalInstitute?.gradYear,
                institution: talentHeaderData?.educationalInstitute?.institution?.name,
              }}
              flexternshipStartDate={formatEpochToHumanReadable(projectDetails?.listingDetails?.startDateEpoch ?? 0)}
              flexternshipEndDate={formatEpochToHumanReadable(projectDetails?.listingDetails?.endDateEpoch ?? 0)}
              className="bg-[#FBC02D]/10 rounded-lg shadow-card"
            />
          )}
        </div>
      )}

      <div className="flex items-center gap-4 w-full">
        <SimpleElevatedCard className="self-start flex items-center justify-evenly gap-4 bg-white p-4 text-center w-full">
          <div className="flex flex-col items-center gap-y-2">
            <div className="text-dark text-center font-montserrat text-xl font-semibold leading-[26px]">
              {isCommitsLoading ? <BoxSkeleton className="w-9 h-6" /> : data?.commitsCount}
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">Commits</div>
          </div>
          <div className="self-stretch border-l-1 border-grey-50" />
          <div className="flex flex-col items-center gap-y-2 ">
            <div className="text-dark text-center font-montserrat text-xl font-semibold leading-[26px]">
              {isCommitsLoading ? <BoxSkeleton className="w-9 h-6" /> : data?.pullRequestsCount}
            </div>
            <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">
              Pull Requests
            </div>
          </div>
        </SimpleElevatedCard>

        <SimpleElevatedCard className="flex flex-col items-center w-full text-center">
          <div className="flex items-center justify-evenly bg-white gap-4 p-4 w-full rounded-t-md">
            <div className="flex flex-col items-center gap-y-2 self-stretch">
              <div className="text-dark text-center font-montserrat text-xl font-semibold leading-[26px]">
                {isCommitsLoading ? <BoxSkeleton className="w-9 h-6" /> : <Grade value={data?.securityRatingGrade} />}
              </div>
              <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">Security</div>
            </div>
            <div className="self-stretch border-l-1 border-grey-50" />
            <div className="flex flex-col items-center gap-y-2">
              <div className="text-dark text-center font-montserrat text-xl font-semibold leading-[26px]">
                {isCommitsLoading ? (
                  <BoxSkeleton className="w-9 h-6" />
                ) : (
                  <Grade value={data?.reliabilityRatingGrade} />
                )}
              </div>
              <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">
                Reliability
              </div>
            </div>
            <div className="self-stretch border-l-1 border-grey-50" />

            <div className="flex flex-col items-center gap-y-2 self-stretch">
              <div className="text-dark text-center font-montserrat text-xl font-semibold leading-[26px]">
                {isCommitsLoading ? (
                  <BoxSkeleton className="w-9 h-6" />
                ) : (
                  <Grade value={data?.maintainabilityRatingGrade} />
                )}
              </div>
              <div className="text-dark-200 text-center font-montserrat text-sm font-medium leading-5.5">
                Maintainability
              </div>
            </div>
          </div>
          <div
            className="h-[11px] w-full bg-black flex items-center justify-evenly rounded-b-md"
            style={{
              background:
                'linear-gradient(90deg, #00BCD4 4.12%, #28C76F 27.04%, #FBC02D 50.06%, #FF9F43 72.97%, #EA5455 95.88%)',
            }}
          >
            <div className="bg-white w-min rounded-full -mt-4">
              <Grade value="A" size={20} textSize={12} />
            </div>
            <div className="bg-white w-min rounded-full -mt-4">
              <Grade value="B" size={20} textSize={12} />
            </div>
            <div className="bg-white w-min rounded-full -mt-4">
              <Grade value="C" size={20} textSize={12} />
            </div>
            <div className="bg-white w-min rounded-full -mt-4">
              <Grade value="D" size={20} textSize={12} />
            </div>
            <div className="bg-white w-min rounded-full -mt-4">
              <Grade value="E" size={20} textSize={12} />
            </div>
          </div>
        </SimpleElevatedCard>
      </div>
      <div>
        <div className="flex items-center gap-[16px]">
          <div className="text-[#394042] text-center font-montserrat text-lg font-semibold leading-[22px]">
            Pull Request History
          </div>
          <div className="text-[#394042] text-center font-montserrat text-sm font-normal leading-[18px]">
            Last updated at:{' '}
            {isCommitsLoading ? (
              <BoxSkeleton className="w-full h-[30px]" />
            ) : (
              formatEpochToHumanReadable(data?.lastGithubSyncRun ?? 0, false, true)
            )}
          </div>
        </div>
        {(isCommitsLoading || data?.projectName) && (
          <div className="text-[#5E5873] font-montserrat text-sm font-medium leading-[23px]">
            Project: {isCommitsLoading ? <BoxSkeleton className="w-full h-[30px]" /> : data.projectName}
          </div>
        )}
      </div>
      <BranchHistory />
    </div>
  );
}
