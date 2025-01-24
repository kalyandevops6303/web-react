import SecondaryButton from '../buttons/SecondaryButton';
import GenericModal from './GenericModal';
import CelebrationGif from '@flexternships/assets/gifs/celebration.gif';

export default function QuickActionConfirmationModal(props: QuickActionConfirmationModalProps) {
  const { onClose, isOpen, title, description } = props;

  return (
    <GenericModal isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-6 pl-6 pr-8 py-10">
        <div className="flex flex-col justify-center items-center">
          <img className="size-52 object-cover" src={CelebrationGif} alt="recognition-confirmation" />
        </div>
        <div className="grow flex flex-col justify-between">
          <div className="flex flex-col gap-y-4 max-w-[415px]">
            <h1 className="text-[28px] font-medium text-grey-heading">{title}</h1>
            {description && <div className="text-grey text-lg font-normal">{description}</div>}
          </div>
          <div className="flex flex-row justify-end gap-x-5">
            <SecondaryButton className="m-0" onClick={onClose}>
              Close
            </SecondaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}

type QuickActionConfirmationModalProps = {
  onClose: () => void;
  isOpen?: boolean;
  title: string;
  description?: string;
};
