import GenericModal from '../../modals/GenericModal';
import GreenCheckGif from '@flexternships/assets/gifs/green-check.gif';
import SecondaryButton from '../../buttons/SecondaryButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactSupportSuccessModal(props: Props) {
  const { isOpen, onClose } = props;

  return (
    <GenericModal className="max-w-[700px]" isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-x-12 p-12 pb-10">
        <div className="flex flex-col grow gap-y-10">
          <div className="flex gap-x-10">
            <div className="flex flex-col justify-center items-center">
              <img className="size-36 object-cover" src={GreenCheckGif} alt="support-confirmation" />
            </div>
            <div className="grow flex flex-col justify-between">
              <div className="flex flex-col gap-y-2 max-w-[415px] grow justify-center">
                <div className="text-grey text-lg font-normal">Thanks for contacting us.</div>
                <div className="text-[28px] font-medium text-grey-heading">We'll get back to you soon.</div>
              </div>
              <div className="flex flex-row justify-end gap-x-5">
                <SecondaryButton className="m-0" onClick={onClose}>
                  Close
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}
