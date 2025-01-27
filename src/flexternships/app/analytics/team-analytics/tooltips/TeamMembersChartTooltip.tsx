import { TeamMembersChartTooltipProps } from '@/flexternships/constraints/types/chart-types';
import achievementIcon from '@flexternships/assets/svgs/analytics/achieve.svg';
import { ThumbsUp } from 'lucide-react';

export default function TeamMembersChartTooltip(props: Readonly<TeamMembersChartTooltipProps>) {
  const { active, payload, label, selectedMetrics, showAll, data, hideDeselectedMetricsFromTooltip } = props;

  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white min-w-[200px] max-w-1/2 p-[8px_12px] border rounded-[6px] shadow-lg flex flex-col gap-1">
      <p className="font-medium font-montserrat text-[10px] font-semibold leading-[16px] text-[#838889] uppercase">
        ATTRACTIVENESS SCORE
      </p>
      <p className="font-medium font-montserrat text-[10px] font-semibold leading-[16px] text-[#838889] uppercase">
        {label}
      </p>
      {payload?.map((entry) => {
        if (!entry.dataKey) return null;
        const baseKey = entry.dataKey.toString().split('.')[0] as keyof typeof data.chartConfig;
        const isSelected = showAll || selectedMetrics.includes(baseKey as string);

        if (hideDeselectedMetricsFromTooltip && !isSelected) return null;
        const payloadData =
          entry.payload[typeof entry.dataKey === 'string' ? entry.dataKey.split('.')[0] : entry.dataKey];

        return (
          <div key={entry.dataKey} className="flex justify-between items-center gap-2">
            <div className="font-montserrat text-[12px] font-normal leading-[20px] text-[#394042] flex items-center gap-2 w-[100px]">
              <div
                style={{
                  backgroundColor: data?.chartConfig[baseKey]?.color,
                  opacity: !isSelected ? 0.12 : 1,
                }}
                className="flex w-[12px] h-[12px] rounded-[2px]"
              ></div>
              <div>{data?.chartConfig[baseKey]?.label}</div>
            </div>
            <div className="flex items-center gap-3 font-montserrat text-[12px] font-semibold leading-[20px] text-[#394042]">
              <div className="w-[70px]">
                {payloadData[data.YAxisDataKey]}/{data.maxYAxis}
              </div>
              <div className="flex items-center gap-1 w-[30px]">
                <img src={achievementIcon} alt="achievement" className="w-[16px] h-[16px]" />
                <div>
                  {payloadData.wows} <span className="font-normal"></span>
                </div>
              </div>
              <div className="flex items-center gap-1 w-[30px]">
                <div>
                  <ThumbsUp size={12} color="#7367F0" />
                </div>
                <div>
                  {payloadData.kudos} <span className="font-normal"></span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
