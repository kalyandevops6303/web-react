import { AlertCircle } from 'react-feather';

interface InfoNoteProps {
  note: string;
}

export default function InfoNote(props: InfoNoteProps) {
  const { note } = props;
  return (
    <div className="flex flex-row items-center gap-x-2 rounded-md bg-trublue-light p-4">
      <AlertCircle size={18} className="text-trublue-secondary-500" />
      <div className="text-[15px] text-trublue-secondary-500 leading-4 font-normal">
        <span className="font-semibold">Note: </span>
        {note}
      </div>
    </div>
  );
}
