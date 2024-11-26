import React from 'react';
import trendingUp from '../../../../assets/icons/core/trendingUp.svg';
import trendingDown from '../../../../assets/icons/core/trendingDown.svg';
interface IPercentage {
  value: number;
  isPositive: boolean;
}
const Percentage: React.FC<IPercentage> = ({ value = 0, isPositive = true }) => {
  const img = isPositive ? trendingUp : trendingDown;

  return (
    <div
      className={`flex items-center mt-1.5 justify-center gap-1 text-sm font-medium ${
        isPositive ? 'text-green-500' : 'text-red-500'
      }`}
    >
      <span> {`${Math.abs(value)}%`}</span>
      <img src={img} className="mr-1" />
    </div>
  );
};

export default Percentage;
