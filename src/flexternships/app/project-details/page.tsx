import { Box, Star, Users, Watch } from 'react-feather';
import ProjectDetailsTabNavigation from '../components/pages/project-details/ProjectDetailsTabNavigation';
import LeftSideBarProjectDetails from '../components/pages/project-details/LeftSideBarProjectDetails';
import { useEffect } from 'react';
import MilestoneTab from '../components/pages/project-details/tabs/milestone';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import BreadCrumbs from '../components/pages/project-details/BreadCrumbs';
import { Params, useParams } from 'react-router-dom';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import Spinner from '../components/core/Spinner';

// tabs
import ProjectsTab from './tabs/projects/page';

export default function FlexternshipProjectDetails() {
  const fetchUserDetails = useFlexternUserStore((state) => state.populateUserDetails);
  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);
  const projectDetails = useProjectsStore((state) => state.projectDetails);
  const projectLoading = useProjectsStore((state) => state.isProjectsLoading);
  const params: Readonly<Params<string>> = useParams();
  useEffect(() => {
    fetchUserDetails();
    if (params?.projectId) {
      getProjectDetails(params.projectId);
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
      {/* TODO: Breadcrumbs */}
      {/* TODO: Project Card */}

      {/* TODO: Tab Navigation Component (pass the tabs array as props along with the route where they should be rendered) */}
      {projectLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="w-20">
            <Spinner />
          </div>
        </div>
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
                title: params['*'] ? params['*'].charAt(0).toUpperCase() + params['*'].slice(1) : 'Unknown Tab',
                link: `/project-details/${params?.projectId}/${params['*']}`,
              },
            ]}
          />

          {/* <MilestoneTab /> */}
        </div>
      )}
      <div className=" w-full mt-5 flex flex-row items-start justify-start gap-5 max-w-screen">
        {!projectLoading ? <LeftSideBarProjectDetails data={projectDetails} /> : <div className="w-1/5"></div>}
        <div className="flex flex-col items-start gap-5 w-4/5">
          <ProjectDetailsTabNavigation tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
