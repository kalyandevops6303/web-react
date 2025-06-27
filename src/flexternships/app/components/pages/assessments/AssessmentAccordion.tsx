import { AssessmentSectionResult } from '@/flexternships/constraints/types/assessment-types';
import { useState } from 'react';
import { Assessment } from '@/flexternships/constraints/types/assessment-types';
import { useEffect } from 'react';
import { getAssessmentResult } from '@/flexternships/services/assessments-service';
import { getGradeMetadataByName } from '@/flexternships/utils/core-utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { getReadableAssessmentType } from '@/flexternships/static/content/assessment-content';
import { Activity, Clock, HelpCircle, Info } from 'lucide-react';
import { formatEpochToDuration } from '@/flexternships/utils/date-utils';
import { isEmpty } from 'lodash';
import Spinner from '../../core/Spinner';
import classNames from 'classnames';

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

export default function AssessmentAccordion({ assessment }: { assessment: Assessment }) {
  const timeTakenInMillis = assessment.totalDuration * 1000;

  const [assessmentResult, setAssessmentResult] = useState<AssessmentSectionResult[]>([]);
  const [isAssessmentResultLoading, setIsAssessmentResultLoading] = useState(false);

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
  }, [assessment.id, assessment.projectId]);

  const gradeColorCode = getGradeMetadataByName(assessment.grade)?.colorCode;

  return (
    <Accordion type="single" collapsible className="bg-white rounded-10 overflow-hidden">
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
            <div className="p-10 flex justify-center items-center">
              <Spinner className="size-8" />
            </div>
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
