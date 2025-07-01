import { HelpCircle, Clock } from 'react-feather';
import { useAssessmentsStore } from '@/flexternships/stores/assessments-store';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { Assessment } from '@flexternships/types/assessment-types';
import { formatEpochToDuration } from '@/flexternships/utils/date-utils';
// import classNames from 'classnames';
// import { ProjectPrimaryStatus } from '@/flexternships/constraints/enums/core-enums';
import { AssessmentStatus, AssessmentType } from '@/flexternships/constraints/enums/assessment-enums';
import BoxSkeleton from '../../core/skeletons/BoxSkeleton';
import { getReadableAssessmentType } from '@/flexternships/static/content/assessment-content';
import { getGradeMetadataByName } from '@/flexternships/utils/core-utils';
import { useParams } from 'react-router-dom';

const AssessmentInfo = ({ assessment }: { assessment: Assessment }) => {
  //   const isBenchmarkingAssessment = assessment.type === AssessmentType.BENCHMARKING;
  const isAssessmentCompleted = assessment.status === AssessmentStatus.COMPLETED;
  //   const isProjectCompleted = assessment.projectStatus === ProjectPrimaryStatus.COMPLETED;

  //   const isAssessmentEnabled = isBenchmarkingAssessment || isProjectCompleted;
  const durationinMillis = assessment.totalDuration * 1000;

  const gradeColorCode = getGradeMetadataByName(assessment.grade)?.colorCode;

  if (isAssessmentCompleted)
    return (
      <div className="p-6 flex flex-col gap-y-5 flex-1 bg-white shadow-card rounded-md">
        <div className="flex items-center gap-x-1.5">
          <span className="text-grey-600 text-lg font-semibold leading-5.5">
            {getReadableAssessmentType(assessment.type)}
          </span>
        </div>
        <div className="flex flex-row gap-x-5 items-center justify-between">
          <div className="flex flex-row gap-x-3">
            <div className="w-1 rounded-md" style={{ backgroundColor: gradeColorCode }} />
            <div className="flex flex-col gap-y-1">
              <div className="text-grey-900 text-base font-medium leading-5">{assessment.name}</div>
              <div className="text-sm font-medium leading-4.5 uppercase" style={{ color: gradeColorCode }}>
                {assessment.grade}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-5">
            <div className="flex flex-col gap-y-1.5">
              <div className="text-grey-900 text-lg font-medium leading-5.5 self-start">
                {assessment.numberOfQuestions}
              </div>
              <div className="flex flex-row items-center gap-x-1">
                <HelpCircle size={16} className="text-grey-500" />
                <span className="text-sm font-medium leading-4.5 text-grey-500">Questions</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-1.5">
              <div className="text-grey-900 text-lg font-medium leading-5.5 self-start">
                {formatEpochToDuration(durationinMillis)}
              </div>
              <div className="flex flex-row items-center gap-x-1">
                <Clock size={16} className="text-grey-500" />
                <span className="text-sm font-medium leading-4.5 text-grey-500">Time Taken</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return null;
};

const AssessmentSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2 grow">
      <div className="flex flex-row gap-y-2">
        <div className="flex flex-col">
          <BoxSkeleton className="w-1 h-4 rounded-md" />
          <BoxSkeleton className="w-full h-4 rounded-md" />
        </div>
        <div className="w-[1px] rounded-md bg-grey-50" />
        <div className="flex flex-col">
          <BoxSkeleton className="w-1 h-4 rounded-md" />
          <BoxSkeleton className="w-full h-4 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default function TalentProfileAssessmentSection() {
  const assessments = useAssessmentsStore((state) => state.assessments);
  const isAssessmentsLoading = useAssessmentsStore((state) => state.isAssessmentsLoading);
  const populateAssessments = useAssessmentsStore((state) => state.populateAssessments);

  const isGradeMetadataLoading = useAssessmentsStore((state) => state.isGradeMetadataLoading);
  const populateGradeMetadata = useAssessmentsStore((state) => state.populateGradeMetadata);

  const { userId } = useParams();

  useEffect(() => {
    populateAssessments({ userId: userId });
    populateGradeMetadata();
  }, []);

  return (
    <div className="flex gap-x-5">
      {isAssessmentsLoading || isGradeMetadataLoading ? (
        <AssessmentSectionSkeleton />
      ) : isEmpty(assessments) ? (
        <div>No assessments found</div>
      ) : (
        assessments
          .filter((assessment) => assessment.type !== AssessmentType.SAMPLE)
          .map((assessment) => <AssessmentInfo key={assessment.id} assessment={assessment} />)
      )}
    </div>
  );
}
