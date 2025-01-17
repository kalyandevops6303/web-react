import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import CompetencyMatrix from './CompetencyMatrix';
import { useEffect, useState } from 'react';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';
import {
  getDetailedPerformanceInsightsService,
  getTeamCompetencySummaryService,
} from '@/flexternships/services/analytics-service';
import { useParams } from 'react-router-dom';
import { DetailedPerformanceInsights, TeamCompetencySummary } from '@/flexternships/constraints/types/analytics-types';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import AIGeneratedSummary from '@/flexternships/app/components/core/cards/AIGeneratedSummary';
import { isEmpty } from 'lodash';
import ExpandableText from '@/flexternships/app/components/core/ExpandableText';

export default function PerformanceInsightsCard({ competencyItem }: PerformanceInsightsCardProps) {
  const [isGridLoading, setIsGridLoading] = useState<boolean>(true);
  const [detailedPerformanceInsights, setDetailedPerformanceInsights] = useState<
    DetailedPerformanceInsights | undefined
  >(undefined);

  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(true);
  const [teamCompetencySummary, setTeamCompetencySummary] = useState<TeamCompetencySummary | undefined>();

  const { projectId } = useParams();

  useEffect(() => {
    if (!projectId) throw new Error('Project ID is required');
    const fetchData = async () => {
      setIsGridLoading(true);
      try {
        const data = await getDetailedPerformanceInsightsService(projectId, competencyItem.abbreviation);
        setDetailedPerformanceInsights(data);
        setIsGridLoading(false);
      } catch (error: unknown) {
        showToastMessage(
          ToastType.ERROR,
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while fetching detailed performance insights',
        );
      }
    };
    fetchData();
  }, [projectId, competencyItem.abbreviation]);

  useEffect(() => {
    if (!projectId) return;
    const fetchSummary = async () => {
      setIsSummaryLoading(true);
      try {
        const summaryList = await getTeamCompetencySummaryService(projectId, competencyItem.id);
        setTeamCompetencySummary(summaryList?.[0]);
        setIsSummaryLoading(false);
      } catch (error: unknown) {
        showToastMessage(
          ToastType.ERROR,
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while fetching team competency summary',
        );
      }
    };
    fetchSummary();
  }, [projectId, competencyItem.id]);

  const matrixInsights = detailedPerformanceInsights
    ? {
        matrixConfig: detailedPerformanceInsights.chartConfig,
        matrixData: detailedPerformanceInsights.chartData,
      }
    : null;

  return (
    <SimpleElevatedCard className="bg-white">
      <div className="flex flex-row items-end gap-x-2 px-5 py-4 border-b-1 border-grey-border">
        <div className="text-grey-700 text-lg font-medium leading-[26px]">{competencyItem.name}</div>
        {isGridLoading ? (
          <BoxSkeleton className="h-6 w-8" />
        ) : (
          detailedPerformanceInsights && (
            <>
              <div className="flex flex-row items-center gap-x-0.5">
                <span className="text-grey-900 text-lg font-semibold leading-[26px]">
                  {detailedPerformanceInsights.score.average}
                </span>
                <span className="text-grey-400 text-sm font-normal leading-5.5 mt-0.5 ">
                  /{detailedPerformanceInsights.score.max}
                </span>
              </div>
              <div className="text-grey-500 text-xs font-normal leading-5">(Avg)</div>
            </>
          )
        )}
      </div>

      <div className="p-5 flex flex-col gap-y-5">
        {(isSummaryLoading || !isEmpty(teamCompetencySummary)) && (
          <AIGeneratedSummary
            className="shadow-none border-1 border-grey-50"
            title={`Team ${teamCompetencySummary?.competencyName} Summary`}
            isLoading={isSummaryLoading}
          >
            <ExpandableText className="text-dark-200 font-montserrat text-sm leading-5.5" charLimit={500}>
              {teamCompetencySummary?.summary}
            </ExpandableText>
          </AIGeneratedSummary>
        )}
        <CompetencyMatrix matrixData={matrixInsights} isLoading={isGridLoading} />
      </div>
    </SimpleElevatedCard>
  );
}

interface PerformanceInsightsCardProps {
  competencyItem: {
    id: string;
    name: string;
    abbreviation: string;
  };
}
