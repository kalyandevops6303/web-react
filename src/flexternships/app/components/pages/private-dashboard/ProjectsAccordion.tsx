import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import ProjectCard from './ProjectCard';

export default function ProjectsAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="rounded-lg border-none bg-white shadow-card">
        <AccordionTrigger className="py-4 px-6 hover:no-underline cursor-default">
          <div className="flex items-center gap-x-3">
            <span className="text-grey-heading text-lg font-medium">Sample Project</span>
            <span className="rounded-[17px] py-[1px] px-[9px] border-1 border-trublue text-trublue text-xs font-semibold leading-4.5">
              01
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <div className="px-6 pt-3 pb-6 flex flex-col gap-y-4">
            <ProjectCard />
            <ProjectCard />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
