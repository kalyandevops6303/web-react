import React, { useState } from 'react';
import SimpleElevatedCard from '@flexternships/app/components/core/cards/SimpleElevatedCard';
interface StatboxProps {
  title: string | React.ReactNode;
  desc?: string;
}

const Statbox: React.FC<StatboxProps> = ({ title, desc }) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div onClick={handleClick}>
      <SimpleElevatedCard
        className={`flex flex-col items-start flex-shrink-0 px-5 py-4 gap-3 ${
          isActive && 'border-trublue-secondary-500 border-1 bg-trublue-light'
        } rounded-[10px]`}
      >
        <div className="my-auto">
          <h3 className="text-[26px] font-semibold">{title}</h3>
          <p className="mb-0 stat-desc">{desc}</p>
        </div>
      </SimpleElevatedCard>
    </div>
  );
};

export default Statbox;
