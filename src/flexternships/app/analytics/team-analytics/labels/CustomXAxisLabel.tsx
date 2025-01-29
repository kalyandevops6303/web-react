import { ThumbsUp } from 'react-feather';
import achievementIcon from '@flexternships/assets/svgs/analytics/achieve.svg';

interface CustomXAxisLabelProps {
  props: {
    x: number;
    y: number;
    payload: any;
  };
  chartData: any;
  XAxisDataKey: string;
}

export default function CustomXAxisLabel({ props, chartData, XAxisDataKey }: CustomXAxisLabelProps) {
  const { x, y, payload } = props;
  const dataPoint = chartData.find((item: { [x: string]: any }) => item[XAxisDataKey] === payload.value);
  const index = chartData.findIndex((item: { [x: string]: any }) => item[XAxisDataKey] === payload.value);

  // Skip calculations for first index
  if (index === 0) {
    return (
      <foreignObject x={x - 50} y={y} width={100} height={120}>
        <div className="flex flex-col items-center text-gray-600">
          <span className="text-sm">{payload.value}</span>
        </div>
      </foreignObject>
    );
  }

  const totalWows = dataPoint
    ? Object.entries(dataPoint).reduce((sum, [_, value]) => {
        if (typeof value === 'object' && value !== null && 'wows' in value) {
          return sum + (typeof value.wows === 'number' ? value.wows : 0);
        }
        return sum;
      }, 0)
    : 0;

  const totalKudos = dataPoint
    ? Object.entries(dataPoint).reduce((sum, [_, value]) => {
        if (typeof value === 'object' && value !== null && 'kudos' in value) {
          return sum + (typeof value.kudos === 'number' ? value.kudos : 0);
        }
        return sum;
      }, 0)
    : 0;

  return (
    <foreignObject x={x - 50} y={y} width={120} height={120}>
      <div className="flex flex-col gap-2 items-center text-gray-600">
        <span className="text-sm">{payload.value}</span>
        {dataPoint && (
          <div className="flex gap-2">
            {totalKudos > 0 && (
              <div className="flex items-center gap-1 bg-[#7367F01F] rounded-full py-1 px-2">
                <ThumbsUp size={16} color="#7367F0" />
                <div className="font-montserrat text-[14px] font-semibold leading-[22px] text-[#7367F0]">
                  +{totalKudos}
                </div>
              </div>
            )}
            {totalWows > 0 && (
              <div className="flex items-center gap-1 bg-[#1CADE31F] rounded-full py-1 px-2">
                <img src={achievementIcon} alt="wows" width={16} height={16} />
                <div className="font-montserrat text-[14px] font-semibold leading-[22px] text-[#1CADE3]">
                  +{totalWows}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </foreignObject>
  );
}
