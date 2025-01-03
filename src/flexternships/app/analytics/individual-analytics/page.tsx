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
  const thirdPartyAppsData = useAnalyticsStore((state) => state.thirdPartyAppsData);

  const getRecognitionChartData = useAnalyticsStore((state) => state.getRecognitionChartData);
  const getPerformanceChartData = useAnalyticsStore((state) => state.getPerformanceChartData);
  const getAiSummary = useAnalyticsStore((state) => state.getAiSummary);
  const getIndividualOverview = useAnalyticsStore((state) => state.getIndividualOverview);
  const getThirdPartyAppsData = useAnalyticsStore((state) => state.getThirdPartyAppsData);

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
      getThirdPartyAppsData(projectId, userId);
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
    console.log(individualOverviewDetails);
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

    console.log(payload);

    return (
      <div className="bg-white w-[200px] max-w-1/2 p-[8px_12px] border rounded-[6px] shadow-lg">
        <p className="font-medium font-montserrat text-[10px] font-semibold leading-[16px] text-[#838889] uppercase">
          {label}
        </p>
        {payload.map((entry) => {
          const dataKey = entry.dataKey as keyof typeof recognitionChartData.chartConfig;
          const wowCount = entry?.payload?.wowCount;
          const kudosCount = entry?.payload?.kudosCount;
          return (
            <div key={dataKey.toString()}>
              <div className="flex justify-between items-center">
                <span className="font-montserrat text-[12px] font-normal leading-[20px] text-[#394042] flex items-center gap-2">
                  <div
                    className={`flex w-[12px] h-[12px] rounded-[2px]`}
                    style={{ backgroundColor: recognitionChartData?.chartConfig[dataKey].color }}
                  ></div>
                  <div>{recognitionChartData?.chartConfig[dataKey].label}</div>
                </span>
                <span className="font-montserrat text-[12px] font-semibold leading-[20px] text-[#394042]">
                  {entry.value}/{recognitionChartData?.maxYAxis}
                </span>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-[12px] font-normal leading-[20px] text-[#394042] flex items-center gap-2">
                    <div>
                      <img src={achievementIcon} alt="achievement" width={12} height={12} />
                    </div>
                    <div>Wows</div>
                  </span>
                  <span className="font-montserrat text-[12px] font-semibold leading-[20px] text-[#394042]">
                    {wowCount}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-[12px] font-normal leading-[20px] text-[#394042] flex items-center gap-2">
                    <div>
                      <ThumbsUp size={12} color="#7367F0" />
                    </div>
                    <div>Kudos</div>
                  </span>
                  <span className="font-montserrat text-[12px] font-semibold leading-[20px] text-[#394042]">
                    {kudosCount}
                  </span>
                </div>
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
    <div className="flex flex-col gap-[24px] px-[16px] md:px-0">
      <IndividualOverview {...formattedIndividualOverviewDetails} aiGeneratedSummary={aiSummary?.summary} />

      <div className="flex flex-row gap-[12px] w-full bg-white rounded-t-[10px] border-b border-b-[#E6E7E7]">
        <div className="w-1/2 flex flex-col items-center justify-center gap-[2px] border-r border-r-[#E6E7E7] p-[12px_24px]">
          <div>
            <span className="text-center text-[20px] font-semibold leading-[28px] text-[#071013] font-montserrat">
              {formattedIndividualOverviewDetails?.trumioAttractivenessScore}
            </span>
            <span className="text-center text-[14px] font-normal leading-[22px] text-[#838889] font-montserrat">
              /100
            </span>
          </div>
          <div className="text-[14px] font-medium leading-[22px] text-[#838889] font-montserrat">Attractiveness</div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center gap-[2px] p-[12px_24px]">
          <div>
            <span className="text-center text-[20px] font-semibold leading-[28px] text-[#071013] font-montserrat">
              {formattedIndividualOverviewDetails?.kudosCount + formattedIndividualOverviewDetails?.wowCount}
            </span>
          </div>
          <div className="text-[14px] font-medium leading-[22px] text-[#838889] font-montserrat">WOWs & Kudos</div>
        </div>
      </div>
      <div className="-mt-[24px]">
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

      <div className="text-[18px] font-medium leading-[26px] text-[#394042] font-montserrat -mb-[10px] mt-[24px]">
        Performance
      </div>

      <MultipleLinesChart
        chartData={performanceChartData?.chartData}
        chartConfig={performanceChartData?.chartConfig}
        maxYAxis={performanceChartData?.maxYAxis}
        showFilters={true}
        XAxisDataKey="milestone"
      />

      <div className="flex flex-col md:flex-row gap-[12px]">
        <Footer items={feedbackFooterData} />
        <Footer items={thirdPartyAppsData} />
      </div>
    </div>
  );
}
