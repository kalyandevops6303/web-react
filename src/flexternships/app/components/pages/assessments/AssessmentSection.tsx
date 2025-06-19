import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { Link } from 'react-router-dom';
import { ChevronRight, Info } from 'react-feather';

export default function AssessmentSection() {
  return (
    <Accordion type="single" collapsible className="bg-white w-full rounded-md">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="py-4 px-6 hover:no-underline cursor-default">
          <div className="flex items-center justify-between w-full py-2">
            <Link
              to="/dashboard/assessments"
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
