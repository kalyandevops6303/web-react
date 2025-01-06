import { useParams } from 'react-router-dom';
import IndividualOverview from './individual-overview';
import MultipleLinesChart from '../../components/core/charts/MultipleLinesChart';
import { TooltipProps } from 'recharts';
import { ThumbsUp } from 'react-feather';
import achievementIcon from '@flexternships/assets/svgs/analytics/achieve.svg';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { useEffect, useState } from 'react';
import Spinner from '../../components/core/Spinner';
import Footer from './footer';

export default function IndividualAnalytics() {
  const params = useParams();
  const { projectId, userId } = useParams();

  const recognitionChartData = useAnalyticsStore((state) => state.recognitionChartData);
  const individualOverviewDetails = useAnalyticsStore((state) => state.individualOverview);
  const performanceChartData = useAnalyticsStore((state) => state.performanceChartData);
  const aiSummary = useAnalyticsStore((state) => state.aiSummary);

  const getRecognitionChartData = useAnalyticsStore((state) => state.getRecognitionChartData);
  const getPerformanceChartData = useAnalyticsStore((state) => state.getPerformanceChartData);
  const getAiSummary = useAnalyticsStore((state) => state.getAiSummary);
  const getIndividualOverview = useAnalyticsStore((state) => state.getIndividualOverview);

  const isIndividualOverviewLoading = useAnalyticsStore((state) => state.isIndividualOverviewLoading);
  const isRecognitionChartDataLoading = useAnalyticsStore((state) => state.isRecognitionChartLoading);
  const isPerformanceChartDataLoading = useAnalyticsStore((state) => state.isPerformanceChartLoading);
  const isAiSummaryLoading = useAnalyticsStore((state) => state.isAiSummaryLoading);

  const [feedbackFooterData, setFeedbackFooterData] = useState<any>(null);
  const [formattedIndividualOverviewDetails, setFormattedIndividualOverviewDetails] = useState<any>(null);

  useEffect(() => {
    if (projectId && userId) {
      getIndividualOverview(userId, projectId);
      getAiSummary(projectId, userId);
      getRecognitionChartData(projectId, userId);
      getPerformanceChartData(projectId, userId);
    }
  }, [params]);

  const getManagerFeedbackScore = () => {
    return formattedIndividualOverviewDetails?.scores?.filter(
      (score: any) => score.feedbackTypes === 'MANAGER_TO_PEER',
    )[0]?.avgScore;
  };

  const getPeerFeedbackScore = () => {
    return formattedIndividualOverviewDetails?.scores?.filter((score: any) => score.feedbackTypes === 'PEER_TO_PEER')[0]
      ?.avgScore;
  };

  useEffect(() => {
    if (individualOverviewDetails) {
      setFormattedIndividualOverviewDetails({
        firstName: individualOverviewDetails?.firstName,
        lastName: individualOverviewDetails?.lastName,
        role: individualOverviewDetails?.role?.name,
        imageUri: individualOverviewDetails?.imageUri,
        education: {
          institution: individualOverviewDetails?.educationalInstitute?.institution?.name,
          startYear: individualOverviewDetails?.educationalInstitute?.startYear,
          endYear: individualOverviewDetails?.educationalInstitute?.gradYear,
          name: individualOverviewDetails?.educationalInstitute?.education?.name,
        },
        flexternshipStartDate: individualOverviewDetails?.listingDetails?.startDate,
        flexternshipEndDate: individualOverviewDetails?.listingDetails?.endDate,
        wowCount: individualOverviewDetails?.wowCount,
        kudosCount: individualOverviewDetails?.kudosCount,
        trumioAttractivenessScore: individualOverviewDetails?.attractiveScore,
        totalComments: individualOverviewDetails?.totalComments,
        scores: individualOverviewDetails?.scores,
      });
    }
  }, [individualOverviewDetails]);

  useEffect(() => {
    if (individualOverviewDetails) {
      setFeedbackFooterData([
        {
          title: 'Manager Feedback',
          score: getManagerFeedbackScore(),
          total: '100',
        },
        {
          title: 'Peer 360 Feedback',
          score: getPeerFeedbackScore(),
          total: '10',
        },
        {
          title: 'Overall Comments',
          score: formattedIndividualOverviewDetails?.totalComments,
          href: '/analytics/individual-analytics/overall-comments',
        },
      ]);
    }
  }, [individualOverviewDetails]);

  const CustomTooltipContent = ({ active, payload, label }: TooltipProps<any, any>) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="bg-white w-[200px] max-w-1/2 p-2 px-3 border rounded-md shadow-lg">
        <p className="font-medium font-montserrat text-xs font-semibold leading-4 text-dark-300 uppercase">{label}</p>
        {payload.map((entry) => {
          const dataKey = entry.dataKey as keyof typeof recognitionChartData.chartConfig;
          const wowCount = entry?.payload?.wowCount;
          const kudosCount = entry?.payload?.kudosCount;
          return (
            <div key={dataKey.toString()}>
              <div className="flex justify-between items-center">
                <span className="font-montserrat text-sm font-normal text-dark-100 flex items-center gap-2">
                  <div
                    className="flex w-3 h-3 rounded-sm"
                    style={{ backgroundColor: recognitionChartData?.chartConfig[dataKey].color }}
                  ></div>
                  <div>{recognitionChartData?.chartConfig[dataKey].label}</div>
                </span>
                <span className="font-montserrat text-sm font-semibold text-dark-100">
                  {entry.value}/{recognitionChartData?.maxYAxis}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-montserrat text-sm font-normal text-dark-100 flex items-center gap-2">
                  <div>
                    <img src={achievementIcon} alt="achievement" width={12} height={12} />
                  </div>
                  <div>Wows</div>
                </span>
                <span className="font-montserrat text-sm font-semibold text-dark-100">{wowCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-montserrat text-sm font-normal text-dark-100 flex items-center gap-2">
                  <div>
                    <ThumbsUp size={12} className="text-purple" />
                  </div>
                  <div>Kudos</div>
                </span>
                <span className="font-montserrat text-sm font-semibold text-dark-100">{kudosCount}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (
    isIndividualOverviewLoading ||
    isRecognitionChartDataLoading ||
    isPerformanceChartDataLoading ||
    isAiSummaryLoading
  ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48">
        <div className="h-8 w-8">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 md:px-0">
      <IndividualOverview {...formattedIndividualOverviewDetails} aiGeneratedSummary={aiSummary} />

      <div className="flex flex-row gap-3 w-full bg-white rounded-t-lg border-b border-border">
        <div className="w-1/2 flex flex-col items-center justify-center gap-0.5 border-r border-border p-3 px-6">
          <div>
            <span className="text-center text-lg font-semibold text-dark font-montserrat">
              {formattedIndividualOverviewDetails?.trumioAttractivenessScore}
            </span>
            <span className="text-center text-base font-normal text-dark-300 font-montserrat">/100</span>
          </div>
          <div className="text-base font-medium text-dark-300 font-montserrat">Attractiveness</div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center gap-0.5 p-3 px-6">
          <div>
            <span className="text-center text-lg font-semibold text-dark font-montserrat">
              {formattedIndividualOverviewDetails?.kudosCount + formattedIndividualOverviewDetails?.wowCount}
            </span>
          </div>
          <div className="text-base font-medium text-dark-300 font-montserrat">WOWs & Kudos</div>
        </div>
      </div>

      <div className="-mt-6">
        <MultipleLinesChart
          chartData={recognitionChartData?.chartData}
          chartConfig={recognitionChartData?.chartConfig}
          maxYAxis={recognitionChartData?.maxYAxis}
          showFilters={false}
          hasGradient={true}
          XAxisDataKey="milestone"
          customTooltipContent={CustomTooltipContent}
        />
      </div>

      <div className="text-xl font-medium text-dark-100 font-montserrat -mb-2.5 mt-6">Performance</div>

      <MultipleLinesChart
        chartData={performanceChartData?.chartData}
        chartConfig={performanceChartData?.chartConfig}
        maxYAxis={performanceChartData?.maxYAxis}
        showFilters={true}
        XAxisDataKey="milestone"
      />

      <div className="flex flex-col md:flex-row gap-[12px]">
        <Footer items={feedbackFooterData} />
      </div>
    </div>
  );
}
