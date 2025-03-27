import { useAppStore } from '@/flexternships/stores/core-stores';
import privacyGif from '@/flexternships/assets/gifs/privacymodal.gif';
import GenericModal from '../GenericModal';
import { GlobalModalType } from '@/flexternships/constraints/enums/core-enums';
import SecondaryButton from '../../buttons/SecondaryButton';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicyModal() {
  const modal = useAppStore((state) => state.modal);
  const closeGlobalModal = useAppStore((state) => state.closeModal);
  const navigate = useNavigate();

  return (
    <GenericModal
      isOpen={modal === GlobalModalType.TERMS_AND_CONDITIONS}
      onClose={closeGlobalModal}
      className="max-w-[700px] h-fit"
    >
      <div className="flex gap-x-7 pl-9 pr-8 py-10">
        <img className="w-40 h-40 object-cover" src={privacyGif} alt="blocked-gif" />
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-[28px]  font-medium leading-[30px]">Privacy policy and Terms of Service</h1>
          <p
            className="text-[18px] font-normal leading-[22px]
"
          >
            We have updated our <span className="font-bold">Privacy policy</span> and{' '}
            <span className="font-bold">enterprise user terms of service</span> please read and accept to continue.
          </p>
          <div className="flex flex-row items-center gap-5">
            <SecondaryButton
              onClick={() => {
                navigate('/privacy-policy');
              }}
              className="rounded-[6px] py-2.5 px-5"
            >
              Privacy Policy
            </SecondaryButton>
            <SecondaryButton onClick={() => {}} className="rounded-[6px] py-2.5 px-5">
              User terms of service
            </SecondaryButton>
          </div>
        </div>
      </div>
    </GenericModal>
  );
}
