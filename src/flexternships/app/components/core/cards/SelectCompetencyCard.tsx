import { Minus, Plus } from 'react-feather';

export default function SelectCompetencyCard(props: SelectCompetencyCardProps) {
  const { text, selected, onClick } = props;
  return (
    <div
      className={`flex flex-row items-center gap-x-1.5 text-sm font-medium leading-5.5 border-1 border-transparent rounded-[18px] px-3 py-1 cursor-pointer ${
        selected ? 'bg-trublue-secondary-500 text-white' : 'text-grey-800 border-trublue-secondary-500 bg-white'
      }`}
      onClick={onClick}
    >
      {text}
      {selected ? <Minus size={16} /> : <Plus size={16} />}
    </div>
  );
}

type SelectCompetencyCardProps = {
  text: string;
  value: string;
  selected: boolean;
  onClick: () => void;
};
