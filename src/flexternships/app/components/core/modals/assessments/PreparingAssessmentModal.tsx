import { AlertTriangle, Bookmark, Code, Info, Video } from 'react-feather';
import GenericModal from '../../modals/GenericModal';
import { Assessment } from '@/flexternships/constraints/types/assessment-types';
import React from 'react';
import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import { convertToClickableUrl } from '@/flexternships/utils/miscellaneous-utils';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';

interface PreparingAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: Assessment;
}

const instructions = [
  {
    icon: Info,
    description: 'Use a PC with a webcam for the assessment.',
  },
  {
    icon: Video,
    description: 'Ensure good lighting and no background noise.',
  },
  {
    icon: Info,
    description: 'Complete the assessment in one continuous browser session.',
  },
  {
    icon: Info,
    description: 'Unattempted questions have no negative marking.',
  },
  {
    icon: Code,
    description: 'Navigate using Next/Previous buttons or question numbers.',
  },
  {
    icon: Bookmark,
    description: 'Mark questions to revisit later.',
  },
  {
    icon: Info,
    description: 'Do not pause, restart, or navigate away from the test. These actions may lead to disqualification.',
  },
  {
    icon: AlertTriangle,
    description: 'Your IP address will be tracked while taking assessments, so please ensure to use the same device.',
  },
];

export default function PreparingAssessmentModal(props: PreparingAssessmentModalProps) {
  const { isOpen, onClose, assessment } = props;

  const startAssessment = () => {
    if (!assessment.url) return showToastMessage(ToastType.ERROR, 'Invalid assessment URL');
    window.open(convertToClickableUrl(assessment.url), '_blank');
  };

  return (
    <GenericModal isOpen={isOpen} onClose={onClose} className="max-w-[858px]">
      <div className="flex flex-col gap-y-5 p-6 bg-[#fff] rounded-md">
        <div className="flex flex-col gap-y-8 px-6 pt-4">
          <div className="flex flex-col gap-y-3">
            <h1 className="text-[28px] font-medium text-grey-heading">
              Preparing Your Assessment - <span className="text-orange">{assessment.name}</span>
            </h1>
            <p className="text-sm font-normal leading-5 text-grey">
              Before starting your assessment, please go through the following instructions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {instructions.map((instruction) => (
              <div className="flex flex-row gap-x-4">
                <div className="p-2 bg-trublue-secondary-500/10 rounded-full self-start">
                  {React.createElement(instruction.icon, { size: 24, className: 'text-trublue-secondary-500' })}
                </div>
                <div className="text-sm font-normal leading-5.5 text-grey">{instruction.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="self-end flex gap-x-4">
          <SecondaryButton className="m-0" onClick={onClose}>
            Not Now
          </SecondaryButton>
          <PrimaryButton className="m-0" onClick={startAssessment}>
            Start Assessment
          </PrimaryButton>
        </div>
      </div>
    </GenericModal>
  );
}
