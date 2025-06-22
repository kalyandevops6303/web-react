import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { Link } from 'react-router-dom';
import { ChevronRight, HelpCircle, Clock, Info } from 'react-feather';
import routes from '@/flexternships/routes';

const AssessmentInfo = () => {
  const isCompleted = true;

  if (isCompleted)
    return (
      <div className="flex flex-col gap-y-2 grow">
        <div className="flex items-center gap-x-1.5">
          <span className="text-grey-300 text-xs font-semibold leading-4 uppercase">BENCHMARKING</span>
          <Info size={16} className="text-grey-300" />
        </div>
        <div className="flex flex-row gap-x-5 items-center justify-between">
          <div className="flex flex-row gap-x-3">
            <div className="w-1 bg-teal rounded-md" />
            <div className="flex flex-col gap-y-1">
              <div className="text-grey-900 text-base font-medium leading-5">UX Designer</div>
              <div className="text-sm font-semibold leading-4.5 text-teal uppercase">MASTERED</div>
            </div>
          </div>
          <div className="flex flex-row gap-x-5">
            <div className="flex flex-col gap-y-1.5">
              <div className="text-grey-900 text-lg font-medium leading-5.5 self-start">36</div>
              <div className="flex flex-row items-center gap-x-1">
                <HelpCircle size={16} className="text-grey-500" />
                <span className="text-sm font-medium leading-4.5 text-grey-500">Questions</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-1.5">
              <div className="text-grey-900 text-lg font-medium leading-5.5 self-start">10 min</div>
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
    <div className="flex flex-col gap-y-2 grow">
      <div className="flex items-center gap-x-1.5">
        <span className="text-grey-300 text-xs font-semibold leading-4 uppercase">BENCHMARKING</span>
        <Info size={16} className="text-grey-300" />
      </div>
      <div className="flex flex-row gap-x-3 py-3">
        <div className="grow text-base font-medium leading-5 text-grey-900">UX Designer</div>
        <div className="text-sm font-semibold tracking-wide text-trublue-secondary-500">Take Assessment</div>
      </div>
    </div>
  );
};

export default function DashboardAssessmentSection() {
  return (
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
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-trublue-secondary-500 mr-6">
              <div>Sample Assessment</div>
              <Info size={16} className="text-trublue-secondary-500" />
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <div className="p-6 flex gap-x-7 border-t border-grey-50">
            <AssessmentInfo />
            <div className="w-[1px] rounded-md bg-grey-50" />
            <div className="flex flex-col gap-y-2 grow">
              <div className="flex items-center gap-x-1.5">
                <span className="text-grey-300 text-xs font-semibold leading-4 uppercase">BENCHMARKING</span>
                <Info size={16} className="text-grey-300" />
              </div>
              <div className="flex flex-row gap-x-3 py-3">
                <div className="grow text-base font-medium leading-5 text-grey-900">UX Designer</div>
                <div className="text-sm font-semibold tracking-wide text-trublue-secondary-500">Take Assessment</div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
