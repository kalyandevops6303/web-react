import { Minus, Plus, Check } from 'react-feather';

export default function SelectOptionCard(props: SelectOptionCardProps) {
  const { text, selected, multiselect = false, onClick } = props;
  return (
    <div
      className={`flex flex-row items-center gap-x-1.5 text-sm font-medium leading-5.5 border-1 border-transparent rounded-[18px] px-3 py-1 cursor-pointer ${
        selected ? 'bg-trublue-secondary-500 text-white' : 'text-grey-800 border-trublue-secondary-500 bg-white'
      }`}
      onClick={onClick}
    >
      {text}
      {/* Multiselect */}
      {multiselect && selected && <Minus size={16} />} {/* Show minus icon if selected */}
      {multiselect && !selected && <Plus size={16} />} {/* Show plus icon if not selected */}
      {/* Single select */}
      {!multiselect && selected && <Check size={16} />} {/* Show icon only if selected */}
    </div>
  );
}

type SelectOptionCardProps = {
  text: string;
  value: string;
  selected: boolean;
  multiselect?: boolean;
  onClick: () => void;
};
