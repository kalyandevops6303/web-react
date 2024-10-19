import React from 'react';
import PrimaryButton from '@flexternships/app/components/core/buttons/PrimaryButton';
import { X } from 'react-feather';

import checklistImage from '@flexternships/assets/images/checklist.gif';

interface ClientOnboardingSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function ClientOnboardingSuccessModal({ isOpen, onClose, onContinue }: ClientOnboardingSuccessProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg pt-4 pl-4 pr-8 pb-6 max-w-2xl relative">
        <div className='absolute -top-2 -right-2 bg-white rounded-md p-2 shadow-table cursor-pointer' onClick={onClose}>
          <X size={16} />
        </div>
        <div className='flex gap-x-10'>
          <div>
            <img className='size-[244px]' src={checklistImage} />
          </div>
          <div className='pt-10 flex flex-col items-center grow gap-y-5'>
            <h1 className='text-[28px] font-normal text-grey-heading'>
              Well Done!
            </h1>
            <div className='text-xs text-ce font-light leading-5 text-grey max-w-[265px]'>
              Congratulations, you have completed your onboarding.
            </div>
            <div className='self-stretch flex items-end justify-end grow'>
              <PrimaryButton onClick={onContinue}>
                Get Started
              </PrimaryButton>
            </div>
          </div>

        </div>


        {/* <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Onboarding Complete</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="mb-6">Congratulations! You have successfully completed the onboarding process.</p>
        <div className="flex justify-end space-x-4">
          <SecondaryButton onClick={onClose}>
            Close
          </SecondaryButton>
          <PrimaryButton onClick={onContinue}>
            Continue to Dashboard
          </PrimaryButton>
        </div> */}
      </div>
    </div>
  );
}