import { Button } from '@/components/ui/button';

interface TncTabButtonsProps<T> {
  data?: T[];
  selectedValue?: string;
  onSelect?: (value: string) => void;
  labelKey?: keyof T;
  valueKey?: keyof T;
  iconKey?: keyof T;
  iconSrc?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

const TncTabButtons = <T extends Record<string, any>>({
  data = [],
  selectedValue,
  onSelect = () => {},
  labelKey = 'title',
  valueKey = 'value',
  iconKey,
  iconSrc,
  activeClassName = 'bg-trublue text-white',
  inactiveClassName = 'bg-white text-gray-500 hover:text-trublue hover:bg-[#E3F2FD]',
}: TncTabButtonsProps<T>) => {
  return (
    <div className="bg-white flex flex-row items-center gap-3 p-3 justify-center border border-trublue rounded-lg">
      {data.map((item, index) => {
        const value = item[valueKey] as string;
        const label = item[labelKey] as string;
        const showIcon = iconKey ? !!item[iconKey] : false;
        const isActive = selectedValue === value;

        return (
          <Button
            key={index}
            onClick={() => onSelect(value)}
            className={`flex flex-row font-semibold items-center gap-2 rounded-lg px-4 py-2 ${
              isActive ? activeClassName : inactiveClassName
            }`}
          >
            {iconSrc && showIcon && <img src={iconSrc} alt="icon" className="w-4 h-4" />}
            {label}
          </Button>
        );
      })}
    </div>
  );
};

export default TncTabButtons;
