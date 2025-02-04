import React, { useState } from 'react';
import SimpleElevatedCard from '@flexternships/app/components/core/cards/SimpleElevatedCard';
interface StatboxProps {
  title: string | React.ReactNode;
  desc?: string;
  isSelected?: boolean;
}

const styles = {
  active: 'border-trublue-secondary-500 border-1 bg-trublue-light',
  inactive: 'border-grey-200 border-1',
};

const Statbox: React.FC<StatboxProps> = ({ title, desc, isSelected }) => {
  const [isActive, setIsActive] = useState(isSelected ?? false);
  const handleClick = () => {
    setIsActive(true);
  };
  return (
    <div onClick={handleClick}>
      <SimpleElevatedCard
        className={`flex flex-col items-start flex-shrink-0 px-5 py-4 gap-3 ${
          isActive && styles.active
        } rounded-[10px]`}
      >
        <div className="flex flex-col gap-y-3">
          <h3 className="text-[26px] font-semibold leading-8 text-dark">{title}</h3>
          <div className="text-sm font-medium text-grey-700">{desc}</div>
        </div>
      </SimpleElevatedCard>
    </div>
  );
};

export default Statbox;
