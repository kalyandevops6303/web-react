// React and hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// UI Components
import SimpleElevatedCard from '../../../core/cards/SimpleElevatedCard';
import SelectTalentCard from './SelectTalentCard';
import ViewRecognitionManagerCard from './ViewRecognitionManagerCard';
import SingleSelectInput from '../../../core/form/SingleSelectInput';

// Data
import { mockUsers, mockMilestones, mockRecognitions } from '@/flexternships/mocks/recognition-data';
import VerticalTimeline from './RecognitionVerticalTimeline';

export default function ViewRecognitions() {
  const [selectedTalentId, setSelectedTalentId] = useState<string | undefined>(undefined);

  const { control } = useForm({
    defaultValues: {
      // TODO: Get milestone from backend
      milestone: {
        _id: 'all_milestones',
        name: 'All Milestones',
      },
    },
  });

  return (
    <div className="flex flex-row gap-x-6">
      <div className="flex flex-col gap-y-3">
        {mockUsers.map((joinedTalent) => (
          <SelectTalentCard
            talentInfo={joinedTalent}
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
                loadOptions={async () => mockMilestones}
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
            <VerticalTimeline
              timelineItems={mockRecognitions.map((recognition) => ({
                component: <ViewRecognitionManagerCard {...recognition} />,
                color: '#FF9F43',
              }))}
              spaceLeft={36}
              spaceBottom={28}
            />
          </div>
        </SimpleElevatedCard>
      </div>
    </div>
  );
}
