import { Box, Star, Users, Watch } from 'react-feather';
import ProjectDetailsTabNavigation from '../components/pages/project-details/ProjectDetailsTabNavigation';
import LeftSideBarProjectDetails from '../components/pages/project-details/LeftSideBarProjectDetails';
import { useEffect } from 'react';
import MilestoneTab from '../components/pages/project-details/tabs/milestone';
import BreadCrumbs from '../components/pages/project-details/BreadCrumbs';
import { Params, useParams } from 'react-router-dom';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import ProjectsTab from './tabs/projects/page';

export default function FlexternshipProjectDetails() {
  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);
  const projectDetails = useProjectsStore((state) => state.projectDetails);
  const projectLoading = useProjectsStore((state) => state.isProjectsLoading);
  const params: Readonly<Params<string>> = useParams();

  useEffect(() => {
    if (params?.projectId) {
      getProjectDetails(params?.projectId);
    }
  }, [params]);

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
      component: <ProjectsTab />,
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
    <div className="flexternships-page">
      {
        projectLoading ? (
          <div className='h-5'></div>
        ) : (
          <div className="flex flex-col items-start gap-5">
            <BreadCrumbs
              steps={[
                {
                  title: 'Projects',
                  link: '/projects/ongoing',
                },
                {
                  title: projectDetails?.details?.name ?? 'Unknown Project',
                  link: `/project-details/${params?.projectId}/team`,
                },
                {
                  title: params['projectStep']
                    ? params['projectStep'].charAt(0).toUpperCase() + params['projectStep'].slice(1)
                    : 'Unknown Tab',
                  link: `/project-details/${params?.projectId}/${params['projectStep']}`,
                },
              ]}
            />
          </div>
        )}
      <div className=" w-full mt-5 flex flex-row items-start flex-wrap md:flex-nowrap justify-start gap-5">
        {!projectLoading ? <LeftSideBarProjectDetails /> : <div className="w-full md:w-[350px] h-fit"></div>}
        <div className="flex flex-col flex-grow items-start gap-5">
          <ProjectDetailsTabNavigation tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
