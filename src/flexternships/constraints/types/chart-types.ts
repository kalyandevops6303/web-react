import { ChartConfig } from '@/flexternships/app/components/ui/chart';
import { TooltipProps } from 'recharts';
import { Payload, NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { ChartOrientation, StatsOrientation } from '../enums/chart-enums';

export interface IChartLayoutProps {
  title: string;
  selectOptions?: { label: string; value: string }[];
  defaultSelectedValue?: string;
  handleSelect?: (value: string) => void;
  children?: React.ReactNode;
  showDownloadIcon?: boolean;
  isDonutChart?: boolean;
  showInfoIcon?: boolean;
}

export interface IChartTabsType {
  label: string;
  percentage: string;
  showInfoIcon: boolean;
}

export interface IChartTabsProps {
  tabs: IChartTabsType[];
  onTabChange: (value: string) => void;
  isDonut: boolean;
  showPercentage: boolean;
}

export interface IStatsProps {
  color: string;
  label: string;
  value: number;
  percentage: string;
  orientation?: StatsOrientation;
}

export interface IDonutChartProps extends IBaseChartProps {
  tabs?: IChartTabsType[];
  statsData: IStatsProps[];
  totalRadialData: number;
  isDonutChart: boolean;
  showDownloadIcon: boolean;
  radialDataText: string;
}

export interface ILineChartProps extends IBaseChartProps {
  tabs?: IChartTabsType[];
  isDonutChart?: boolean;
}

export interface IBarChartProps extends IBaseChartProps {
  layout: 'vertical' | 'horizontal';
}
export interface IBaseChartProps {
  chartConfig: ChartConfig;
  chartData: any[];
  selectOptions: { label: string; value: string }[];
  chartTitle: string;
  isTabVisible?: boolean;
  showPercentageInTab?: boolean;
  handleSelect: (value: string | number) => void;
  handleTabChange?: (value: string) => void;
}

export interface CustomPieChartProps2 {
  chartData: { label: string; count: number; name: string }[];
  chartConfig: { [key: string]: { color: string } };
  totalCount: number;
  title: string | React.ReactNode;
  centerText: string;
  statsOrientation: StatsOrientation;
  className: string;
  isLoading?: boolean;
}

export interface CustomPieChartProps extends IChartLayoutProps {
  chartData: Array<{
    name: string;
    value: number;
    percentage: string;
    color: string;
  }>;
  chartTitle?: string;
  isDonutChart?: boolean;
  showInfoIcon?: boolean;
}

export type PayloadItem = {
  payload: {
    name: string;
    value: number | string;
    percentage: number | string;
    color: string;
  };
};

export type CustomTooltipProps = {
  active?: boolean;
  payload?: PayloadItem[];
};

export interface ChartLabelProps {
  cx?: number;
  cy?: number;
  midAngle: number;
  innerRadius?: number;
  outerRadius?: number;
  index?: number;
}

export interface TeamMembersChartTooltipProps extends TooltipProps<any, any> {
  selectedMetrics: string[];
  showAll: boolean;
  label: string;
  payload: Payload<ValueType, NameType>[] | undefined;
  active: boolean | undefined;
  data: any;
  hideDeselectedMetricsFromTooltip?: boolean;
}

export interface CustomDonutChart2Props {
  chartData: { label: string; count: number; name: string }[];
  chartConfig: { [key: string]: { color: string } };
  totalCount: number;
  title: string | React.ReactNode;
  centerText: string;
  isSemiCircle?: boolean;
  statsOrientation?: StatsOrientation;
  orientation?: ChartOrientation;
  className?: string;
  isDonutChart?: boolean;
  isLoading?: boolean;
  calculateTotalManually?: boolean;
}

export type MatrixLegendItem = {
  color: string;
  rangeMin: number;
  rangeMax: number;
};

export type MatrixConfig = {
  legend?: MatrixLegendItem[];
};
export type MatrixDataItem = {
  label: string; // shown as a row label
  [key: string]: { score: number | null } | string; // column records with scores
};

export interface ColoredGridMatrixProps {
  matrixConfig: MatrixConfig;
  matrixData: MatrixDataItem[];
}
