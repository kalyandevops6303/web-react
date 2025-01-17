import { ChevronRight } from 'react-feather';
import SimpleElevatedCard from '../../components/core/cards/SimpleElevatedCard';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { CompetencyLabels } from '@/flexternships/constraints/enums/analytics-enums';
import { Link } from 'react-router-dom';

export default function PerformanceInsightsCard() {
  const params = useParams();

  const performanceInsightsOverview = useAnalyticsStore((state) => state.team.teamPerformanceInsightsOverview);
  const getTeamPerformanceInsightsOverview = useAnalyticsStore((state) => state.getTeamPerformanceInsightsOverview);

  useEffect(() => {
    if (params?.projectId) {
      getTeamPerformanceInsightsOverview(params?.projectId);
    }
  }, [params?.projectId]);

  return (
    <div>
      <SimpleElevatedCard className="bg-white rounded-lg w-full">
        <div className="border-b border-grey-50">
          <div className="px-5 py-4 flex items-center justify-between">
            <h1 className="text-dark-100 font-montserrat text-lg font-medium leading-xxl-custom">
              Team Performance Insights
            </h1>
            <Link to={`/analytics/project/${params?.projectId}/team/performance-insights`}>
              <div className="flex items-center gap-1">
                <p className="text-trublue-secondary-500 text-center font-montserrat text-sm font-semibold leading-normal tracking-wider">
                  View All
                </p>
                <ChevronRight size={16} color="#0185E4" />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap items-center p-5 gap-4">
          {performanceInsightsOverview?.map((item: any) => (
            <div
              key={item.name}
              className="flex items-center gap-4 p-2 border border-grey-50 rounded-lg w-full md:w-auto"
            >
              <div>
                <span className="text-dark-900 text-center font-montserrat text-lg font-semibold leading-xxl-custom">
                  {item.score}
                </span>
                <span className="text-grey-500 text-center font-montserrat text-sm font-normal leading-sm-custom">
                  /{item.total}
                </span>
              </div>
              <div className="text-trublue-secondary-500 font-montserrat text-sm font-medium leading-sm-custom flex items-center gap-1">
                <span>{CompetencyLabels[item.name as keyof typeof CompetencyLabels]}</span>
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </SimpleElevatedCard>
    </div>
  );
}
