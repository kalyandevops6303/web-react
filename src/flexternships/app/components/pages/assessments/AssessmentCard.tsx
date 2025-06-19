import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import { Activity, Clock, HelpCircle, Info } from 'react-feather';
import classNames from 'classnames';
import SimpleElevatedCard from '../../core/cards/SimpleElevatedCard';

const CustomTable = () => {
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
          <tr className="bg-white border-b border-grey-50">
            <td className="py-3 pr-2.5 pl-6">Section 1</td>
            <td className="py-3 px-2.5">10 Jan 2024, 4:00 PM IST</td>
            <td className="py-3 pl-2.5 pr-6 flex flex-row gap-x-2">
              <div className="bg-purple w-1 rounded-md" />
              <span className="text-sm font-medium leading-4.5 text-grey">Proficient</span>
            </td>
          </tr>
          <tr className="bg-grey-10 border-b border-grey-50">
            <td className="py-3 pr-2.5 pl-6">Section 2</td>
            <td className="py-3 px-2.5">10 Jan 2024, 4:00 PM IST</td>
            <td className="py-3 pl-2.5 pr-6 flex flex-row gap-x-2">
              <div className="bg-trublue w-1 rounded-md" />
              <span className="text-sm font-medium leading-4.5 text-grey">Mastery</span>
            </td>
          </tr>
          <tr className="bg-white">
            <td className="py-3 pr-2.5 pl-6">Section 3</td>
            <td className="py-3 px-2.5">10 Jan 2024, 4:00 PM IST</td>
            <td className="py-3 pl-2.5 pr-6 flex flex-row gap-x-2">
              <div className="bg-yellow w-1 rounded-md" />
              <span className="text-sm font-medium leading-4.5 text-grey">Novice</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

function AssessmentAccordion() {
  return (
    <Accordion type="single" defaultValue="my-assessments" collapsible className="bg-white rounded-10">
      <AccordionItem value="my-assessments" className="border-none">
        <AccordionTrigger className="p-6 hover:no-underline cursor-default">
          <div className="flex flex-row items-center w-full gap-x-10 pr-10">
            <div className="flex-1 flex flex-col gap-y-1.5">
              <div className="text-lg font-medium leading-5.5 text-grey-900 text-left">PHP Coding</div>
              <div className="text-sm font-medium leading-4.5 text-grey-500 text-left">Benchmarking Assessment</div>
            </div>
            <div className="flex flex-row gap-x-10">
              <div className="flex flex-col gap-y-1.5">
                <div className="flex flex-row gap-x-2">
                  <div className="bg-teal w-1 rounded-md" />
                  <span className="text-lg font-medium leading-5.5 text-teal">Fundamental</span>
                  <Info size={18} className="text-grey-300" />
                  {/* TODO: Tooltip */}
                </div>
                <div className="flex flex-row items-center gap-x-1">
                  <Activity size={16} className="text-grey-500" />
                  <span className="text-sm font-medium leading-4.5 text-grey-500">Overall Grade</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <div className="text-grey-900 text-lg font-medium leading-5.5">36</div>
                <div className="flex flex-row items-center gap-x-1">
                  <HelpCircle size={16} className="text-grey-500" />
                  <span className="text-sm font-medium leading-4.5 text-grey-500">Questions</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <div className="text-grey-900 text-lg font-medium leading-5.5">10 min</div>
                <div className="flex flex-row items-center gap-x-1">
                  <Clock size={16} className="text-grey-500" />
                  <span className="text-sm font-medium leading-4.5 text-grey-500">Time Taken</span>
                </div>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <div className="p-6 pt-0">
            <CustomTable />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function AssessmentCard() {
  const isCompleted = true; // TODO: change to derived
  if (isCompleted) return <AssessmentAccordion />;

  const isEnabled = true; // TODO: change to derived
  return (
    <SimpleElevatedCard className="flex flex-row items-center justify-between p-6 rounded-10 bg-white">
      <div className="flex flex-col gap-y-1.5">
        <div className="text-lg font-medium leading-5.5 text-grey-900">Java testing</div>
        <div className="text-sm font-medium leading-4.5 text-grey-500">End of Project Assessment</div>
      </div>
      <div
        className={classNames('text-sm font-semibold tracking-wide', {
          'text-trublue-secondary-500 cursor-pointer': isEnabled,
          'text-grey-300 cursor-default': !isEnabled,
        })}
      >
        Take Assessment
      </div>
    </SimpleElevatedCard>
  );
}
