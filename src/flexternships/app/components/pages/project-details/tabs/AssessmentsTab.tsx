import MyAssessments from '../../assessments/MyAssessments';
import PreparingAssessmentModal from '../../../core/modals/assessments/PreparingAssessmentModal';
import { useState } from 'react';
import { Assessment } from '@/flexternships/constraints/types/assessment-types';

type AssessmentsTabProps = {
  className?: string;
  forceRefresh?: boolean;
};

export default function AssessmentsTab({ className, forceRefresh = false }: AssessmentsTabProps) {
  const [isPreparingAssessmentModalOpen, setIsPreparingAssessmentModalOpen] = useState(false);
  const [assessmentToPrepare, setAssessmentToPrepare] = useState<Assessment | undefined>();

  const takeAssessment = (assessment: Assessment) => {
    setAssessmentToPrepare(assessment);
    setIsPreparingAssessmentModalOpen(true);
  };

  const closePreparingAssessmentModal = () => {
    setIsPreparingAssessmentModalOpen(false);
  };
  return (
    <div className={className}>
      <MyAssessments takeAssessment={takeAssessment} forceRefresh={forceRefresh} />
      {assessmentToPrepare && (
        <PreparingAssessmentModal
          isOpen={isPreparingAssessmentModalOpen}
          onClose={closePreparingAssessmentModal}
          assessment={assessmentToPrepare}
        />
      )}
    </div>
  );
}
