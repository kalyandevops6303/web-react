import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@flexternships/app/components/ui/select';
import IndividualOverview from './individual-overview';
import MultipleLinesChart from '../../components/core/charts/MultipleLinesChart';
import { ChartConfig } from '../../components/ui/chart';
import { TooltipProps } from 'recharts';
import { ChevronRight, ThumbsUp } from 'react-feather';
import achievementIcon from '@flexternships/assets/svgs/analytics/achieve.svg';

export default function IndividualAnalytics() {
  const projects = [
    {
      id: 1,
      name: 'Project 1',
    },
    {
      id: 2,
      name: 'Project 2',
    },
  ];

  const individualOverviewDetails = {
    userId: '123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'Software Engineer',
    imageUri: 'https://github.com/shadcn.png',
    education: {
      name: 'Bachelor of Technology',
      startYear: '2020',
      endYear: '2024',
      institution: 'IIT Bombay',
    },
    flexternshipStartDate: 1734688019281,
    flexternshipEndDate: 1742464019281,
    wowCount: 10,
    kudosCount: 20,
    trumioAttractivenessScore: 82,
    hardSkillsPre: 8,
    hardSkillsPost: 10,
    managerFeedback: {
      score: 8,
      total: 10,
    },
    peerFeedback: {
      score: 5,
      total: 10,
    },
    overallComments: 42,
  };

  const recognitionChartData = {
    chartData: [
      {
        milestone: '',
        trumioAttractivenessScore: 0,
        wowCount: 0,
        kudosCount: 0,
      },
      {
        milestone: 'Milestone 1',
        trumioAttractivenessScore: 40,
        wowCount: 4,
        kudosCount: 8,
      },
      {
        milestone: 'Milestone 2',
        trumioAttractivenessScore: 60,
        wowCount: 3,
        kudosCount: 7,
      },
      {
        milestone: 'Milestone 3',
        trumioAttractivenessScore: 88,
        wowCount: 7,
        kudosCount: 5,
      },
      {
        milestone: 'Milestone 4',
        trumioAttractivenessScore: 90,
        wowCount: 2,
        kudosCount: 8,
      },
      {
        milestone: 'Milestone 5',
        trumioAttractivenessScore: 92,
        wowCount: 1,
        kudosCount: 4,
      },
    ],
    chartConfig: {
      trumioAttractivenessScore: {
        label: 'Attractiveness',
        color: '#0185E4',
      },
    },
    maxYAxis: 100,
  };

  const performanceChartData = {
    chartData: [
      {
        milestone: '',
        collaboration: 0,
        communication: 0,
        leadership: 0,
        effectiveness: 0,
        problemSolving: 0,
        innovation: 0,
      },
      {
        milestone: 'Milestone 1',
        collaboration: 7,
        communication: 3,
        leadership: 4,
        effectiveness: 6,
        problemSolving: 5,
        innovation: 2,
      },
      {
        milestone: 'Milestone 2',
        collaboration: 4,
        communication: 8,
        leadership: 5,
        effectiveness: 3,
        problemSolving: 7,
        innovation: 6,
      },
      {
        milestone: 'Milestone 3',
        collaboration: 9,
        communication: 5,
        leadership: 7,
        effectiveness: 8,
        problemSolving: 4,
        innovation: 3,
      },
      {
        milestone: 'Milestone 4',
        collaboration: 3,
        communication: 7,
        leadership: 8,
        effectiveness: 5,
        problemSolving: 9,
        innovation: 4,
      },
      {
        milestone: 'Milestone 5',
        collaboration: 8,
        communication: 6,
        leadership: 3,
        effectiveness: 7,
        problemSolving: 5,
        innovation: 8,
      },
    ],
    chartConfig: {
      collaboration: {
        label: 'Collaboration',
        color: '#0185E4',
      },
      communication: {
        label: 'Communication',
        color: '#EA5455',
      },
      leadership: {
        label: 'Leadership',
        color: '#FBC02D',
      },
      effectiveness: {
        label: 'Effectiveness',
        color: '#28C76F',
      },
      problemSolving: {
        label: 'Problem Solving',
        color: '#7167F0',
      },
      innovation: {
        label: 'Innovation',
        color: '#00CFE8',
      },
    } satisfies ChartConfig,
  };

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
            <div key={dataKey}>
              <div className="flex justify-between items-center">
                <span className="font-montserrat text-[12px] font-normal leading-[20px] text-[#394042] flex items-center gap-2">
                  <div
                    className={`flex w-[12px] h-[12px] rounded-[2px] bg-[${recognitionChartData?.chartConfig[dataKey].color}]`}
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

  return (
    <div className="flex flex-col gap-[24px] px-[16px] md:px-0">
      <div className="flex gap-[12px] items-center w-full">
        <div className="text-[#394042] font-montserrat text-[16px] font-medium leading-[24px]">
          Select project to view analytics:
        </div>
        <Select defaultValue={projects[0].id.toString()}>
          <SelectTrigger className="h-[42px] min-h-[38px] px-[12px] py-[7px] w-[480px] focus:ring-0 bg-white rounded-[6px] border border-[#E6E7E7]">
            <SelectValue
              placeholder="Select Project"
              className="text-[#394042] font-montserrat text-[16px] font-medium leading-[24px]"
            />
          </SelectTrigger>
          <SelectContent className="bg-white w-[480px]">
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id.toString()}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <IndividualOverview {...individualOverviewDetails} />

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
        maxYAxis={10}
        showFilters={true}
        XAxisDataKey="milestone"
      />

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
  );
}
