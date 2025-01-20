import { CustomPieChartProps2 } from '@/flexternships/constraints/types/chart-types';
import { Cell, LabelList, Pie, Sector, SectorProps, PieChart, ResponsiveContainer } from 'recharts';
import { Card, CardTitle, CardContent, CardHeader } from '@flexternships/components/ui/card';
import { ChartContainer, ChartTooltip } from '@flexternships/components/ui/chart';
import Stats from '@flexternships/components/core/charts/Stats';
import { StatsOrientation } from '@/flexternships/constraints/enums/chart-enums';
import { useMemo, useState } from 'react';
import CustomPieChartTooltip from '@/flexternships/app/components/core/charts/CustomPieChart2/CustomPieChartTooltip';
import BoxSkeleton from '../../skeletons/BoxSkeleton';

export default function CustomPieChart2(props: Readonly<CustomPieChartProps2>) {
  const { chartData, chartConfig, totalCount, title, statsOrientation, className, isLoading } = props;

  const statsData = chartData?.map((item) => ({
    label: item.label,
    value: item.count,
    percentage: `${((item.count / totalCount) * 100).toFixed(2)}%`,
    color: chartConfig[item.name as keyof typeof chartConfig].color,
  }));

  const labelStyles = {
    color: '#7367F0',
    fontFamily: 'Montserrat',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '26px',
  };

  const renderActiveShape = useMemo(
    () =>
      ({
        cx = 0,
        cy = 0,
        innerRadius = 0,
        outerRadius = 0,
        startAngle = 0,
        endAngle = 0,
        fill = 'transparent',
      }: SectorProps): JSX.Element =>
        (
          <g>
            <Sector
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
              style={{
                opacity: 0.2,
              }}
            />
            <Sector
              cx={cx}
              cy={cy}
              innerRadius={outerRadius + 2}
              outerRadius={outerRadius + 6}
              startAngle={startAngle}
              endAngle={endAngle}
              cornerRadius={100}
              fill={fill}
              style={{
                opacity: '1.0',
                animation: 'fadeIn 0.15s ease-in-out',
              }}
            />
          </g>
        ),
    [],
  );

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  if (isLoading) {
    return <BoxSkeleton className="w-full h-[200px]" />;
  }

  return (
    <Card className={`${className} border-none p-0 h-full w-full outline-none`}>
      <CardHeader className="border-b border-grey-50 px-5 py-4">
        <CardTitle className="text-dark-700 font-montserrat text-base font-medium leading-6">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-0 h-fit-content md:h-full justify-between flex items-center md:-mt-5 flex-col md:flex-row gap-4">
        <ChartContainer
          config={chartConfig}
          className="flex w-[600px] md:w-1/2 h-full aspect-video z-10 justify-center text-xs [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none [&_.recharts-sector[stroke='#fff']]:stroke-white"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                content={({ payload }) => <CustomPieChartTooltip payload={payload} totalCount={totalCount} />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                labelLine={false}
                activeShape={renderActiveShape}
                activeIndex={activeIndex}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                outerRadius={130}
              >
                <LabelList
                  dataKey="count"
                  className="pointer-events-none"
                  stroke="none"
                  formatter={(value: number) => `${((value / totalCount) * 100).toFixed(2)}%`}
                  style={labelStyles}
                />
                {chartData?.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={chartConfig[entry.name as keyof typeof chartConfig].color}
                    style={{ opacity: 0.2 }}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="h-full max-h-[320px] overflow-y-auto flex flex-col w-full">
          <Stats statsData={statsData} orientation={statsOrientation ?? StatsOrientation.HORIZONTAL} />
        </div>
      </CardContent>
    </Card>
  );
}
