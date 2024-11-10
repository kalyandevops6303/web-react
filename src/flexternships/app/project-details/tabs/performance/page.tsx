import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import LargeDropdown from '@/flexternships/app/components/core/form/LargeDropdown';
import { useProjectMilestonesStore } from '@/flexternships/stores/project-milestones-store';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IndividualFeedback from './IndividualFeedback';
import MilestoneFeedback from './MilestoneFeedback';

export default function PerformanceTab() {
  const { projectId, milestoneId } = useParams();

  const isMilestonesLoading = useProjectMilestonesStore((state) => state.isMilestonesLoading);
  const projectMilestones = useProjectMilestonesStore((state) => state.projectMilestones);
  const populateProjectMilestones = useProjectMilestonesStore((state) => state.populateProjectMilestones);

  const [feedbackType, setFeedbackType] = useState('self');
  const [milsetoneSelected, setMilestoneSelected] = useState(projectMilestones[0] || null);

  useEffect(() => {
    if (projectId && isEmpty(milestoneId)) {
      populateProjectMilestones(projectId);
    }
  }, [projectId]);

  // useEffect(() => {
  //     console.log(projectMilestones);
  // }, [projectMilestones])

  const feedbackTypeDropdownData = {
    defaultSelected: {
      displayText: 'Self',
      value: 'self',
    },
    options: [
      {
        displayText: 'Self',
        value: 'self',
      },
      {
        displayText: 'Peer',
        value: 'peer',
      },
    ],
    onChange: (selected: any) => {
      setFeedbackType(selected);
    },
  };

  const milestoneDropdownData = {
    defaultSelected: {
      displayText: 'M #1',
      value: projectMilestones[0],
    },
    options: projectMilestones?.map((milestone, index) => {
      return {
        displayText: `M #${index + 1}`,
        value: milestone,
      };
    }),
    onChange: (selected: any) => {
      setMilestoneSelected(selected);
    },
  };

  return (
    <div className="py-6">
      <SimpleElevatedCard className="p-6 rounded-[10px]">
        <div className="flex gap-10 my-1">
          <div className="flex gap-3">
            <div className="text-[20px] font-semibold text-[#394042] leading-[1.4] font-montserrat">
              Performance Feedback
            </div>
            <LargeDropdown {...feedbackTypeDropdownData} />
          </div>

          {feedbackType === 'peer' && (
            <div className="flex gap-3">
              <div className="text-[20px] font-semibold text-[#394042] leading-[1.4] font-montserrat">
                Select Milestone
              </div>
              <LargeDropdown {...milestoneDropdownData} />
            </div>
          )}
        </div>
        <div className="text-[14px] leading-[22px] font-[400] font-[Montserrat] text-[#9E9E9E]">
          Assess team/talent performance with this simple feedback to get analytics and comparison.
        </div>
      </SimpleElevatedCard>

      <div className="mt-10">
        {feedbackType === 'peer' && <IndividualFeedback milestoneId={milsetoneSelected?.id} />}
        {feedbackType === 'self' && <MilestoneFeedback />}
      </div>
    </div>
  );
}
