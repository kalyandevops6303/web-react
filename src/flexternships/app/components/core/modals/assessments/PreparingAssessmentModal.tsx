import GenericModal from '../../modals/GenericModal';
import { Assessment } from '@/flexternships/constraints/types/assessment-types';
import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import { convertToClickableUrl } from '@/flexternships/utils/miscellaneous-utils';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { instructions } from '@/flexternships/static/content/assessment-content';

interface PreparingAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: Assessment;
}

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
            {instructions.map((instruction, index) => (
              <div className="flex flex-row gap-x-4" key={index}>
                <div className="p-2 bg-trublue-secondary-500/10 rounded-full self-start">{instruction.icon}</div>
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
