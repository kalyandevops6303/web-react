'use client';

import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react';

import { Card, CardContent } from '@flexternships/app/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@flexternships/app/components/ui/chart';
import { isEmpty } from 'lodash';

interface MultipleLinesChartProps {
  maxYAxis?: number;
  chartData: Array<{
    [key: string]: string | number | Record<string, string | number>;
  }>;
  chartConfig: ChartConfig;
  showFilters?: boolean;
  hasGradient?: boolean;
  XAxisDataKey: string;
  YAxisDataKey?: string;
  customTooltipContent?: React.ComponentType<any>;
  filterPropertyName?: string;
  showDataOnFilters?: boolean;
  hideDeselectedMetricsFromTooltip?: boolean;
  customXAxisLabel?: React.ComponentType<any>;
}

export default function MultipleLinesChart(props: Readonly<MultipleLinesChartProps>) {
  const {
    maxYAxis,
    chartData,
    chartConfig,
    showFilters,
    hasGradient,
    XAxisDataKey,
    YAxisDataKey,
    customTooltipContent: CustomContent,
    filterPropertyName,
    showDataOnFilters = true,
    hideDeselectedMetricsFromTooltip,
    customXAxisLabel: CustomXAxisLabel,
  } = props;

  const CustomTooltipContent = ({ active, payload, label, selectedMetrics, showAll }: any) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="bg-white w-[300px] max-w-1/2 px-3 py-2 border rounded-md shadow-lg flex flex-col gap-y-1">
        <p className="font-montserrat text-2xs font-semibold leading-4 text-grey-500 uppercase">{label} PERFORMANCE</p>
        {payload.map((entry: any) => {
          if (!entry.dataKey) return null;
          const baseKey = typeof entry.dataKey === 'string' ? entry.dataKey.split('.')[0] : entry.dataKey;
          const isSelected = showAll || selectedMetrics.includes(baseKey as string);

          return (
            <div key={entry.dataKey} className="flex justify-between items-center">
              <span className="font-montserrat text-xs font-normal leading-5 text-dark-700 flex items-center gap-2">
                <div
                  style={{
                    backgroundColor: chartConfig[baseKey]?.color,
                    opacity: !isSelected ? 0.12 : 1,
                  }}
                  className="w-3 h-3 rounded-sm"
                ></div>
                <div>{chartConfig[baseKey]?.label}</div>
              </span>
              <span className="font-montserrat text-xs font-semibold leading-5 text-dark-700">
                {entry.value}/{maxYAxis}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [showAll, setShowAll] = useState<boolean>(true);

  const toggleMetric = (metric: string) => {
    setShowAll(false);

    if (isEmpty(selectedMetrics)) {
      setSelectedMetrics([metric]);
    } else {
      setSelectedMetrics((prev) => (prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]));
    }
  };

  const toggleAll = () => {
    setSelectedMetrics([]);
  };

  const getAverage = (data: any[], metric: string) => {
    if (data.length <= 1) return 0;

    let dataWithoutFirst = data.slice(1);
    if (YAxisDataKey) {
      dataWithoutFirst = dataWithoutFirst.map((item) => {
        return {
          ...item,
          [metric]: item[metric][YAxisDataKey],
        };
      });
    }

    const validData = dataWithoutFirst.filter((curr) => curr[metric] !== undefined && curr[metric] !== null);

    if (validData.length === 0) return 0;

    return (validData.reduce((acc, curr) => acc + (curr[metric] || 0), 0) / validData.length).toFixed(2);
  };

  useEffect(() => {
    if (isEmpty(selectedMetrics)) {
      setShowAll(true);
    }
  }, [selectedMetrics]);

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-5 bg-white rounded-t-lg p-6">
          <div
            onClick={toggleAll}
            className={`flex flex-col justify-center items-start gap-1 p-3 w-[150px] rounded-lg border cursor-pointer ${
              showAll ? 'border-primary bg-primary-light' : 'border-grey-50'
            }`}
          >
            {showFilters && showDataOnFilters && (
              <div>
                <span className="font-montserrat text-lg font-semibold leading-xxl-custom text-dark-900 text-center">
                  {Object.keys(chartConfig).length}{' '}
                </span>
                <span className="font-montserrat text-sm font-normal leading-sm-custom text-grey-500 text-center">
                  {filterPropertyName}
                </span>
              </div>
            )}
            <div className="font-montserrat text-sm font-medium leading-sm-custom text-dark-700">All</div>
          </div>

          {chartConfig &&
            Object.entries(chartConfig).map(([key, { label, color }]) => (
              <>
                {showFilters && showDataOnFilters ? (
                  <div
                    onClick={() => toggleMetric(key)}
                    className={`flex flex-col justify-center items-start gap-1 p-3 flex-1 rounded-lg border cursor-pointer ${
                      selectedMetrics.includes(key) ? 'border-primary bg-primary-light' : 'border-grey-50'
                    }`}
                  >
                    <div>
                      <span className="font-montserrat text-lg font-semibold leading-xxl-custom text-dark-900 text-center">
                        {getAverage(chartData, key)}
                      </span>
                      <span className="font-montserrat text-sm font-normal leading-sm-custom text-grey-500 text-center">
                        /{maxYAxis}
                      </span>
                    </div>
                    <div className="font-montserrat text-sm font-medium leading-sm-custom text-dark-700">{label}</div>
                    <div
                      className="flex w-[52px] max-w-full h-1 rounded-full z-10"
                      style={{ backgroundColor: color }}
                    ></div>
                  </div>
                ) : (
                  <div
                    onClick={() => toggleMetric(key)}
                    className={`flex p-3 items-center gap-3 w-[150px] rounded-lg border cursor-pointer ${
                      selectedMetrics.includes(key) ? 'border-primary bg-primary-light' : 'border-grey-50'
                    }`}
                  >
                    <div className="flex w-1 h-full rounded-full z-10" style={{ backgroundColor: color }}></div>
                    <div className="font-montserrat text-sm font-medium leading-sm-custom text-dark-700 truncate">
                      {label}
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
      )}
      <Card className="flex flex-col max-h-[400px] bg-white border-none shadow-none rounded-t-none">
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[270px] max-h-full w-full mt-10">
            {hasGradient ? (
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: -20,
                  right: 100,
                  bottom: CustomXAxisLabel ? 40 : 0,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="4 12" />
                <XAxis
                  dataKey={XAxisDataKey}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={(props: any) =>
                    CustomXAxisLabel ? (
                      <CustomXAxisLabel props={props} chartData={chartData} XAxisDataKey={XAxisDataKey} />
                    ) : (
                      <foreignObject x={props.x - 50} y={props.y} width={100} height={120}>
                        <div className="flex flex-col items-center text-gray-600">
                          <span className="text-sm">{props.payload.value}</span>
                        </div>
                      </foreignObject>
                    )
                  }
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => (value < 10 ? `0${value}` : `${value}`)}
                  // tickCount={6}
                />
                <ChartTooltip
                  cursor={false}
                  content={({ label, payload, active }) =>
                    CustomContent ? (
                      <CustomContent
                        selectedMetrics={selectedMetrics}
                        showAll={showAll}
                        label={label}
                        payload={payload}
                        active={active}
                        data={chartData}
                      />
                    ) : (
                      <CustomTooltipContent
                        selectedMetrics={selectedMetrics}
                        showAll={showAll}
                        label={label}
                        payload={payload}
                        active={active}
                      />
                    )
                  }
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0185E4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#0185E4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                {Object.entries(chartConfig).map(([key]) => (
                  <Area
                    key={key}
                    dataKey={YAxisDataKey ? `${key}.${YAxisDataKey}` : key}
                    type="natural"
                    fill="url(#gradient)"
                    fillOpacity={0.4}
                    activeDot={{
                      r: 4,
                      className:
                        'stroke-[#FFF] stroke-[1px] drop-shadow-[0px_0px_4px_rgba(0,_0,_0,_0.34)] backdrop-blur-[8px] w-[16px] h-[16px] flex-shrink-0',
                    }}
                    style={{ transition: 'opacity 0.2s ease-in-out' }}
                  />
                ))}
              </AreaChart>
            ) : (
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: -20,
                  right: 100,
                  bottom: CustomXAxisLabel ? 40 : 0,
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="4 12" stroke="#E6E9EC" />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => (value < 10 ? `0${value}` : `${value}`)}
                />
                <XAxis
                  dataKey={XAxisDataKey}
                  tickLine={false}
                  axisLine={false}
                  tick={(props: any) =>
                    CustomXAxisLabel ? (
                      <CustomXAxisLabel props={props} chartData={chartData} XAxisDataKey={XAxisDataKey} />
                    ) : (
                      <foreignObject x={props.x - 50} y={props.y} width={100} height={120}>
                        <div className="flex flex-col items-center text-gray-600">
                          <span className="text-sm">{props.payload.value}</span>
                        </div>
                      </foreignObject>
                    )
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={({ label, payload, active }) =>
                    CustomContent ? (
                      <CustomContent
                        hideDeselectedMetricsFromTooltip={hideDeselectedMetricsFromTooltip}
                        selectedMetrics={selectedMetrics}
                        showAll={showAll}
                        label={label}
                        payload={payload}
                        active={active}
                        data={{
                          chartConfig,
                          maxYAxis,
                          YAxisDataKey,
                          chartData,
                          XAxisDataKey,
                        }}
                      />
                    ) : (
                      <CustomTooltipContent
                        selectedMetrics={selectedMetrics}
                        showAll={showAll}
                        label={label}
                        payload={payload}
                        active={active}
                      />
                    )
                  }
                />
                {showAll
                  ? Object.entries(chartConfig).map(([key, { color }]) => (
                      <Line
                        key={key}
                        dataKey={YAxisDataKey ? `${key}.${YAxisDataKey}` : key}
                        type="monotone"
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                          r: 4,
                          className:
                            'stroke-[#FFF] stroke-[1px] drop-shadow-[0px_0px_4px_rgba(0,_0,_0,_0.34)] backdrop-blur-[8px] w-[16px] h-[16px] flex-shrink-0',
                        }}
                        style={{ transition: 'opacity 0.2s ease-in-out' }}
                      />
                    ))
                  : Object.entries(chartConfig).map(([key, { color }]) => (
                      <Line
                        key={key}
                        dataKey={YAxisDataKey ? `${key}.${YAxisDataKey}` : key}
                        type="monotone"
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                        activeDot={
                          selectedMetrics.includes(key)
                            ? {
                                r: 4,
                                className: 'drop-shadow-md',
                              }
                            : false
                        }
                        opacity={selectedMetrics.includes(key) ? 1 : 0.12}
                        style={{ transition: 'opacity 0.2s ease-in-out' }}
                      />
                    ))}
              </LineChart>
            )}
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
