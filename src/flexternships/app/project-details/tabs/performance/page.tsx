import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard';
import LargeDropdown from '@/flexternships/app/components/core/form/LargeDropdown';
import { useProjectMilestonesStore } from '@/flexternships/stores/project-milestones-store';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IndividualFeedback from './IndividualFeedback';
import MilestoneFeedback from './MilestoneFeedback';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { UserType } from '@/flexternships/constraints/enums/core-enums';
import { FeedbackTypes } from '@/flexternships/constraints/enums/feedback-enums';

export default function PerformanceTab() {
  const { projectId, milestoneId } = useParams();

  const projectMilestones = useProjectMilestonesStore((state) => state.projectMilestones);
  const populateProjectMilestones = useProjectMilestonesStore((state) => state.populateProjectMilestones);

  const currentUserType = useFlexternUserStore((state) => state.userDetails?.userType);

  const [feedbackType, setFeedbackType] = useState(
    currentUserType === UserType.CLIENT ? FeedbackTypes.TEAM : FeedbackTypes.SELF,
  );
  const [milsetoneSelected, setMilestoneSelected] = useState(projectMilestones[0] || null);

  const getDefaultFeedbackType = () => {
    if (currentUserType === UserType.CLIENT) {
      return {
        displayText: 'Team',
        value: FeedbackTypes.TEAM,
      };
    } else {
      return {
        displayText: 'Self',
        value: FeedbackTypes.SELF,
      };
    }
  };

  const getFeedbackTypeOptions = () => {
    let options = [];
    if (currentUserType === UserType.CLIENT) {
      options = [
        {
          displayText: 'Team',
          value: FeedbackTypes.TEAM,
        },
        {
          displayText: 'Individual',
          value: FeedbackTypes.INDIVIDUAL,
        },
      ];
    } else {
      options = [
        {
          displayText: 'Self',
          value: FeedbackTypes.SELF,
        },
        {
          displayText: 'Peer',
          value: FeedbackTypes.PEER,
        },
      ];
    }

    return options;
  };

  const getFeedbackTypeForAPI = () => {
    const mapping: Record<string, string> = {
      team: 'MANAGER_TO_TEAM',
      self: 'SELF',
      individual: 'MANAGER_TO_PEER',
      peer: 'PEER_TO_PEER',
    };

    return mapping[feedbackType];
  };

  useEffect(() => {
    if (projectId && isEmpty(milestoneId)) {
      populateProjectMilestones(projectId);
    }
  }, [projectId]);

  const feedbackTypeDropdownData = {
    defaultSelected: getDefaultFeedbackType(),
    options: getFeedbackTypeOptions(),
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
      <SimpleElevatedCard className="p-6 rounded-[10px] bg-white">
        <div className="flex gap-10 my-1">
          <div className="flex gap-3">
            <div className="text-[20px] font-semibold text-[#394042] leading-[1.4] font-montserrat">
              Performance Feedback
            </div>
            <LargeDropdown {...feedbackTypeDropdownData} />
          </div>

          {(feedbackType === FeedbackTypes.PEER || feedbackType === FeedbackTypes.INDIVIDUAL) && (
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

      <div className="mt-7">
        {(feedbackType === FeedbackTypes.PEER || feedbackType === FeedbackTypes.INDIVIDUAL) && (
          <IndividualFeedback milestoneId={milsetoneSelected?.id} feedbackType={getFeedbackTypeForAPI()} />
        )}
        {(feedbackType === FeedbackTypes.SELF || feedbackType === FeedbackTypes.TEAM) && (
          <MilestoneFeedback feedbackType={getFeedbackTypeForAPI()} />
        )}
      </div>
    </div>
  );
}
