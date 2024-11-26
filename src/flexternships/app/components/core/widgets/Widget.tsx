import React from 'react';
import { cn } from '@flexternships/lib/utils';
import capitalize from 'lodash/capitalize';
import Percentage from '../percentage/Percentage';
import DynamicSelect from '../dynamic-select/DynamicSelect';

type IWidgetProps = {
  selectOptions: { label: string; value: string }[];
  label: string;
  value: string | number;
  percentValue?: number;
  isPositive?: boolean;
  defaultSelectedValue?: string;
  onChange: (value: string) => void;
};

const Widget: React.FC<IWidgetProps> = ({
  label,
  value,
  selectOptions,
  percentValue,
  isPositive = true,
  defaultSelectedValue,
  onChange,
}) => (
  <WidgetWrapper>
    <WidgetHeader className="mb-3">
      <WidgetTitle>
        <span className="text-2xl font-semibold">{value}</span>
        {percentValue && <Percentage isPositive={isPositive} value={percentValue} />}
      </WidgetTitle>
    </WidgetHeader>
    <WidgetContent>
      <WidgetTitle>
        <label className="text-gray-500 font-medium text-lg block dark:text-white">{capitalize(label)}</label>
      </WidgetTitle>
      <DynamicSelect onChange={onChange} selectOptions={selectOptions} defaultSelectedValue={defaultSelectedValue} />
    </WidgetContent>
  </WidgetWrapper>
);

export default Widget;

const WidgetWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('bg-white w-72 shadow rounded-lg py-4 px-5 h-32 gap-3', className)} {...props} />
  ),
);
WidgetWrapper.displayName = 'WidgetWrapper';

const WidgetHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-start gap-2', className)} {...props} />
  ),
);
WidgetHeader.displayName = 'WidgetHeader';

const WidgetTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-start gap-2 text-center', className)} {...props} />
  ),
);
WidgetTitle.displayName = 'WidgetTitle';

const WidgetContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col items-start justify-center text-center gap-1', className)} {...props} />
  ),
);
WidgetContent.displayName = 'WidgetContent';
