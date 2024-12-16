import SecondaryButton from '@/flexternships/app/components/core/buttons/SecondaryButton';
import GenericModal from '@/flexternships/app/components/core/modals/GenericModal';
import CelebrationGif from '@flexternships/assets/gifs/celebration.gif';

export default function SucessModal(props: SucessModalProps) {
  const { isOpen, onClose } = props;
  return (
    <GenericModal isOpen={isOpen} onClose={onClose} className="outline-none z-50">
      <div className="w-[667px] h-[255px] p-[39px] flex gap-[11px]">
        <img className="w-[202px] h-[202px] object-contain p-0" src={CelebrationGif} alt="confirm-action" />

        <div className="flex flex-col gap-[11px] py-5 w-full">
          <div className="text-[#5E5873] font-[Montserrat] text-[24px] font-medium leading-normal">Great Job!</div>
          <div className="text-[#6E6B7B] font-[Montserrat] text-[18px] font-normal leading-[24px]">
            You have completed the feedback.
          </div>

          <div className="flex justify-end  w-full h-full mt-10">
            <SecondaryButton className="w-[100px]" onClick={onClose}>
              Close
            </SecondaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}

type SucessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
