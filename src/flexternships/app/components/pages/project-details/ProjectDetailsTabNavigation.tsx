import { ProjectTabType } from '@/flexternships/constraints/types/project-details-types';
import NavigationTab from './NavigationTab';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';

export default function ProjectDetailsTabNavigation({ tabs }: { tabs: ProjectTabType[] }) {
  const param = useParams();
  const milestoneId = param['milestoneId'];
  const projectStep = milestoneId ? 'milestone' : param['projectStep'];

  return (
    <div className="w-full">
      <div className=" bg-white w-fit flex flex-row items-start justify-start gap-1 max-w-5xl">
        {tabs.map((tab, index) => isEmpty(milestoneId) && <NavigationTab key={index} tab={tab} index={index} />)}
      </div>
      <div>{tabs.map((tab) => tab.id === projectStep && tab.component)}</div>
    </div>
  );
}
