import { Box, Star, Users, Watch } from 'react-feather';
import ProjectDetailsTabNavigation from '../components/pages/project-details/ProjectDetailsTabNavigation';
import LeftSideBarProjectDetails from '../components/pages/project-details/LeftSideBarProjectDetails';
import { useEffect } from 'react';
import MilestoneTab from '../components/pages/project-details/tabs/milestone';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import BreadCrumbs from '../components/pages/project-details/BreadCrumbs';
import { Params, useParams } from 'react-router-dom';

export default function FlexternshipProjectDetails() {
  const fetchUserDetails = useFlexternUserStore((state) => state.populateUserDetails);
  const params: Readonly<Params<string>> = useParams();
  console.log(params);
  useEffect(() => {
    fetchUserDetails();
  }, []);
  const tabs = [
    {
      id: 'team',
      title: 'Team',
      icon: <Users size={18} />,
      description: 'Team list & Permission',
      route: '/team',
      component: <div>Team</div>,
      talentVisible: true,
      clientVisible: true,
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: <Box size={18} />,
      description: 'About work details',
      route: '/projects',
      component: <div>Projects</div>,
      talentVisible: true,
      clientVisible: false,
    },
    {
      id: 'milestone',
      title: 'Milestone',
      icon: <Watch size={18} />,
      description: 'Status & dispute',
      route: '/milestone',
      component: <MilestoneTab />,
      talentVisible: true,
      clientVisible: true,
    },
    {
      id: 'performance',
      title: 'Performance',
      icon: <Star size={18} />,
      description: 'Give & get ratings',
      route: '/performance',
      component: <div>Performance</div>,
      talentVisible: true,
      clientVisible: true,
    },
  ];

  return (
    <div className="flexternships-page  flex flex-row items-start justify-start">
      {/* TODO: Breadcrumbs */}
      {/* TODO: Project Card */}

      {/* TODO: Tab Navigation Component (pass the tabs array as props along with the route where they should be rendered) */}
      <div className="flex flex-col items-start gap-5">
        <BreadCrumbs
          steps={[
            {
              title: 'Projects',
              link: '/projects/ongoing',
            },
            {
              title: params?.projectId ?? 'Unknown Project',
              link: `/project-details/${params?.projectId}/team`,
            },
            {
              title: params['*'] ? params['*'].charAt(0).toUpperCase() + params['*'].slice(1) : 'Unknown Tab',
              link: `/project-details/${params?.projectId}/${params['*']}`,
            },
          ]}
        />
        <div className=" w-full flex flex-row items-start flex-wrap justify-start gap-5">
          <LeftSideBarProjectDetails />
          <div className="flex flex-col items-start gap-5">
            <ProjectDetailsTabNavigation tabs={tabs} />
          </div>
        </div>
        <div className="h-10"></div>
        {/* <MilestoneTab /> */}
      </div>
    </div>
  );
}
