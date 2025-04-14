import { Button } from '@/components/ui/button';
import classNames from 'classnames';

interface TabNavigationProps<T> {
  data: T[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  getLabel: (item: T) => string;
  getValue: (item: T) => string;
  showIcon?: (item: T) => boolean;
  iconSrc?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

const TabNavigation = <T extends unknown>({
  data = [],
  selectedValue,
  onSelect,
  getLabel,
  getValue,
  showIcon = () => false,
  iconSrc,
  activeClassName = 'bg-trublue text-white',
  inactiveClassName = 'bg-white text-gray-500 hover:text-trublue hover:bg-[#E3F2FD]',
}: TabNavigationProps<T>) => {
  return (
    <div className="bg-white flex flex-row items-center gap-3 p-3 justify-center border border-trublue rounded-lg">
      {data.map((item, index) => {
        const value = getValue(item);
        const label = getLabel(item);
        const isActive = selectedValue === value;

        return (
          <Button
            key={index}
            onClick={() => onSelect(value)}
            className={classNames('flex flex-row font-semibold items-center gap-2 rounded-lg px-4 py-2', {
              [activeClassName]: isActive,
              [inactiveClassName]: !isActive,
            })}
          >
            {iconSrc && showIcon(item) && <img src={iconSrc} alt="icon" className="w-4 h-4" />}
            {label}
          </Button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
