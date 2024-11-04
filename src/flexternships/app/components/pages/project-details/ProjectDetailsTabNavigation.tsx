import { ProjectTabType } from '@/flexternships/constraints/types/project-details-types';
import NavigationTab from './NavigationTab';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function ProjectDetailsTabNavigation({ tabs }: { tabs: ProjectTabType[] }) {

  const param = useParams();

  return (
    <div className="w-full">
      <div className=" bg-white  w-fit flex flex-row  items-start justify-start">
        {tabs.map((tab, index) => (
          <NavigationTab key={index} tab={tab} index={index} />
        ))}
      </div>
      <div className='px-5 py-2'>
        {tabs.map((tab) => {
          if (tab.id === param['projectStep']) {
            return tab.component;
          }
        })}
      </div>
    </div>
  );
}
