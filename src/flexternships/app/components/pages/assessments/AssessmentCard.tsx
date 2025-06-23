import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { Activity, Clock, HelpCircle, Info, Lock } from 'react-feather';
import classNames from 'classnames';
import SimpleElevatedCard from '../../core/cards/SimpleElevatedCard';
import { Assessment, AssessmentSectionResult } from '@flexternships/types/assessment-types';
import { AssessmentStatus, AssessmentType } from '@/flexternships/constraints/enums/assessment-enums';
import { ProjectPrimaryStatus } from '@/flexternships/constraints/enums/core-enums';
import { getReadableAssessmentType } from '@/flexternships/static/content/assessment-content';
import { formatEpochToDuration } from '@/flexternships/utils/date-utils';
import { useEffect, useState } from 'react';
import { getAssessmentResult } from '@/flexternships/services/assessments-service';
import { isEmpty } from 'lodash';
import { useAssessmentsStore } from '@/flexternships/stores/assessments-store';
import { getGradeMetadataByName } from '@/flexternships/utils/core-utils';

const CustomTable = ({ sections }: { sections: AssessmentSectionResult[] }) => {
  return (
    <div className="border-1 border-grey-border rounded-md shadow-card overflow-hidden">
      <table className="w-full">
        <thead className="bg-grey-background uppercase h-[52px] text-xs font-semibold tracking-[1px] text-grey-heading">
          <tr>
            <th className="text-left pr-2.5 pl-6">Section</th>
            <th className="text-left px-2.5 w-[220px]">Completed On</th>
            <th className="text-left pl-2.5 pr-6 w-[200px]">Grade</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section, index) => (
            <tr
              className={classNames('h-[52px]', {
                'bg-white': index % 2 === 0,
                'bg-grey-10': index % 2 === 1,
                'border-b border-grey-50': index !== sections.length - 1,
              })}
              key={section.name}
            >
              <td className="py-3 pr-2.5 pl-6">{section.name}</td>
              <td className="py-3 px-2.5">10 Jan 2024, 4:00 PM IST</td>
              {/* TODO: Remove completed on and remove hardcoded data */}
              <td className="py-3 pl-2.5 pr-6 flex flex-row gap-x-2">
                <div
                  className="w-1 rounded-md"
                  style={{ backgroundColor: getGradeMetadataByName(section.grade)?.colorCode }}
                />
                <span className="text-sm font-medium leading-4.5 text-grey">{section.grade}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function AssessmentAccordion({ assessment }: { assessment: Assessment }) {
  const timeTakenInMillis = assessment.totalDuration * 1000; // TODO: change duration to time taken

  const [assessmentResult, setAssessmentResult] = useState<AssessmentSectionResult[]>([]);
  const [isAssessmentResultLoading, setIsAssessmentResultLoading] = useState(false);

  const isGradeMetadataLoading = useAssessmentsStore((state) => state.isGradeMetadataLoading);
  const populateGradeMetadata = useAssessmentsStore((state) => state.populateGradeMetadata);

  useEffect(() => {
    const fetchAssessmentResult = async () => {
      setIsAssessmentResultLoading(true);
      try {
        const result = await getAssessmentResult(assessment.projectId, assessment.id);
        setAssessmentResult(result ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsAssessmentResultLoading(false);
      }
    };
    fetchAssessmentResult();
    populateGradeMetadata();
  }, [assessment.id, assessment.projectId]);

  if (isGradeMetadataLoading) return <div>Loading...</div>;

  const gradeColorCode = getGradeMetadataByName(assessment.grade)?.colorCode;

  return (
    <Accordion type="single" defaultValue="my-assessments" collapsible className="bg-white rounded-10 overflow-hidden">
      <AccordionItem value="my-assessments" className="border-none">
        <AccordionTrigger className="p-6 hover:no-underline cursor-default">
          <div className="flex flex-row items-center w-full gap-x-10 pr-10">
            <div className="flex-1 flex flex-col gap-y-1.5">
              <div className="text-lg font-medium leading-5.5 text-grey-900 text-left">{assessment.name}</div>
              <div className="text-sm font-medium leading-4.5 text-grey-500 text-left">
                {getReadableAssessmentType(assessment.type)}
              </div>
            </div>
            <div className="flex flex-row gap-x-10">
              <div className="flex flex-col gap-y-1.5">
                <div className="flex flex-row gap-x-2">
                  <div className="w-1 rounded-md" style={{ backgroundColor: gradeColorCode }} />
                  <span className="text-lg font-medium leading-5.5" style={{ color: gradeColorCode }}>
                    {assessment.grade}
                  </span>
                  <Info size={18} className="text-grey-300" />
                  {/* TODO: Tooltip */}
                </div>
                <div className="flex flex-row items-center gap-x-1">
                  <Activity size={16} className="text-grey-500" />
                  <span className="text-sm font-medium leading-4.5 text-grey-500">Overall Grade</span>
                </div>
              </div>
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
                  {formatEpochToDuration(timeTakenInMillis)}
                </div>
                <div className="flex flex-row items-center gap-x-1">
                  <Clock size={16} className="text-grey-500" />
                  <span className="text-sm font-medium leading-4.5 text-grey-500">Time Taken</span>
                </div>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          {isAssessmentResultLoading ? (
            <div className="p-6 pt-0 bg-white">Loading...</div>
          ) : isEmpty(assessmentResult) ? (
            <div className="p-6 pt-0 bg-white">No assessment result found</div>
          ) : (
            <div className="p-6 pt-0 bg-white">
              <CustomTable sections={assessmentResult} />
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

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
