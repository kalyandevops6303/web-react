import TeamMembersTable from './tables/TeamMembersTable';
import TeamLeaderboardTable from './tables/TeamLeaderboardTable';
import MultipleLinesChart from '../../components/core/charts/MultipleLinesChart';
import CustomDonutChart from '../../components/core/charts/CustomDonutChart/CustomDonutChart';
import { StatsOrientation } from '@/flexternships/constraints/enums/chart-enums';
import PerformanceInsightsCard from './PerformanceInsightsCard';
import CustomPieChart2 from '../../components/core/charts/CustomPieChart2/CustomPieChart2';
import TeamMembersChartTooltip from './tooltips/TeamMembersChartTooltip';
import BreadCrumbs from '@flexternships/app/components/pages/project-details/BreadCrumbs';
import AIGeneratedSummary from '../../components/core/cards/AIGeneratedSummary';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SimpleElevatedCard from '../../components/core/cards/SimpleElevatedCard';
import { ChevronRight } from 'react-feather';
import { StatusType } from '@/flexternships/constraints/enums/project-enums';
import { BadgeType } from '@/flexternships/constraints/types/project-details-types';
import TagGroup from '@/flexternships/app/components/core/tags/TagGroup';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/flexternships/app/components/ui/select';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import BoxSkeleton from '../../components/core/skeletons/BoxSkeleton';
import ProjectStatusChip from '../../components/pages/project-details/projectCard/ProjectStatusChip';
import CustomXAxisLabel from './labels/CustomXAxisLabel';

