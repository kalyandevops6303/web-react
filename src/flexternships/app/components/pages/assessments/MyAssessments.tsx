import { useAssessmentsStore } from '@/flexternships/stores/assessments-store';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import AssessmentCard from './AssessmentCard';
import Spinner from '../../core/Spinner';
import { Assessment } from '@/flexternships/constraints/types/assessment-types';
import { useParams } from 'react-router-dom';
import { AssessmentType } from '@/flexternships/constraints/enums/assessment-enums';

type MyAssessmentsProps = {
  takeAssessment: (assessment: Assessment) => void;
  forceRefresh?: boolean;
};

export default function MyAssessments({ takeAssessment, forceRefresh = false }: MyAssessmentsProps) {
  const assessments = useAssessmentsStore((state) => state.assessments);
  const isAssessmentsLoading = useAssessmentsStore((state) => state.isAssessmentsLoading);
  const populateAssessments = useAssessmentsStore((state) => state.populateAssessments);

  const isGradeMetadataLoading = useAssessmentsStore((state) => state.isGradeMetadataLoading);
  const populateGradeMetadata = useAssessmentsStore((state) => state.populateGradeMetadata);

  const { projectId } = useParams();

  useEffect(() => {
    populateAssessments({ projectId: projectId, force: forceRefresh });
    populateGradeMetadata();
  }, [forceRefresh]);
  return (
    <div className="flex flex-col gap-y-6">
      {isAssessmentsLoading || isGradeMetadataLoading ? (
        <div className="p-10 flex justify-center items-center">
          <Spinner className="size-8" />
        </div>
      ) : isEmpty(assessments) ? (
        <div>No assessments found</div>
      ) : (
        assessments
          .filter((assessment) => assessment.type !== AssessmentType.SAMPLE)
          .map((assessment) => (
            <AssessmentCard key={assessment.id} assessment={assessment} takeAssessment={takeAssessment} />
          ))
      )}
    </div>
  );
}
