'use client';
import Styles from '@flexternships/styles/pages/project-details/projects-tab/tab-content.module.css';
import SimpleElevatedCard from '../../../components/core/cards/SimpleElevatedCard';
import VerticalTimeline from '../../../components/core/timelines/VerticalTimeline';
import InvitationCard from './InvitationCard';
import DocumentCard from './DocumentCard';
import { useParams } from 'react-router-dom';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton';
import { useState } from 'react';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { ProjectSecondaryStatus, ToastType } from '@/flexternships/constraints/enums/core-enums';
import { acceptProject } from '@/flexternships/services/project-management-v2';

export default function ProjectsTab() {
  const isDocumentsNeededForThisProject = useProjectsStore((state) => state.projectDetails.isDocumentsNeeded);
  const secondaryStatusOfThisProject = useProjectsStore((state) => state.projectDetails.secondaryStatus.next);
  const getProjectDetails = useProjectsStore((state) => state.getProjectDetails);

  const [isAcceptingProject, setIsAcceptingProject] = useState(false);

  const params = useParams();

  console.log(isDocumentsNeededForThisProject);

  const ndaCardData = {
    title: 'NDA',
    subtitle: 'STEP 2',
    link: {
      text: '',
      href: `/project-details/${params?.projectId}/doc/nda`,
    },
  };

  const contractCardData = {
    title: 'Contract',
    subtitle: 'STEP 3',
    link: {
      text: '',
      href: `/project-details/${params?.projectId}/doc/contract`,
    },
  };

  const documentItems = [
    {
      component: <DocumentCard {...ndaCardData} />,
      color: '#FF9F43',
    },
    {
      component: <DocumentCard {...contractCardData} />,
      color: '#FF9F43',
    },
  ];

  const timelineItems = [
    {
      component: <InvitationCard hideSubtitle={!isDocumentsNeededForThisProject} />,
      color: '#651FFF',
    },
    ...(isDocumentsNeededForThisProject ? documentItems : []),
  ];

  const handleAcceptProject = async () => {
    if (!params.projectId) throw new Error('Need project ID to accept');
    if (isDocumentsNeededForThisProject) throw new Error("You can't accept this project");

    setIsAcceptingProject(true);
    try {
      // Accept the project
      await acceptProject(params.projectId);
      // Refresh project details to get the updated status
      await getProjectDetails(params.projectId);
    } catch (error: unknown) {
      showToastMessage(
        ToastType.ERROR,
        error instanceof Error ? error.message : 'An unexpected error occurred while accepting project',
      );
    } finally {
      setIsAcceptingProject(false);
    }
  };

  const isProjectAcceptancePending = [
    ProjectSecondaryStatus.SIGN_CONTRACT,
    ProjectSecondaryStatus.SIGN_NDA,
    ProjectSecondaryStatus.SIGN_DOCUMENTS,
  ].includes(secondaryStatusOfThisProject);

  return (
    <div className="py-6 max-w-5xl">
      <SimpleElevatedCard className={Styles.tabContent}>
        <div className={Styles.tabContentHeader}>Project Invitation</div>
        <div className={`${Styles.tabContentBody} ${!isDocumentsNeededForThisProject ? 'gap-y-5' : ''}`}>
          <VerticalTimeline timelineItems={timelineItems} hideLine={!isDocumentsNeededForThisProject} />
          {!isDocumentsNeededForThisProject && isProjectAcceptancePending && (
            <div className="w-full flex justify-end">
              <PrimaryButton className="my-0" onClick={handleAcceptProject} loading={isAcceptingProject}>
                Accept Project
              </PrimaryButton>
            </div>
          )}
        </div>
      </SimpleElevatedCard>
    </div>
  );
}
