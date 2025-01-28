import { Box, Star, Users, Watch } from 'react-feather';
import ProjectDetailsTabNavigation from '../components/pages/project-details/ProjectDetailsTabNavigation';

import { useEffect, useState } from 'react';
import MilestoneTab from '../components/pages/project-details/tabs/milestone';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import ProjectsTab from './tabs/projects/page';
import TeamTab from '../components/pages/project-details/tabs/team';
import PerformanceTab from './tabs/performance/page';
import { useProjectMilestonesStore } from '@/flexternships/stores/project-milestones-store';
import Spinner from '../components/core/Spinner';
import { ProjectSecondaryStatus } from '@/flexternships/constraints/enums/core-enums';
import { isEmpty } from 'lodash';
import CustomBreadCrumbs from '../components/core/CustomBreadCrumbs';
import LeftSideBarProjectDetails from '../components/pages/project-details/LeftSideBarProjectDetails';
export default function FlexternshipProjectDetails() {
  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);
  const projectDetailsLoading = useProjectsStore((state) => state.projectDetailsLoading);
  const milestoneDetails = useProjectMilestonesStore((state) => state.milestoneDetails);
  const projectDetails = useProjectsStore((state) => state.projectDetails);
  const projectLoading = useProjectsStore((state) => state.isProjectsLoading);

  const params: Readonly<Params<string>> = useParams();
  const navigate = useNavigate();
  const [breadCrumbData, setBreadCrumbData] = useState<{
    projectName: string;
    projectStep: string;
    milestoneName: string;
  }>({
    projectName: '',
    projectStep: '',
    milestoneName: '',
  });
  const redirectUserAsPerSecondaryStatus = (status: ProjectSecondaryStatus, isDocumentsNeeded: boolean) => {
    if (!isEmpty(params.milestoneId)) return;
    if (!params?.projectId) throw new Error('Project ID is mandatory to view the project details');
    switch (status) {
      case ProjectSecondaryStatus.MILESTONE:
        navigate(`/project-details/${params.projectId}/milestone`);
        break;
      case ProjectSecondaryStatus.SIGN_CONTRACT:
        if (!isDocumentsNeeded) return;
        navigate(`/project-details/${params.projectId}/doc/contract`);
        break;
      case ProjectSecondaryStatus.SIGN_NDA:
        if (!isDocumentsNeeded) return;
        navigate(`/project-details/${params.projectId}/doc/nda`);
        break;
      case ProjectSecondaryStatus.SIGN_DOCUMENTS:
        navigate(`/project-details/${params.projectId}/projects`);
        break;
      default:
        navigate(`/project-details/${params.projectId}/team`);
        break;
    }
  };

  useEffect(() => {
    const populateProjectDetails = async () => {
      if (!params.projectId) throw new Error('Project ID is mandatory to view the project details');
      if (projectDetails.id !== params.projectId) {
        await getProjectDetails(params.projectId, redirectUserAsPerSecondaryStatus);
      }
    };
    populateProjectDetails();
  }, [params.projectId, projectDetails.id]);

  const tabs = [
    {
      id: 'team',
      title: 'Team',
      icon: <Users size={18} />,
      description: 'Team list & Permission',
      route: '/team',
      component: <TeamTab />,
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
      component: <PerformanceTab />,
      talentVisible: true,
      clientVisible: true,
    },
  ];
  const getCapitalizedStep = (step: string) => step.charAt(0).toUpperCase() + step.slice(1);

  useEffect(() => {
    if (params.projectStep) {
      setBreadCrumbData((prev) => ({
        ...prev,
        projectStep: params['projectStep']
          ? getCapitalizedStep(params['projectStep'])
          : getCapitalizedStep(location.pathname.split('/')[3]),
      }));
    }
    if (projectDetails?.details?.name) {
      setBreadCrumbData((prev) => ({ ...prev, projectName: projectDetails?.details?.name }));
    }
    if (params?.milestoneId) {
      setBreadCrumbData((prev) => ({ ...prev, projectStep: 'Milestone', milestoneName: milestoneDetails?.name }));
    }
  }, [params.projectStep, params?.milestoneId, projectDetails]);
  const breadCrumbs = [
    {
      label: 'Projects',
      href: '/projects/ongoing',
    },
    {
      label: projectDetails?.details?.name ?? 'Unknown Project',
      href: `/project-details/${params?.projectId}/milestone`,
    },
    {
      label: breadCrumbData?.projectStep ?? null,
      href: `/project-details/${params?.projectId}/${location.pathname.split('/')[3]}`,
    },
    ...(params['milestoneId']
      ? [
          {
            label: breadCrumbData?.milestoneName ?? null,
            href: `/project-details/${params?.projectId}/${breadCrumbData?.projectStep}/${params['milestoneId']}`,
          },
        ]
      : []),
  ];
  return (
    <div className="flexternships-page">
      {projectLoading ? (
        <div className="h-5"></div>
      ) : (
        <div className="flex flex-col items-start gap-5">
          <CustomBreadCrumbs items={breadCrumbs} startWithHome={false} />
        </div>
      )}
      {projectDetailsLoading ? (
        <div className="w-full h-full min-h-[60vh] flex justify-center items-center mx-auto">
          <Spinner />
        </div>
      ) : (
        <div className="w-full mt-5 flex flex-row items-start justify-start gap-5">
          {!projectLoading ? <LeftSideBarProjectDetails /> : <div className="w-full md:w-[350px] h-fit"></div>}
          <div className="flex flex-col w-[calc(100%-370px)] items-start gap-5">
            <ProjectDetailsTabNavigation tabs={tabs} />
          </div>
        </div>
      )}
    </div>
  );
}
