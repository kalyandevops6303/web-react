// External dependencies
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Types and schemas
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { GiveRecognitionForm } from '@/flexternships/constraints/types/recognition-types';
import { TeamMemberDetails } from '@/flexternships/constraints/types/project-details-types';
import { MilestoneDropdownOptions } from '@/flexternships/constraints/enums/miscellaneous-enums';
import { GiveRecognitionSchema } from '@/flexternships/schemas/recognition-schemas';

// Services and stores
import { fetchTeamDetails } from '@/flexternships/services/project-details';
import { getMilestonesDropdown, submitRecognition } from '@/flexternships/services/project-management-v2';
import { useCompetenciesStore } from '@/flexternships/stores/competencies-store';

// Utils
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { parseTeamDetails } from '@/flexternships/utils/parsing-utils';

// Components
import SimpleElevatedCard from '../../../core/cards/SimpleElevatedCard';
import GiveRecognitionTalentCard from './GiveRecognitionTalentCard';
import PrimaryButton from '../../../core/buttons/PrimaryButton';
import SingleSelectInput from '../../../core/form/SingleSelectInput';
import Spinner from '../../../core/Spinner';

const defaultValues = {
  milestone: undefined,
  selectedTalents: [],
};

export default function GiveRecognition({ refreshStats }: { refreshStats?: () => void }) {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [talentsLoading, setTalentsLoading] = useState<boolean>(true);
  const [teamDetails, setTeamDetails] = useState<TeamMemberDetails[]>([]);

  const populateCompetencies = useCompetenciesStore((state) => state.populateCompetencies);
  const isCompetenciesLoading = useCompetenciesStore((state) => state.isCompetenciesLoading);

  const { projectId } = useParams();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<GiveRecognitionForm>({
    mode: 'onChange',
    defaultValues,
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
      append({ talentId, competencies: [], comment: '' });
    } else {
      remove(talentIndex);
    }
  };

  const onSubmit = async (data: GiveRecognitionForm) => {
    if (!projectId) throw new Error('Project ID is required');
    setIsSubmitLoading(true);
    try {
      // TODO: Submit recognition and show a modal
      const response = await submitRecognition(projectId, data.milestone._id, data.selectedTalents);
      refreshStats?.();
      showToastMessage(ToastType.SUCCESS, response.message);
      reset(defaultValues);
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
    populateCompetencies();
  }, []);

  if (talentsLoading || isCompetenciesLoading)
    return (
      <SimpleElevatedCard className="bg-white p-6 flex flex-col gap-y-5">
        <div className="py-10 flex justify-center items-center">
          <div className="size-10">
            <Spinner />
          </div>
        </div>
      </SimpleElevatedCard>
    );

  if (!projectId) throw new Error('Project ID is required');

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
                    loadOptions={() =>
                      getMilestonesDropdown(projectId, MilestoneDropdownOptions.GIVE_RECOGNITION, { useSequence: true })
                    }
                    defaultFirstOption
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="text-grey-300 text-xs font-semibold leading-5 text-uppercase">
              Selected {selectedTalents.length}/{teamDetails.length}
            </div>
            <div className="flex flex-col gap-y-5">
              {teamDetails.map((joinedTalent: TeamMemberDetails) => (
                <GiveRecognitionTalentCard
                  key={joinedTalent.id}
                  selected={selectedTalents.some((selectedTalent) => selectedTalent.talentId === joinedTalent.id)}
                  talentInfo={{
                    ...joinedTalent,
                    name: joinedTalent.name || 'Unknown Name',
                    designation: joinedTalent.designation || 'Unknown Designation',
                  }}
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
