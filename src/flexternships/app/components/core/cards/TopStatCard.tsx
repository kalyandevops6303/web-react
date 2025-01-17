import React from 'react';
import classNames from 'classnames';

export default function TopStatCard(props: TopStatCardProps) {
  const { title, value, icon, selected = false, onClick, disabled = false } = props;

  const handleClick = () => {
    if (disabled || !onClick) return;
    onClick();
  };

  return (
    <div
      className={classNames(
        'flex flex-row justify-between p-5 rounded-md border-1 border-transparent gap-x-4 shadow-card',
        {
          'border-trublue-secondary-500 bg-trublue-light': selected,
          'bg-white': !selected,
          'cursor-pointer': onClick && !selected && !disabled,
          'opacity-70 cursor-not-allowed': disabled,
        },
      )}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-y-1">
        <div className="text-lg font-semibold text-grey-heading leading-[26px]">{title}</div>
        <div className="text-sm font-normal leading-5 text-grey">{value}</div>
      </div>
      <div className="flex flex-row items-center">
        <div>{icon}</div>
      </div>
    </div>
  );
}

type TopStatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};
