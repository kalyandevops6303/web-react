import { ProjectPrimaryStatus } from '@/flexternships/constraints/enums/core-enums';
import ProjectsAccordion from './ProjectsAccordion';

export default function ProjectSection() {
  return (
    <div className="flex flex-col gap-y-6">
      <ProjectsAccordion defaultOpen status={ProjectPrimaryStatus.ON_GOING} />
      <ProjectsAccordion status={ProjectPrimaryStatus.COMPLETED} />
    </div>
  );
}
