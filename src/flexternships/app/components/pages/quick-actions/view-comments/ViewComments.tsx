// External dependencies
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

// Components
import NoCommentsFound from './NoCommentsFound';
import SelectTalentCard from './SelectTalentCard';
import SimpleElevatedCard from '../../../core/cards/SimpleElevatedCard';
import SingleSelectInput from '../../../core/form/SingleSelectInput';
import Spinner from '../../../core/Spinner';
import VerticalTimeline from './CommentsVerticalTimeline';
import ViewCommentsManagerCard from './ViewCommentsManagerCard';

// Constants
import {
  DEFAULT_ALL_MILESTONES_OPTION,
  DEFAULT_ALL_NOTE_CATEGORIES_OPTION,
} from '@/flexternships/static/constants/quick-actions-constants';

// Services and utils
import { fetchTeamDetails } from '@/flexternships/services/project-details';
import { getMilestonesDropdown, getRecognitionTimeline } from '@/flexternships/services/project-management-v2';
import { parseTeamDetails } from '@/flexternships/utils/parsing-utils';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';

// Types and enums
import { CommentsTimeline } from '@/flexternships/constraints/types/quick-actions-types';
import { MilestoneDropdownOptions } from '@/flexternships/constraints/enums/miscellaneous-enums';
import { QuickActionCategory } from '@/flexternships/constraints/enums/quick-actions-enums';
import { TeamMemberDetails } from '@/flexternships/constraints/types/project-details-types';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';

export default function ViewComments({ category = QuickActionCategory.RECOGNITION }: ViewCommentsProps) {
  const [talentsLoading, setTalentsLoading] = useState<boolean>(false);
  const [commentsTimelineLoading, setCommentsTimelineLoading] = useState<boolean>(false);

  const [teamDetails, setTeamDetails] = useState<TeamMemberDetails[]>([]);
  const [selectedTalentId, setSelectedTalentId] = useState<string | undefined>(undefined);
  const [commentsTimeline, setCommentsTimeline] = useState<CommentsTimeline>([]);

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const { projectId } = useParams();

  const { control, watch } = useForm({
    defaultValues: {
      milestone: DEFAULT_ALL_MILESTONES_OPTION,
      noteCategory: DEFAULT_ALL_NOTE_CATEGORIES_OPTION,
    },
  });

  useEffect(() => {
    if (!projectId) throw new Error('Project ID is required');
    const fetchTalents = async () => {
      setTalentsLoading(true);
      try {
        const teamData = await fetchTeamDetails(projectId);
        const formattedTeamDetails = parseTeamDetails(teamData, {
          includeOnlyJoined: true,
          hideUserIds: [userDetails.id],
        });

        setTeamDetails(formattedTeamDetails);
        if (!isEmpty(formattedTeamDetails)) setSelectedTalentId(formattedTeamDetails[0].id);
      } catch (error: unknown) {
        showToastMessage(
          ToastType.ERROR,
          error instanceof Error ? error.message : 'Failed to fetch team details. Please try again.',
        );
      } finally {
        setTalentsLoading(false);
      }
    };
    fetchTalents();
  }, [projectId]);

  useEffect(() => {
    if (!projectId) throw new Error('Project ID is required');
    if (!selectedTalentId) return;
    const fetchCommentsTimeline = async () => {
      setCommentsTimelineLoading(true);
      try {
        const commentsTimeline = await getRecognitionTimeline(
          projectId,
          selectedTalentId,
          category,
          watch('milestone')._id,
        );
        setCommentsTimeline(commentsTimeline || []);
      } catch (error: unknown) {
        showToastMessage(
          ToastType.ERROR,
          error instanceof Error ? error.message : 'Failed to fetch recognition timeline. Please try again.',
        );
      } finally {
        setCommentsTimelineLoading(false);
      }
    };
    fetchCommentsTimeline();
  }, [selectedTalentId, projectId, watch('milestone')]);

  if (talentsLoading)
    return (
      <div className="py-10 flex justify-center items-center">
        <div className="size-10">
          <Spinner />
        </div>
      </div>
    );

  if (isEmpty(teamDetails)) return <NoCommentsFound category={category} />;

  if (!projectId) throw new Error('Project ID is required');

  return (
    <div className="flex flex-row gap-x-6">
      <div className="flex flex-col gap-y-3">
        {teamDetails.map((joinedTalent) => (
          <SelectTalentCard
            talentInfo={{
              ...joinedTalent,
              name: joinedTalent.name || 'Unknown Name',
              designation: joinedTalent.designation || 'Unknown Designation',
            }}
            onClick={() => setSelectedTalentId(joinedTalent.id)}
            key={joinedTalent.id}
            selected={joinedTalent.id === selectedTalentId}
            category={category}
          />
        ))}
      </div>
      <div className="grow">
        <SimpleElevatedCard className="flex flex-col gap-y-4 bg-white p-6">
          <div className="flex flex-col gap-y-4">
            <div className="text-lg font-medium leading-[26px] text-grey-700">Timeline</div>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
              <div
                className={classNames('w-full', {
                  'max-w-[540px]': category === QuickActionCategory.RECOGNITION,
                  'max-w-[460px]': category === QuickActionCategory.NOTE,
                })}
              >
                <SingleSelectInput
                  name="milestone"
                  control={control}
                  label="Milestone"
                  loadOptions={() =>
                    getMilestonesDropdown(projectId, MilestoneDropdownOptions.VIEW_RECOGNITION, { useSequence: true })
                  }
                  defaultFirstOption
                  allowSelectionOfEmptyValue
                />
              </div>
              {category === QuickActionCategory.NOTE && (
                <div className="w-full max-w-[200px]">
                  <SingleSelectInput
                    name="noteCategory"
                    control={control}
                    label="Type"
                    // TODO: Add note categories
                    loadOptions={async () => ({
                      metadata: { has_next_page: false, current_page: 1, page_size: 10, total_records: 10 },
                      data: [{ name: 'All', _id: '' }],
                    })}
                    defaultFirstOption
                    allowSelectionOfEmptyValue
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-7">
            {commentsTimelineLoading ? (
              <div className="py-10 flex justify-center items-center">
                <div className="size-10">
                  <Spinner />
                </div>
              </div>
            ) : isEmpty(commentsTimeline) ? (
              <NoCommentsFound category={category} />
            ) : (
              <VerticalTimeline
                timelineItems={commentsTimeline.map((comment) => ({
                  component: <ViewCommentsManagerCard {...comment} />,
                  color: '#FF9F43',
                }))}
                spaceLeft={36}
                spaceBottom={28}
              />
            )}
          </div>
        </SimpleElevatedCard>
      </div>
    </div>
  );
}

type ViewCommentsProps = {
  category?: QuickActionCategory;
};