export default function TeamAnalytics() {
  const teamPerformanceSummary = useAnalyticsStore((state) => state.team.performanceSummary);
  const getTeamPerformanceSummary = useAnalyticsStore((state) => state.getTeamPerformanceSummary);
  const teamDiversity = useAnalyticsStore((state) => state.team.teamDiversity);
  const params = useParams();

  const [tagsData, setTagsData] = useState<BadgeType[]>([]);

  const projectDetails = useProjectsStore((state) => state.projectDetails);
  const teamMembersAttractiveness = useAnalyticsStore((state) => state.team.teamMembersAttractivenessDetails);
  const teamRoles = useAnalyticsStore((state) => state.team.teamRoles);
  const teamUniversities = useAnalyticsStore((state) => state.team.teamUniversities);
  const teamMembersDetails = useAnalyticsStore((state) => state.team.teamMembersDetails);

  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);
  const getTeamMembersAttractiveness = useAnalyticsStore((state) => state.getTeamMembersAttractivenessDetails);
  const getTeamRoles = useAnalyticsStore((state) => state.getTeamRoles);
  const getTeamUniversities = useAnalyticsStore((state) => state.getTeamUniversities);
  const getTeamDiversity = useAnalyticsStore((state) => state.getTeamDiversity);
  const getTeamMembersDetails = useAnalyticsStore((state) => state.getTeamMembersDetails);

  const isProjectDetailsLoading = useProjectsStore((state) => state.projectDetailsLoading);
  const isTeamRolesLoading = useAnalyticsStore((state) => state.team.isTeamRolesLoading);
  const isTeamUniversitiesLoading = useAnalyticsStore((state) => state.team.isTeamUniversitiesLoading);
  const isTeamDiversityLoading = useAnalyticsStore((state) => state.team.isTeamDiversityLoading);
  const isTeamPerformanceSummaryLoading = useAnalyticsStore((state) => state.team.isPerformanceSummaryLoading);
  const isTeamMembersAttractivenessLoading = useAnalyticsStore(
    (state) => state.team.isTeamMembersAttractivenessDetailsLoading,
  );
  const isTeamMembersDetailsLoading = useAnalyticsStore((state) => state.team.isTeamMembersDetailsLoading);

  useEffect(() => {
    if (params?.projectId) {
      getProjectDetails(params?.projectId);
      getTeamPerformanceSummary(params?.projectId);
      getTeamMembersAttractiveness(params?.projectId);
      getTeamRoles(params?.projectId);
      getTeamUniversities(params?.projectId);
      getTeamDiversity(params?.projectId);
      getTeamMembersDetails(params?.projectId);
    }
  }, [params?.projectId]);

  useEffect(() => {
    if (projectDetails) {
      setTagsData([...(projectDetails?.skillsData || []), ...(projectDetails?.toolsData || [])]);
    }
  }, [projectDetails]);

  const formatDate = (date: number) => {
    const dateObj = new Date(date);
    return dateObj
      .toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      })
      .replace(',', '')
      .replace(/(\d{2})$/, "'$1");
  };

  return (
    <div className="bg-background flex flex-col gap-6 px-4 md:px-0 mt-20 md:mt-0">
      <BreadCrumbs
        steps={[
          {
            title: 'Analytics',
            link: '/analytics',
          },
          {
            title: '...',
            link: `/analytics`,
          },
          {
            title: projectDetails?.details?.name,
            link: window.location.href,
            isActive: true,
          },
        ]}
      />

      <div className="flex flex-col md:flex-row gap-2 items-center">
        <div className="w-auto text-dark-200 font-montserrat text-base font-medium leading-6">
          Select project to view analytics:{' '}
        </div>
        <div className="w-[480px] max-w-full">
          <Select value={params?.projectId as string} disabled>
            <SelectTrigger className="border-border bg-white">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={params?.projectId as string}>{projectDetails?.details?.name}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {isProjectDetailsLoading || isEmpty(tagsData) ? (
          <BoxSkeleton className="w-full md:w-1/4 h-[200px]" />
        ) : (
          <SimpleElevatedCard className="bg-white p-6 w-full md:w-1/4">
            <div className="flex flex-col gap-4">
              <ProjectStatusChip status={projectDetails?.status} statusType={StatusType?.PRIMARY} />
              <div className="flex flex-row items-center gap-2">
                <Link to={`/project-details/${projectDetails?.id}/team`}>
                  <div className="text-trublue-secondary-500 font-montserrat text-base font-semibold leading-5">
                    {projectDetails?.details?.name}
                  </div>
                </Link>
                <ChevronRight size={18} color="#0185E4" />
              </div>
              <div className="flex gap-1">
                <div className="text-dark-200 font-montserrat text-sm font-normal leading-[22px]">
                  Project Duration:
                </div>
                {projectDetails && (
                  <div className="text-dark-200 font-montserrat text-sm font-medium leading-[22px]">
                    {formatDate(Number(projectDetails?.details?.expectedStartDate))} -{' '}
                    {formatDate(Number(projectDetails?.details?.expectedEndDate))}
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                <div className="text-dark-200 font-montserrat text-sm font-normal leading-[22px]">Status:</div>
                <div className="text-dark-200 font-montserrat text-sm font-medium leading-[22px]">
                  <ProjectStatusChip
                    status={projectDetails?.secondaryStatus?.next}
                    statusType={StatusType?.SECONDARY}
                    rounded
                    lastInProgressMilestone={projectDetails?.lastInProgressMilestone}
                  />
                </div>
              </div>
              <div className="flex gap-1">
                <div className="text-dark-200 font-montserrat text-sm font-normal leading-[22px]">Tags:</div>
                <div className="text-dark-200 font-montserrat text-sm font-medium leading-[22px] flex items-center">
                  <TagGroup tags={tagsData} truncateAfter={3} />
                </div>
              </div>
            </div>
          </SimpleElevatedCard>
        )}
        {isTeamPerformanceSummaryLoading ? (
          <BoxSkeleton className="w-full md:w-3/4" />
        ) : (
          <div className="flex flex-col gap-2 rounded-10 bg-white shadow-card w-full md:w-3/4">
            <AIGeneratedSummary title="Team Performance Summary">{teamPerformanceSummary}</AIGeneratedSummary>
          </div>
        )}
      </div>

      <TeamMembersTable data={teamMembersDetails?.teamData} />

      <div className="rounded-lg bg-white">
        {isTeamMembersDetailsLoading ? (
          <BoxSkeleton className="w-full h-[200px]" />
        ) : (
          <div className="flex flex-row gap-3 w-full bg-white rounded-t-10 border-b border-grey-50">
            <div className="w-1/2 flex flex-col items-center justify-center gap-0.5 border-r border-grey-50 p-3 md:px-6">
              <div>
                <span className="text-center text-xl leading-7 font-semibold text-dark font-montserrat">
                  {teamMembersDetails?.averageAttractivenessScore}
                </span>
                <span className="text-center text-sm leading-5.5 font-normal text-grey-500 font-montserrat">/100</span>
              </div>
              <div className="text-sm leading-5.5 font-medium text-grey-500 font-montserrat">Attractiveness</div>
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center gap-0.5 p-3 md:px-6">
              <div>
                <span className="text-center text-xl leading-7 font-semibold text-dark font-montserrat">
                  {teamMembersDetails?.totalRecognitionCount}
                </span>
              </div>
              <div className="text-sm leading-5.5 font-medium text-grey-500 font-montserrat">WOWs & Kudos</div>
            </div>
          </div>
        )}

        {isTeamMembersAttractivenessLoading ? (
          <BoxSkeleton className="w-full h-[200px]" />
        ) : (
          <div className="mt-[24px]">
            {teamMembersAttractiveness && (
              <MultipleLinesChart
                chartData={teamMembersAttractiveness?.chartData}
                chartConfig={teamMembersAttractiveness?.chartConfig}
                XAxisDataKey={'milestone'}
                maxYAxis={teamMembersAttractiveness?.maxYAxis}
                showFilters
                showDataOnFilters={false}
                customTooltipContent={TeamMembersChartTooltip}
                YAxisDataKey={'score'}
                hideDeselectedMetricsFromTooltip
                customXAxisLabel={CustomXAxisLabel}
              />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-[24px] h-full">
        {!isEmpty(teamRoles) && (
          <div className="rounded-[8px] w-full md:w-1/2 ">
            <CustomPieChart2
              chartData={teamRoles?.chartData}
              chartConfig={teamRoles?.chartConfig}
              totalCount={teamRoles?.totalRolesCount}
              title="Roles"
              centerText="Roles"
              className="bg-white"
              statsOrientation={StatsOrientation.VERTICAL}
              isLoading={isTeamRolesLoading}
            />
          </div>
        )}
        {!isEmpty(teamUniversities) && (
          <div className="rounded-[8px] w-full md:w-1/4">
            <CustomDonutChart
              chartData={teamUniversities?.chartData}
              chartConfig={teamUniversities?.chartConfig}
              totalCount={teamUniversities?.totalUniversityCount}
              title="University"
              centerText="Universities"
              isSemiCircle
              isDonutChart
              statsOrientation={StatsOrientation.VERTICAL}
              className="bg-white"
              isLoading={isTeamUniversitiesLoading}
              calculateTotalManually
            />
          </div>
        )}
        {!isEmpty(teamDiversity) && (
          <div className="rounded-[8px] w-full md:w-1/4">
            <CustomDonutChart
              chartData={teamDiversity?.chartData}
              chartConfig={teamDiversity?.chartConfig}
              totalCount={teamDiversity?.teamMembersCount}
              title="Team Diversity"
              centerText="Team Members"
              statsOrientation={StatsOrientation.HORIZONTAL}
              isDonutChart
              className="bg-white"
              isLoading={isTeamDiversityLoading}
            />
          </div>
        )}
      </div>

      <PerformanceInsightsCard />
      <TeamLeaderboardTable />
    </div>
  );
}
