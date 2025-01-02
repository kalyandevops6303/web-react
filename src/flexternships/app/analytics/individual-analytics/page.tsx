import { useParams } from 'react-router-dom';
import IndividualOverview from './individual-overview';
import MultipleLinesChart from '../../components/core/charts/MultipleLinesChart';
import { TooltipProps } from 'recharts';
import { ChevronRight, ThumbsUp } from 'react-feather';
import achievementIcon from '@flexternships/assets/svgs/analytics/achieve.svg';
import { useAnalyticsStore } from '@/flexternships/stores/analytics-store';
import { useEffect } from 'react';
import Spinner from '../../components/core/Spinner';

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

  useEffect(() => {
    if (projectId && userId) {
      getIndividualOverview(userId);
      getAiSummary(projectId, userId);
      getRecognitionChartData(projectId, userId);
      getPerformanceChartData(projectId, userId);
    }
  }, [params]);

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
      <IndividualOverview {...individualOverviewDetails} aiGeneratedSummary={aiSummary?.summary} />

      <div className="flex flex-row gap-[12px] w-full bg-white rounded-t-[10px] border-b border-b-[#E6E7E7]">
        <div className="w-1/2 flex flex-col items-center justify-center gap-[2px] border-r border-r-[#E6E7E7] p-[12px_24px]">
          <div>
            <span className="text-center text-[20px] font-semibold leading-[28px] text-[#071013] font-montserrat">
              {individualOverviewDetails?.trumioAttractivenessScore}
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
              {individualOverviewDetails?.kudosCount + individualOverviewDetails?.wowCount}
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

      <div className="flex gap-[12px]">
        <div className="flex w-full md:w-1/2 rounded-[10px] bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] p-4 items-center gap-4 h-full">
          <div className="w-1/3 text-center flex flex-col gap-[8px]">
            <div>
            <span className="text-center text-[22px] font-semibold leading-[26px] text-[#071013] font-montserrat">
              {individualOverviewDetails?.managerFeedback?.score}
            </span>
            <span className="text-center text-[14px] font-normal leading-[22px] text-[#838889] font-montserrat">
              /{individualOverviewDetails?.managerFeedback?.total}
            </span>
          </div>
          <div className="text-[14px] font-medium leading-[22px] text-[#838889] font-montserrat">Manager Feedback</div>
        </div>

        <div className="flex h-[24px] w-[1px] bg-[#E6E7E7]"></div>

        <div className="w-1/3 text-center flex flex-col gap-[8px]">
          <div>
            <span className="text-center text-[22px] font-semibold leading-[26px] text-[#071013] font-montserrat">
              {individualOverviewDetails?.peerFeedback?.score}
            </span>
            <span className="text-center text-[14px] font-normal leading-[22px] text-[#838889] font-montserrat">
              /{individualOverviewDetails?.peerFeedback?.total}
            </span>
          </div>
          <div className="text-[14px] font-medium leading-[22px] text-[#838889] font-montserrat">Peer 360 Feedback</div>
        </div>

        <div className="flex h-[24px] w-[1px] bg-[#E6E7E7]"></div>

        <div className="w-1/3 text-center flex flex-col gap-[8px]">
          <div>
            <span className="text-center text-[22px] font-semibold leading-[26px] text-[#071013] font-montserrat">
              {individualOverviewDetails?.overallComments}
            </span>
          </div>
          <div className="flex items-center justify-center gap-[4px] text-center text-[14px] font-medium leading-[22px] text-[#0185E4] font-montserrat">
            <span>Overall Comments</span>
            <ChevronRight size={18} color="#0185E4" />
          </div>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 rounded-[10px] bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] p-4 items-center gap-4 h-full">
        <div className="w-1/3 text-center flex flex-col gap-[8px]">
          <div>
            <span className="text-center text-[22px] font-semibold leading-[26px] text-[#071013] font-montserrat">
              {individualOverviewDetails?.managerFeedback?.score}
            </span>
            <span className="text-center text-[14px] font-normal leading-[22px] text-[#838889] font-montserrat">
              /{individualOverviewDetails?.managerFeedback?.total}
            </span>
          </div>
          <div className="text-[14px] font-medium leading-[22px] text-[#838889] font-montserrat">Manager Feedback</div>
        </div>

        <div className="flex h-[24px] w-[1px] bg-[#E6E7E7]"></div>

        <div className="w-1/3 text-center flex flex-col gap-[8px]">
          <div>
            <span className="text-center text-[22px] font-semibold leading-[26px] text-[#071013] font-montserrat">
              {individualOverviewDetails?.peerFeedback?.score}
            </span>
            <span className="text-center text-[14px] font-normal leading-[22px] text-[#838889] font-montserrat">
              /{individualOverviewDetails?.peerFeedback?.total}
            </span>
          </div>
          <div className="text-[14px] font-medium leading-[22px] text-[#838889] font-montserrat">Peer 360 Feedback</div>
        </div>

        <div className="flex h-[24px] w-[1px] bg-[#E6E7E7]"></div>

        <div className="w-1/3 text-center flex flex-col gap-[8px]">
          <div>
            <span className="text-center text-[22px] font-semibold leading-[26px] text-[#071013] font-montserrat">
              {individualOverviewDetails?.overallComments}
            </span>
          </div>
          <div className="flex items-center justify-center gap-[4px] text-center text-[14px] font-medium leading-[22px] text-[#0185E4] font-montserrat">
            <span>Overall Comments</span>
            <ChevronRight size={18} color="#0185E4" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
