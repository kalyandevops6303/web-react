import React, { useEffect, useState } from 'react';
import { cn } from '@flexternships/lib/utils';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import capitalize from 'lodash/capitalize';
import Percentage from '../percentage/Percentage';
import { Select, SelectContent, SelectItem, SelectValue } from '../../ui/select';

type ISelectOptions = {
  label: string;
  value: string;
};

type IWidgetProps = {
  selectOptions: ISelectOptions[];
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
  selectOptions = [],
  percentValue,
  isPositive = true,
  defaultSelectedValue,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultSelectedValue);

  useEffect(() => {
    if (selectOptions?.length > 0 && !selectedValue) {
      const initialValue = defaultSelectedValue || selectOptions[0]?.value;

      if (selectedValue !== initialValue) {
        setSelectedValue(initialValue);
        onChange(initialValue);
      }
    }
  }, [defaultSelectedValue, selectOptions, onChange]);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
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
        <Select value={selectedValue} onValueChange={handleValueChange}>
          <SelectTrigger className="text-xs font-medium text-gray-400 w-32">
            <SelectValue>
              {selectOptions?.find((option) => option.value === selectedValue)?.label ?? 'Select'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white">
            {selectOptions?.length > 0 ? (
              selectOptions?.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="" disabled>
                No selectOptions available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </WidgetContent>
    </WidgetWrapper>
  );
};

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

// custom select trigger for widget
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'h-5 flex items-center justify-start gap-1 whitespace-nowrap rounded-md bg-transparent placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-5 w-5" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
