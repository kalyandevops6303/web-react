import { Box, Star, Users, Watch } from 'react-feather';
import ProjectDetailsTabNavigation from '../components/pages/project-details/ProjectDetailsTabNavigation';
import LeftSideBarProjectDetails from '../components/pages/project-details/LeftSideBarProjectDetails';

export default function FlexternshipProjectDetails() {
  const tabs = [
    {
      id: 'team',
      title: 'Team',
      icon: <Users size={18} />,
      description: 'Team list & Permission',
      route: '/team',
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: <Box size={18} />,
      description: 'About work details',
      route: '/projects',
    },
    {
      id: 'milestone',
      title: 'Milestone',
      icon: <Watch size={18} />,
      description: 'Status & dispute',
      route: '/milestone',
    },
    {
      id: 'performance',
      title: 'Performance',
      icon: <Star size={18} />,
      description: 'Give & get ratings',
      route: '/performance',
    },
  ];

  return (
    <div className="flexternships-page p-6 flex flex-row items-start justify-start">
      {/* TODO: Breadcrumbs */}
      {/* TODO: Project Card */}
      {/* TODO: Tab Navigation Component (pass the tabs array as props along with the route where they should be rendered) */}
      <div className=" w-full flex flex-row items-start justify-start mt-20 gap-10">
        <LeftSideBarProjectDetails />
        <div className="flex flex-col items-start gap-5">
          <ProjectDetailsTabNavigation tabs={tabs} />
          <div>
            {/* Here all the tabs will be rendered based on the route and the tabs */}
          </div>
        </div>
      </div>
    </div>
  );
}
