// External dependencies
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// Types and enums
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { TeamMemberDetails } from '@/flexternships/constraints/types/project-details-types';
import { RecognitionTimeline } from '@/flexternships/constraints/types/recognition-types';
import { MilestoneDropdownOptions } from '@/flexternships/constraints/enums/miscellaneous-enums';

// Services and utils
import { parseTeamDetails } from '@/flexternships/utils/parsing-utils';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { fetchTeamDetails } from '@/flexternships/services/project-details';
import { getMilestonesDropdown, getRecognitionTimeline } from '@/flexternships/services/project-management-v2';

// Components
import SimpleElevatedCard from '../../../core/cards/SimpleElevatedCard';
import SelectTalentCard from './SelectTalentCard';
import ViewRecognitionManagerCard from './ViewRecognitionManagerCard';
import SingleSelectInput from '../../../core/form/SingleSelectInput';
import VerticalTimeline from './RecognitionVerticalTimeline';
import Spinner from '../../../core/Spinner';
import NoRecognitionFound from './NoRecognitionFound';
import { DEFAULT_ALL_MILESTONES_OPTION } from '@/flexternships/static/recognition-constants';

export default function ViewRecognitions() {
  const [talentsLoading, setTalentsLoading] = useState<boolean>(false);
  const [recognitionTimelineLoading, setRecognitionTimelineLoading] = useState<boolean>(false);

  const [teamDetails, setTeamDetails] = useState<TeamMemberDetails[]>([]);
  const [selectedTalentId, setSelectedTalentId] = useState<string | undefined>(undefined);
  const [recognitionTimeline, setRecognitionTimeline] = useState<RecognitionTimeline>([]);

  const { projectId } = useParams();

  const { control, watch } = useForm({
    defaultValues: {
      milestone: DEFAULT_ALL_MILESTONES_OPTION,
    },
  });

  useEffect(() => {
    if (!projectId) throw new Error('Project ID is required');
    const fetchTalents = async () => {
      setTalentsLoading(true);
      try {
        const teamData = await fetchTeamDetails(projectId);
        const formattedTeamDetails = parseTeamDetails(teamData, { includeOnlyJoined: true });

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
    const fetchRecognitionTimeline = async () => {
      setRecognitionTimelineLoading(true);
      try {
        const recognitionTimeline = await getRecognitionTimeline(projectId, selectedTalentId, watch('milestone')._id);
        setRecognitionTimeline(recognitionTimeline || []);
      } catch (error: unknown) {
        showToastMessage(
          ToastType.ERROR,
          error instanceof Error ? error.message : 'Failed to fetch recognition timeline. Please try again.',
        );
      } finally {
        setRecognitionTimelineLoading(false);
      }
    };
    fetchRecognitionTimeline();
  }, [selectedTalentId, projectId, watch('milestone')]);

  if (talentsLoading)
    return (
      <div className="py-10 flex justify-center items-center">
        <div className="size-10">
          <Spinner />
        </div>
      </div>
    );

  if (isEmpty(teamDetails)) return <NoRecognitionFound />;

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
          />
        ))}
      </div>
      <div className="grow">
        <SimpleElevatedCard className="flex flex-col gap-y-4 bg-white p-6">
          <div className="flex flex-col gap-y-4">
            <div className="text-lg font-medium leading-[26px] text-grey-700">Timeline</div>
            <div className="w-full max-w-[540px]">
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
          </div>
          {/* TODO: Add timeline */}
          <div className="flex flex-col gap-y-7">
            {/* <ViewRecognitionManagerCard />
            <ViewRecognitionManagerCard /> */}
            {/* <VerticalTimeline
              timelineItems={mockRecognitions.map((recognition) => ({
                component: <ViewRecognitionManagerCard {...recognition} />,
                color: 'orange',
              }))}
              spaceLeft={26}
              spaceBottom={28}
            /> */}
            {recognitionTimelineLoading ? (
              <div className="py-10 flex justify-center items-center">
                <div className="size-10">
                  <Spinner />
                </div>
              </div>
            ) : isEmpty(recognitionTimeline) ? (
              <NoRecognitionFound />
            ) : (
              <VerticalTimeline
                timelineItems={recognitionTimeline.map((recognition) => ({
                  component: <ViewRecognitionManagerCard {...recognition} />,
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
