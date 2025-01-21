import { StatsOrientation } from '@/flexternships/constraints/enums/chart-enums';
import { IStatsProps } from '@/flexternships/constraints/types/chart-types';
import { cn } from '@/flexternships/lib/utils';

const Stats: React.FC<{
  statsData: IStatsProps[];
  orientation: StatsOrientation;
  className?: string;
  showZeroValues?: boolean;
}> = ({ statsData, orientation, className, showZeroValues = false }) => {
  const filteredStatsData = showZeroValues ? statsData : statsData.filter((stat) => stat.value !== 0);

  return (
    <div className="h-full">
      {orientation === StatsOrientation.HORIZONTAL ? (
        <div className={`${className}flex items-center gap-2 justify-center w-full h-full`}>
          <div className="flex flex-wrap items-center gap-x-5 w-full h-full px-4">
            {filteredStatsData.map(({ color, label, value, percentage }: IStatsProps, index) => (
              <div key={index} className={cn('flex items-center gap-2 pb-0')}>
                <div className={cn(`h-12 min-w-1 rounded-lg`)} style={{ backgroundColor: color }}></div>
                <div className="flex flex-col">
                  <span className="text-xs text-start font-medium text-gray-700">{label}</span>
                  <div className="flex items-center gap-2 text-base font-semibold text-gray-900">
                    <span>{value}</span>
                    <div className="border-r border-gray-300 rounded-lg h-5" />
                    <span>{percentage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`${className} flex items-center gap-5 justify-center w-full h-full`}>
          <div className="grid grid-cols-1 gap-2 p-4 pb-0 w-full">
            {filteredStatsData.map(({ color, label, value, percentage }: IStatsProps, index) => (
              <>
                <div key={index} className={cn('flex items-center gap-2')}>
                  <div className={cn(`h-full w-1 rounded-lg`)} style={{ backgroundColor: color }} />
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span className="text-xs text-start font-medium text-gray-700 truncate text-wrap max-w-[150px]">
                      {label}
                    </span>
                    <div className="flex items-center gap-2 text-base font-semibold text-gray-900">
                      <span>{value}</span>
                      <div className="border-r border-gray-300 rounded-lg h-5" />
                      <span>{percentage}</span>
                    </div>
                  </div>
                </div>
                {index !== statsData.length - 1 && <div className="border-b border-gray-200 w-full" />}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
