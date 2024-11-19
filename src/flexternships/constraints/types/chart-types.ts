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
