import { ChartConfig } from '@/flexternships/app/components/ui/chart';

export interface IChartLayoutProps {
  title: string;
  selectOptions: { label: string; value: string }[];
  defaultSelectedValue?: string;
  handleSelect: (value: string) => void;
  children: React.ReactNode;
  isDownloadIconVisible?: boolean;
  isDonutChart?: boolean;
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
}

export interface IDonutChartProps {
  chartConfig: ChartConfig;
  tabs?: IChartTabsType[];
  chartData: any[];
  statsData: IStatsProps[];
  selectOptions: { label: string; value: string }[];
  totalData: number;
  chartTitle: string;
  isTabVisible?: boolean;
  isDonutChart: boolean;
  isDownloadIconVisible: boolean;
  showPercentageInTab?: boolean;
  totalDataDescription: string;
  handleSelect: (value: string | number) => void;
  handleTabChange?: (value: string) => void;
}
export interface ILineChartProps {
  chartConfig: ChartConfig;
  tabs?: IChartTabsType[];
  chartData: any[];
  selectOptions: { label: string; value: string }[];
  chartTitle: string;
  isTabVisible?: boolean;
  isDonutChart?: boolean;
  showPercentageInTab?: boolean;
  handleSelect: (value: string | number) => void;
  handleTabChange?: (value: string) => void;
}
export interface IBarChartProps {
  chartConfig: ChartConfig;
  chartData: any[];
  selectOptions: { label: string; value: string }[];
  chartTitle: string;
  layout: 'vertical' | 'horizontal';
  handleSelect: (value: string | number) => void;
}
