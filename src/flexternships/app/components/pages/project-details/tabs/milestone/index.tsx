import MilestoneTile from './MilestoneTile';
import MilestoneDetails from './MilestoneDetails';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useProjectMilestonesStore } from '@/flexternships/stores/project-milestones-store';
import Spinner from '@/flexternships/app/components/core/Spinner';
import { useEffect } from 'react';

export default function MilestoneTab() {
  const isMilestonesLoading = useProjectMilestonesStore((state) => state.isMilestonesLoading);
  const projectMilestones = useProjectMilestonesStore((state) => state.projectMilestones);
  const populateProjectMilestones = useProjectMilestonesStore((state) => state.populateProjectMilestones);
  const { projectId, milestoneId } = useParams();

  useEffect(() => {
    if (projectId && isEmpty(milestoneId)) {
      populateProjectMilestones(projectId);
    }
  }, [projectId]);

  if (milestoneId) {
    return <MilestoneDetails />;
  }

  if (isMilestonesLoading) {
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

  return (
    <div className="flex flex-col gap-4 py-5">
      {/* TODO: MilestoneTile */}
      {projectMilestones.map((milestone) => (
        <MilestoneTile data={milestone} />
      ))}
      {/* <div>
        <MilestoneDetails />
      </div> */}
    </div>
  );
}
