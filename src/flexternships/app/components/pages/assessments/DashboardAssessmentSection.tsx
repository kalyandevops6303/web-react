import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { Link } from 'react-router-dom';
import { ChevronRight, HelpCircle, Clock, Info, Lock } from 'react-feather';
import routes from '@/flexternships/routes';
import { useAssessmentsStore } from '@/flexternships/stores/assessments-store';
import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Assessment } from '@flexternships/types/assessment-types';
import { formatEpochToDuration } from '@/flexternships/utils/date-utils';
import classNames from 'classnames';
import { ProjectPrimaryStatus } from '@/flexternships/constraints/enums/core-enums';
import { AssessmentStatus, AssessmentType } from '@/flexternships/constraints/enums/assessment-enums';
import BoxSkeleton from '../../core/skeletons/BoxSkeleton';
import { getGradeMetadataByName } from '@/flexternships/utils/core-utils';
import PreparingAssessmentModal from '../../core/modals/assessments/PreparingAssessmentModal';
import { convertToClickableUrl } from '@/flexternships/utils/miscellaneous-utils';

const AssessmentInfo = ({
  assessment,
  takeAssessment,
}: {
  assessment: Assessment;
  takeAssessment: (assessment: Assessment) => void;
}) => {
  const isBenchmarkingAssessment = assessment.type === AssessmentType.BENCHMARKING;
  const isAssessmentCompleted = assessment.status === AssessmentStatus.COMPLETED;
  const isProjectCompleted = assessment.projectStatus === ProjectPrimaryStatus.COMPLETED;

  const isAssessmentEnabled = isBenchmarkingAssessment || isProjectCompleted;
  const durationinMillis = assessment.totalDuration * 1000;

  const gradeColorCode = getGradeMetadataByName(assessment.grade)?.colorCode;

  const verifyAndTakeAssessment = () => {
    if (!isAssessmentEnabled) return;
    takeAssessment(assessment);
  };

  if (isAssessmentCompleted)
    return (
      <div className="flex flex-col gap-y-2 flex-1">
        <div className="flex items-center gap-x-1.5">
          <span className="text-grey-300 text-xs font-semibold leading-4 uppercase">{assessment.type}</span>
          <Info size={16} className="text-grey-300" />
        </div>
        <div className="flex flex-row gap-x-5 items-center justify-between">
          <div className="flex flex-row gap-x-3">
            <div className="w-1 rounded-md" style={{ backgroundColor: gradeColorCode }} />
            <div className="flex flex-col gap-y-1">
              <div className="text-grey-900 text-base font-medium leading-5">{assessment.name}</div>
              <div className="text-sm font-semibold leading-4.5 uppercase" style={{ color: gradeColorCode }}>
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
  return (
    <div className="flex flex-col gap-y-2 flex-1">
      <div className="flex items-center gap-x-1.5">
        <span className="text-grey-300 text-xs font-semibold leading-4 uppercase">{assessment.type}</span>
        <Info size={16} className="text-grey-300" />
      </div>
      <div className="flex flex-row gap-x-3 py-3">
        <div className="grow text-base font-medium leading-5 text-grey-900">{assessment.name}</div>
        <div
          className={classNames('text-sm font-semibold tracking-wide', {
            'text-trublue-disabled flex gap-x-2 items-center cursor-default': !isAssessmentEnabled,
            'text-trublue-secondary-500 cursor-pointer': isAssessmentEnabled,
          })}
          onClick={verifyAndTakeAssessment}
        >
          Take Assessment {!isAssessmentEnabled && <Lock size={16} className="text-trublue-disabled" />}
        </div>
      </div>
    </div>
  );
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

export default function DashboardAssessmentSection() {
  const assessments = useAssessmentsStore((state) => state.assessments);
  const isAssessmentsLoading = useAssessmentsStore((state) => state.isAssessmentsLoading);
  const populateAssessments = useAssessmentsStore((state) => state.populateAssessments);

  const isGradeMetadataLoading = useAssessmentsStore((state) => state.isGradeMetadataLoading);
  const populateGradeMetadata = useAssessmentsStore((state) => state.populateGradeMetadata);

  const [isPreparingAssessmentModalOpen, setIsPreparingAssessmentModalOpen] = useState(false);
  const [assessmentToPrepare, setAssessmentToPrepare] = useState<Assessment | undefined>();

  const takeAssessment = (assessment: Assessment) => {
    setAssessmentToPrepare(assessment);
    setIsPreparingAssessmentModalOpen(true);
  };

  const closePreparingAssessmentModal = () => {
    setIsPreparingAssessmentModalOpen(false);
  };

  useEffect(() => {
    populateAssessments();
    populateGradeMetadata();
  }, []);

  return (
    <>
      <Accordion type="single" defaultValue="my-assessments" collapsible className="bg-white rounded-md">
        <AccordionItem value="my-assessments" className="border-none">
          <AccordionTrigger className="py-4 px-6 hover:no-underline cursor-default">
            <div className="flex items-center justify-between w-full py-2">
              <Link
                to={routes.assessments.path}
                className="flex items-center gap-1 text-lg font-medium leading-5.5 text-trublue-secondary-500"
              >
                <div>My Assessments</div>
                <ChevronRight size={24} className="text-trublue-secondary-500" />
              </Link>
              {!isAssessmentsLoading && !isEmpty(assessments) && (
                <a
                  href={convertToClickableUrl(
                    assessments.find((assessment) => assessment.type === AssessmentType.SAMPLE)?.url ?? '',
                  )}
                  target="_blank"
                  className="flex items-center gap-2 text-sm font-semibold tracking-wide text-trublue-secondary-500 mr-6"
                >
                  <div>Sample Assessment</div>
                  <Info size={16} className="text-trublue-secondary-500" />
                </a>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <div className="p-6 flex gap-x-7 border-t border-grey-50">
              {isAssessmentsLoading || isGradeMetadataLoading ? (
                <AssessmentSectionSkeleton />
              ) : isEmpty(assessments) ? (
                <div>No assessments found</div>
              ) : (
                assessments
                  .filter((assessment) => assessment.type !== AssessmentType.SAMPLE)
                  .map((assessment, index) => (
                    <React.Fragment key={assessment.id}>
                      <AssessmentInfo key={assessment.id} assessment={assessment} takeAssessment={takeAssessment} />
                      {index !== assessments.length - 1 && <div className="w-[1px] rounded-md bg-grey-50" />}
                    </React.Fragment>
                  ))
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {assessmentToPrepare && (
        <PreparingAssessmentModal
          isOpen={isPreparingAssessmentModalOpen}
          onClose={closePreparingAssessmentModal}
          assessment={assessmentToPrepare}
        />
      )}
    </>
  );
}
