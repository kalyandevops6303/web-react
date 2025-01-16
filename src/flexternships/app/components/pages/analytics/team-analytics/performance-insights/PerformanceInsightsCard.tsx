import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import CompetencyMatrix from './CompetencyMatrix';
import { useEffect, useState } from 'react';
import BoxSkeleton from '@/flexternships/app/components/core/skeletons/BoxSkeleton';
import { getDetailedPerformanceInsightsService } from '@/flexternships/services/analytics-service';
import { useParams } from 'react-router-dom';
import { DetailedPerformanceInsights } from '@/flexternships/constraints/types/analytics-types';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';

export default function PerformanceInsightsCard({ competencyItem }: PerformanceInsightsCardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [detailedPerformanceInsights, setDetailedPerformanceInsights] = useState<
    DetailedPerformanceInsights | undefined
  >(undefined);

  const { projectId } = useParams();

  useEffect(() => {
    if (!projectId) throw new Error('Project ID is required');
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getDetailedPerformanceInsightsService(projectId, competencyItem.abbreviation);
        setDetailedPerformanceInsights(data);
        setIsLoading(false);
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
  }, []);

  if (!isLoading && !detailedPerformanceInsights) return <div>No data found</div>;

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
        {isLoading ? (
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
        {/* TODO: Add AI Summary Card and implement grid layout */}
        <CompetencyMatrix matrixData={matrixInsights} isLoading={isLoading} />
      </div>
    </SimpleElevatedCard>
  );
}

interface PerformanceInsightsCardProps {
  competencyItem: {
    name: string;
    abbreviation: string;
  };
}
