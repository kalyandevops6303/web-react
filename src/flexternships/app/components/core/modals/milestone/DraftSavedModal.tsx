import { useNavigate } from 'react-router-dom';
import SecondaryButton from '../../buttons/SecondaryButton';
import GenericModal from '../GenericModal';
import GreenCheckGif from '@flexternships/assets/gifs/green-check.gif';

export default function DraftSavedModal(props: DraftSavedModalProps) {
  const { onClose, isOpen, title, description, note, highlightText, nextPath } = props;

  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    if (nextPath) {
      navigate(nextPath);
    }
  };
  return (
    <GenericModal isOpen={isOpen} onClose={handleClose}>
      <div className="flex gap-x-10 pl-10 pr-8 pt-10 pb-6">
        <div className="flex flex-col justify-center items-center">
          <img className="w-30 h-30 object-cover" src={GreenCheckGif} alt="green-check-gif" />
        </div>
        <div className="flex flex-col gap-y-11">
          <div className="flex flex-col gap-y-4 max-w-[415px]">
            <h1 className="text-2xl font-medium leading-[38px] text-grey-heading">{title}</h1>
            {description && <div className="text-lg font-normal leading-6 text-grey">{description}</div>}
            <div className="text-grey text-base font-normal leading-5">
              <div>
                <span className="font-semibold">Note: </span>
                <span>{note}</span>
              </div>
              <div className="font-semibold">{highlightText}</div>
            </div>
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <SecondaryButton className="m-0" onClick={handleClose}>
              Close
            </SecondaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}

type DraftSavedModalProps = {
  onClose: () => void;
  isOpen?: boolean;
  title: string;
  description?: string;
  note?: string;
  highlightText?: string;
  nextPath?: string;
};
