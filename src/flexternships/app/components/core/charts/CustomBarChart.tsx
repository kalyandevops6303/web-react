import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import ChartLayout from './ChartLayout';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import { IBarChartProps } from '@/flexternships/constraints/types/chart-types';

const CustomBarChart: React.FC<IBarChartProps> = ({
  chartData,
  chartTitle,
  chartConfig,
  handleSelect,
  selectOptions,
  layout = 'vertical',
}) => {
  const dataKey = Object.keys(chartConfig)[0];
  const categoryKey = Object.keys(chartData[0] || {})?.find((key) => key !== dataKey);
  const fillColor = chartConfig[dataKey]?.color || '#0185e4';
  return (
    <ChartLayout title={chartTitle} selectOptions={selectOptions} handleSelect={handleSelect}>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full mt-8">
        <BarChart accessibilityLayer data={chartData} layout={layout}>
          <CartesianGrid strokeDasharray="5 5" horizontal={false} />
          <XAxis type="number" dataKey={dataKey} tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis
            dataKey={categoryKey}
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey={dataKey} fill={fillColor} radius={4} />
        </BarChart>
      </ChartContainer>
    </ChartLayout>
  );
};

export default CustomBarChart;
