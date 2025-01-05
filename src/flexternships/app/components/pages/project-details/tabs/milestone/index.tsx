import MilestoneDetails from './MilestoneDetails';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useProjectMilestonesStore } from '@/flexternships/stores/project-milestones-store';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { useEffect } from 'react';
import { useProjectsStore } from '@/flexternships/stores/project-details-store';
import DefaultMilestonesView from './DefaultMilestonesView';
import RestrictedMilestonesView from './RestrictedMilestonesView';
import { ProjectPrimaryStatus, ProjectSecondaryStatus, UserType } from '@/flexternships/constraints/enums/core-enums';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';

export default function MilestoneTab() {
  const isMilestonesLoading = useProjectMilestonesStore((state) => state.isMilestonesLoading);
  const isProjectDetailsLoading = useProjectsStore((state) => state.isProjectsLoading);
  const projectMilestones = useProjectMilestonesStore((state) => state.projectMilestones);
  const projectDetails = useProjectsStore((state) => state.projectDetails);
  const populateProjectMilestones = useProjectMilestonesStore((state) => state.populateProjectMilestones);

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const { projectId, milestoneId } = useParams();

  useEffect(() => {
    if (projectId && isEmpty(milestoneId)) {
      populateProjectMilestones(projectId);
    }
  }, [projectId]);

  if (milestoneId) {
    return <MilestoneDetails />;
  }

  if (isMilestonesLoading || isProjectDetailsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48">
        <div className="h-8 w-8">
          <Spinner />
        </div>
      </div>
    );
  }

  if (isEmpty(projectMilestones)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-48">
        <div className="text-grey-heading text-base font-medium">No milestones found</div>
      </div>
    );
  }

  const allDocumentsSigned =
    ![ProjectPrimaryStatus.OPEN, ProjectPrimaryStatus.ACTIVE].includes(projectDetails.status) ||
    (projectDetails.status === ProjectPrimaryStatus.ACTIVE &&
      projectDetails.secondaryStatus.next === ProjectSecondaryStatus.MILESTONE);

  const projectDetailsForRestrictedView = {
    projectId: projectDetails.id,
    nextStep: projectDetails.secondaryStatus.next,
    startDate: projectDetails.details.expectedStartDate,
    role: projectDetails.invitationDetails.member.role.name,
    estimatedDuration: projectDetails.details.expectedDuration.duration,
    hoursPerWeek: projectDetails.details.expectedDuration.hoursPerWeek,
    isDocumentsNeeded: projectDetails.isDocumentsNeeded,
  };

  return (
    <div className="flex flex-col gap-4 py-5 max-w-5xl">
      {allDocumentsSigned || userDetails.userType === UserType.CLIENT ? (
        <DefaultMilestonesView milestones={projectMilestones} />
      ) : (
        <RestrictedMilestonesView projectDetails={projectDetailsForRestrictedView} milestones={projectMilestones} />
      )}
    </div>
  );
}
