import React, { useMemo } from 'react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import Stats from './Stats';
import ChartLayout from './ChartLayout';
import { IDonutChartProps } from '@/flexternships/constraints/types/chart-types';
import ChartTabs from './ChartTabs';

const CustomDonutChart: React.FC<IDonutChartProps> = ({
  tabs = [],
  totalData = 0,
  chartData = [],
  statsData = [],
  chartConfig = {},
  selectOptions = [],
  isTabVisible = false,
  isDonutChart = false,
  handleSelect = () => {},
  totalDataDescription = '',
  handleTabChange = () => {},
  chartTitle = 'Donut Chart',
  showPercentageInTab = false,
  isDownloadIconVisible = false,
}) => {
  const radialBars = useMemo(() => {
    return Object.keys(chartConfig).map((chartKey) => ({
      dataKey: chartKey,
      color: chartConfig[chartKey].color,
    }));
  }, [chartConfig]);

  return (
    <ChartLayout
      title={chartTitle}
      selectOptions={selectOptions}
      handleSelect={handleSelect}
      isDownloadIconVisible={isDownloadIconVisible}
      isDonutChart={isDonutChart}
    >
      <div className="w-full">
        {isTabVisible && (
          <ChartTabs
            tabs={tabs}
            onTabChange={handleTabChange}
            isDonut={isDonutChart}
            showPercentage={showPercentageInTab}
          />
        )}
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full">
          <RadialBarChart data={chartData} endAngle={360} innerRadius={80} outerRadius={130}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 16} className="fill-foreground text-2xl font-bold">
                          {totalData.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-muted-foreground text-xs">
                          {totalDataDescription}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            {radialBars.map(({ dataKey, color }) => (
              <RadialBar
                key={dataKey}
                dataKey={dataKey}
                fill={color}
                stackId="a"
                cornerRadius={20}
                className="stroke-transparent stroke-2"
              />
            ))}
          </RadialBarChart>
        </ChartContainer>
        <Stats statsData={statsData} />
      </div>
    </ChartLayout>
  );
};

export default CustomDonutChart;
