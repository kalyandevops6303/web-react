// React and hooks
import { useEffect, useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';

// Form validation
import { yupResolver } from '@hookform/resolvers/yup';
import { GiveRecognitionSchema } from '@/flexternships/schemas/recognition-schemas';

// Types and enums
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { GiveRecognitionForm } from '@/flexternships/constraints/types/recognition-types';

// UI Components
import SimpleElevatedCard from '../../../core/cards/SimpleElevatedCard';
import GiveRecognitionTalentCard from './GiveRecognitionTalentCard';
import PrimaryButton from '../../../core/buttons/PrimaryButton';
import SingleSelectInput from '../../../core/form/SingleSelectInput';

// Utils and data
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { mockMilestones, mockUsers } from '@/flexternships/mocks/recognition-data';
import Spinner from '../../../core/Spinner';
import { fetchTeamDetails } from '@/flexternships/services/project-details';
import { useParams } from 'react-router-dom';
import { parseTeamDetails } from '@/flexternships/utils/parsing-utils';
import { TeamMemberDetails } from '@/flexternships/constraints/types/project-details-types';
import { isEmpty } from 'lodash';

export default function GiveRecognition() {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [talentsLoading, setTalentsLoading] = useState<boolean>(true);
  const [teamDetails, setTeamDetails] = useState<TeamMemberDetails[]>([]);

  const { projectId } = useParams();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<GiveRecognitionForm>({
    mode: 'onChange',
    // TODO: Get milestone from backend
    defaultValues: {
      milestone: {
        _id: '678624c4c1710c836b863a07',
        name: 'Milestone 1',
      },
      selectedTalents: [],
    },
    resolver: yupResolver(GiveRecognitionSchema),
  });

  const { append, remove } = useFieldArray({
    control,
    name: 'selectedTalents',
  });

  const selectedTalents = watch('selectedTalents');

  const handleToggle = (talentId: string) => {
    const talentIndex = selectedTalents.findIndex((talent) => talent.talentId === talentId);
    if (talentIndex === -1) {
      append({ talentId, competencies: [], message: '' });
    } else {
      remove(talentIndex);
    }
  };

  const onSubmit = async (data: GiveRecognitionForm) => {
    setIsSubmitLoading(true);
    try {
      // TODO: Submit recognition
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToastMessage(ToastType.ERROR, error.message);
      } else {
        showToastMessage(ToastType.ERROR, 'Failed to submit recognition. Please try again.');
      }
    }
    setIsSubmitLoading(false);
  };

  useEffect(() => {
    if (!projectId) throw new Error('Project ID is required');
    const fetchTalents = async () => {
      setTalentsLoading(true);
      try {
        const teamData = await fetchTeamDetails(projectId);
        const formattedTeamDetails = parseTeamDetails(teamData, { includeOnlyJoined: true });
        setTeamDetails(formattedTeamDetails);
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
  }, []);

  if (talentsLoading)
    return (
      <SimpleElevatedCard className="bg-white p-6 flex flex-col gap-y-5">
        <div className="py-10 flex justify-center items-center">
          <div className="size-10">
            <Spinner />
          </div>
        </div>
      </SimpleElevatedCard>
    );

  return (
    <SimpleElevatedCard className="bg-white p-6 flex flex-col gap-y-5">
      {isEmpty(teamDetails) ? (
        <div className="py-10 flex justify-center items-center">No team members found.</div>
      ) : (
        <>
          <div className="flex flex-col gap-y-2 items-start">
            <div className="text-base text-grey-600 font-medium leading-6">
              Do you see impressive work or contribution from team member(s)? Recognize with a WOW!
            </div>
            <div className="w-full max-w-[540px]">
              <Controller
                name="milestone"
                control={control}
                render={() => (
                  <SingleSelectInput
                    name="milestone"
                    control={control}
                    label="Milestone"
                    error={errors.milestone?.message}
                    loadOptions={async () => mockMilestones}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="text-grey-300 text-xs font-semibold leading-5 text-uppercase">
              Selected {selectedTalents.length}/{mockUsers.length}
            </div>
            <div className="flex flex-col gap-y-5">
              {mockUsers.map((joinedTalent) => (
                <GiveRecognitionTalentCard
                  key={joinedTalent.id}
                  selected={selectedTalents.some((selectedTalent) => selectedTalent.talentId === joinedTalent.id)}
                  talentInfo={joinedTalent}
                  control={control}
                  onToggle={() => handleToggle(joinedTalent.id)}
                />
              ))}
            </div>
          </div>
          <div>
            <PrimaryButton
              className="m-0"
              onClick={handleSubmit(onSubmit)}
              loading={isSubmitLoading}
              disabled={!isValid}
            >
              Submit
            </PrimaryButton>
          </div>
        </>
      )}
    </SimpleElevatedCard>
  );
}
