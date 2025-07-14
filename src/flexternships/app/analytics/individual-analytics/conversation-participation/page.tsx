import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText';
import { ArrowLeft } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import MessageStats from './MessageStats';
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import { Info } from 'react-feather';
import FileStats from './FileStats';
import CustomBreadCrumbs from '@/flexternships/app/components/core/CustomBreadCrumbs';
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils';
import TalentHeader from '../talent-header';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { useEffect } from 'react';
import { useAppStore } from '@/flexternships/stores/core-stores';
import { addQueryParams } from '@/flexternships/utils/miscellaneous-utils';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';

export default function ConversationParticipationPage() {
  const navigate = useNavigate();
  const { projectId, userId } = useParams();

  const talentHeaderData = useAnalyticsStore((state) => state.individualOverview);
  const getTalentHeaderData = useAnalyticsStore((state) => state.getIndividualOverview);
  const isTalentHeaderLoading = useAnalyticsStore((state) => state.isIndividualOverviewLoading);
  const blobSasTokenParams = useAppStore((state) => state.blobSasTokenParams);
  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);
  const isProjectDetailsLoading = useProjectsStore((state) => state.projectDetailsLoading);
  const projectDetails = useProjectsStore((state) => state.projectDetails);

  useEffect(() => {
    if (projectId && userId) {
      getTalentHeaderData(userId, projectId);
    } else if (projectId) {
      getProjectDetails(projectId);
    }
  }, [projectId, userId]);

  return (
    <div className="flex flex-col gap-5 px-7 mt-20 md:mt-0 w-full">
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
            label: 'Conversation Participation',
            href: `/analytics/project/${projectId}/individual/${userId}/conversation-participation`,
          },
        ]}
      />

      <PrimaryIconText
        icon={<ArrowLeft size={18} className="text-trublue-secondary-500" />}
        text="Analytics"
        className="text-sm font-medium self-start tracking-wide"
        onClick={() => navigate(`/analytics/project/${projectId}/individual/${userId}`)}
      />

      {isTalentHeaderLoading || isProjectDetailsLoading ? (
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

      <MessageStats />

      <SimpleElevatedCard className="bg-[#0185E41F] px-4 py-3 flex flex-row items-start flex-wrap md:flex-nowrap gap-1 shadow-card">
        <div className="flex flex-row items-center gap-x-2 text-trublue-secondary-500">
          <Info size={16} />
          <div className="text-sm font-semibold leading-6 font-montserrat">Note:</div>
        </div>
        <div className="text-sm font-normal leading-6 font-montserrat text-grey-500">
          This represented data is to help you get a better understanding of individual’s participation, this in no way
          is the representation of individual’s performance.{' '}
        </div>
      </SimpleElevatedCard>

      <FileStats />
    </div>
  );
}
