import React, { useState } from 'react';

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
    <div
      onClick={handleClick}
      className={`flex flex-col items-start flex-shrink-0 px-5 py-4 gap-3 ${
        isActive && 'border-[#0578FB] border-1 bg-[#E9F3FF]'
      } shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] rounded-[10px]`}
    >
      <div className="my-auto">
        <h3 className="text-[26px] font-semibold">{title}</h3>
        <p className="mb-0 stat-desc">{desc}</p>
      </div>
    </div>
  );
};

export default Statbox;
