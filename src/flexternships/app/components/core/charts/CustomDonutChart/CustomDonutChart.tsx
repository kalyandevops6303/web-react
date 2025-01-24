'use client';

import { Pie, PieChart, Label, LabelList, Cell } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@flexternships/components/ui/card';
import { ChartContainer, ChartTooltip } from '@flexternships/components/ui/chart';
import Stats from '@flexternships/components/core/charts/Stats';
import { CustomDonutChart2Props } from '@/flexternships/constraints/types/chart-types';
import { StatsOrientation } from '@/flexternships/constraints/enums/chart-enums';
import CustomPieChartTooltip from '@/flexternships/app/components/core/charts/CustomPieChart2/CustomPieChartTooltip';
import { isEmpty } from 'lodash';
import BoxSkeleton from '../../skeletons/BoxSkeleton';

const CenterLabel = ({
  viewBox,
  centerText,
  totalCount,
  isSemiCircle,
}: {
  viewBox: { cx: number; cy: number };
  centerText: string;
  totalCount: number;
  isSemiCircle?: boolean;
}) => {
  const { cx, cy } = viewBox;
  const yOffset = isSemiCircle ? -20 : 0;

  return (
    <g>
      <text
        x={cx}
        y={cy - 10 + yOffset}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: 'Montserrat',
          fontSize: '26px',
          fontWeight: 'bold',
          lineHeight: 'normal',
          fill: '#2E2E30',
        }}
      >
        {totalCount}
      </text>
      <text
        x={cx}
        y={cy + 15 + yOffset}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontFamily: 'Montserrat',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '166.667%',
          textAlign: 'center',
          fill: '#787878',
        }}
      >
        {centerText}
      </text>
    </g>
  );
};

export default function CustomDonutChart2(props: Readonly<CustomDonutChart2Props>) {
  const {
    chartData,
    chartConfig,
    totalCount,
    title,
    centerText,
    isSemiCircle,
    statsOrientation,
    className,
    isDonutChart,
    isLoading,
  } = props;

  const statsData = chartData?.map((item) => ({
    label: item.label,
    value: item.count,
    percentage: `${((item.count / totalCount) * 100).toFixed(2)}%`,
    color: chartConfig[item.name as keyof typeof chartConfig].color,
  }));

  if (isEmpty(chartData)) return null;

  if (isLoading) {
    return <BoxSkeleton className="w-full h-[200px]" />;
  }

  return (
    <Card className={`${className} flex flex-col border-none p-0 w-full h-full outline-none max-h-[320px]"`}>
      <CardHeader className="border-b border-gray-200 px-[20px] py-[16px]">
        <CardTitle className="text-[#394042] font-montserrat text-base font-medium leading-6">{title}</CardTitle>
      </CardHeader>
      <CardContent className={`py-5 h-full px-0 flex flex-col justify-between`}>
        <ChartContainer
          config={chartConfig}
          className={`mx-auto w-full ${isSemiCircle ? 'aspect-video mb-0 pb-0 h-[140px]' : 'h-[220px]'}`}
        >
          <PieChart
            className={`${isSemiCircle ? 'min-h-[140px]' : 'min-h-[200px]'}`}
            margin={{ top: isSemiCircle ? 50 : 0, right: 0, bottom: 0, left: 0 }}
          >
            <ChartTooltip
              cursor={false}
              content={({ payload }) => <CustomPieChartTooltip payload={payload} totalCount={totalCount} />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              innerRadius={isDonutChart ? 80 : 0}
              outerRadius={isDonutChart ? 100 : 100}
              paddingAngle={isDonutChart ? 2 : 0}
              cornerRadius={isDonutChart ? 20 : 0}
              stroke="transparent"
              startAngle={isSemiCircle ? 180 : 0}
              endAngle={isSemiCircle ? 0 : 360}
              cy={isSemiCircle ? '60%' : '50%'}
            >
              {isDonutChart && (
                <Label
                  content={
                    <CenterLabel
                      viewBox={{
                        cx: 0,
                        cy: 0,
                      }}
                      centerText={centerText}
                      totalCount={totalCount}
                      isSemiCircle={isSemiCircle}
                    />
                  }
                  position="center"
                />
              )}
              {!isDonutChart && (
                <>
                  <LabelList
                    dataKey="count"
                    style={{
                      fontSize: '14px',
                      fontFamily: 'Montserrat',
                      fontWeight: 'bold',
                    }}
                  />
                  {chartData?.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={chartConfig[entry.name as keyof typeof chartConfig].color}
                      style={{ opacity: 0.22 }}
                      strokeWidth={2}
                    />
                  ))}
                </>
              )}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="max-h-[240px] overflow-y-auto flex flex-col w-full mt-3">
          <Stats
            statsData={statsData}
            orientation={statsOrientation ?? StatsOrientation.HORIZONTAL}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
