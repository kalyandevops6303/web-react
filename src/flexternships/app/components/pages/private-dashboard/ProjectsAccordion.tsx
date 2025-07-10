import { ProjectPrimaryStatus } from '@/flexternships/constraints/enums/core-enums';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion';
import ProjectCard from './ProjectCard';
import { getProjects } from '@/flexternships/services/dashboard-service';
import PaginatedList from '../../core/lists/PaginatedList';
import { useEffect, useState } from 'react';
import { DashboardProject } from '@/flexternships/constraints/types/dashboard-types';
import BoxSkeleton from '../../core/skeletons/BoxSkeleton';
import SimpleElevatedCard from '../../core/cards/SimpleElevatedCard';

import NoProjectFound from '@/flexternships/assets/gifs/search-placeholder.gif';

export default function ProjectsAccordion({
  status,
  defaultOpen,
}: {
  status: ProjectPrimaryStatus;
  defaultOpen?: boolean;
}) {
  const [totalProjectsCount, setTotalProjectsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const res = await getProjects(1, 10, status); // To get total projects count
      setTotalProjectsCount(res.metadata.totalRecords);
      setIsLoading(false);
    };
    fetchProjects();
  }, [status]);

  if (isLoading)
    return (
      <div className="flex flex-col gap-y-4">
        <BoxSkeleton className="h-20 w-full" />
      </div>
    );

  return (
    <Accordion type="single" defaultValue={defaultOpen ? 'item-1' : undefined} collapsible>
      <AccordionItem
        value="item-1"
        className="rounded-lg border-none bg-white shadow-card data-[state=open]:bg-trublue-light"
      >
        <AccordionTrigger className="py-4 px-6 hover:no-underline cursor-pointer">
          <div className="flex items-center gap-x-3">
            <span className="text-grey-heading text-lg font-medium">
              {status === ProjectPrimaryStatus.ON_GOING ? 'Current Project' : 'Past Projects'}
            </span>
            <span className="rounded-[17px] py-[1px] px-[9px] border-1 border-trublue text-trublue text-xs font-semibold leading-4.5">
              {totalProjectsCount}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <div className="px-6 pt-3 pb-6 flex flex-col gap-y-4">
            {totalProjectsCount === 0 ? (
              <SimpleElevatedCard className="flex flex-col items-center justify-center pt-3 pb-7 bg-white">
                <img src={NoProjectFound} alt="No project found" className="h-[200px] -mb-6" />
                <div className="text-base font-normal text-grey-500">No project(s) found</div>
              </SimpleElevatedCard>
            ) : (
              <PaginatedList
                className="flex flex-col gap-y-4"
                renderItem={(project: DashboardProject) => <ProjectCard project={project} />}
                loadMore={(page, pageSize) => getProjects(page, pageSize, status)}
                pageSize={10}
              />
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
