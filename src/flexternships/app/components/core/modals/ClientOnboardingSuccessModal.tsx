import PrimaryButton from '@flexternships/app/components/core/buttons/PrimaryButton';
import { X } from 'react-feather';

import checklistImage from '@flexternships/assets/gifs/checklist.gif';
import { useNavigate } from 'react-router-dom';
import { useFlexternUserStore } from '@flexternships/stores/core-stores';

interface ClientOnboardingSuccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientOnboardingSuccessModal({ isOpen, onClose }: ClientOnboardingSuccessProps) {
  const populateUserDetails = useFlexternUserStore((state) => state.populateUserDetails);
  const navigate = useNavigate();

  const onContinue = () => {
    populateUserDetails(true);
    navigate('/dashboard');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg pt-4 pl-4 pr-8 pb-6 max-w-2xl relative">
        <div className="absolute -top-2 -right-2 bg-white rounded-md p-2 shadow-table cursor-pointer" onClick={onClose}>
          <X size={16} />
        </div>
        <div className="flex gap-x-10">
          <div>
            <img className="size-[244px]" src={checklistImage} />
          </div>
          <div className="pt-10 flex flex-col items-center grow gap-y-5">
            <h1 className="text-[28px] font-normal text-grey-heading">Well Done!</h1>
            <div className="text-xs text-ce font-light leading-5 text-grey max-w-[265px]">
              Congratulations, you have completed your onboarding.
            </div>
            <div className="self-stretch flex items-end justify-end grow">
              <PrimaryButton onClick={onContinue}>Get Started</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
