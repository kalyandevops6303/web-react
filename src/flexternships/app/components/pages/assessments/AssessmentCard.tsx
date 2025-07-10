import { Lock } from 'react-feather';
import classNames from 'classnames';
import SimpleElevatedCard from '../../core/cards/SimpleElevatedCard';
import { Assessment } from '@flexternships/types/assessment-types';
import { AssessmentStatus, AssessmentType } from '@/flexternships/constraints/enums/assessment-enums';
import { ProjectPrimaryStatus } from '@/flexternships/constraints/enums/core-enums';
import { getReadableAssessmentType } from '@/flexternships/static/content/assessment-content';
import AssessmentAccordion from './AssessmentAccordion';

export default function AssessmentCard({
  assessment,
  takeAssessment,
}: {
  assessment: Assessment;
  takeAssessment: (assessment: Assessment) => void;
}) {
  const isAssessmentCompleted = assessment.status === AssessmentStatus.COMPLETED;
  if (isAssessmentCompleted) return <AssessmentAccordion assessment={assessment} />;

  const isBenchmarkingAssessment = assessment.type === AssessmentType.BENCHMARKING;
  const isProjectCompleted = assessment.projectStatus === ProjectPrimaryStatus.COMPLETED;

  const isAssessmentEnabled = isBenchmarkingAssessment || isProjectCompleted;

  const verifyAndTakeAssessment = () => {
    if (!isAssessmentEnabled) return;
    takeAssessment(assessment);
  };

  return (
    <SimpleElevatedCard className="flex flex-row items-center justify-between p-6 rounded-10 bg-white">
      <div className="flex flex-col gap-y-1.5">
        <div className="text-lg font-medium leading-5.5 text-grey-900">{assessment.name}</div>
        <div className="text-sm font-medium leading-4.5 text-grey-500">
          {getReadableAssessmentType(assessment.type)}
        </div>
      </div>
      <div
        className={classNames('text-sm font-semibold tracking-wide', {
          'text-trublue-disabled flex gap-x-2 items-center cursor-default': !isAssessmentEnabled,
          'text-trublue-secondary-500 cursor-pointer': isAssessmentEnabled,
        })}
        onClick={verifyAndTakeAssessment}
      >
        Take Assessment {!isAssessmentEnabled && <Lock size={16} className="text-trublue-disabled" />}
      </div>
    </SimpleElevatedCard>
  );
}
