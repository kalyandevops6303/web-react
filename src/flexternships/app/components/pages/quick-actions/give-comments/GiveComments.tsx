// External dependencies
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Components
import GiveCommentsTalentCard from './GiveCommentsTalentCard';
import PrimaryButton from '../../../core/buttons/PrimaryButton';
import QuickActionConfirmationModal from '../../../core/modals/QuickActionConfirmationModal';
import SimpleElevatedCard from '../../../core/cards/SimpleElevatedCard';
import SingleSelectInput from '../../../core/form/SingleSelectInput';
import Spinner from '../../../core/Spinner';

// Enums and Types
import { GiveCommentsSchema } from '@/flexternships/schemas/quick-actions-schemas';
import { GiveNotesForm, GiveRecognitionForm } from '@/flexternships/constraints/types/quick-actions-types';
import { MilestoneDropdownOptions } from '@/flexternships/constraints/enums/miscellaneous-enums';
import { QuickActionCategory } from '@/flexternships/constraints/enums/quick-actions-enums';
import { TeamMemberDetails } from '@/flexternships/constraints/types/project-details-types';
import { ToastType, UserType } from '@/flexternships/constraints/enums/core-enums';

// Services and Stores
import { fetchTeamDetails } from '@/flexternships/services/project-details';
import { getMilestonesDropdown, submitNotes, submitRecognition } from '@/flexternships/services/project-management-v2';
import { giveCommentsTitle } from '@/flexternships/static/content/quick-actions-content';
import { useCompetenciesStore } from '@/flexternships/stores/competencies-store';
import { useFlexternUserStore } from '@/flexternships/stores/core-stores';
import { useNoteCategoriesStore } from '@/flexternships/stores/note-categories-store';

// Utils
import { parseTeamDetails } from '@/flexternships/utils/parsing-utils';
import { showToastMessage } from '@/flexternships/utils/core-utils';

const defaultValues = {
  milestone: undefined,
  selectedTalents: [],
};

export default function GiveComments({ refreshStats, category = QuickActionCategory.RECOGNITION }: GiveCommentsProps) {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [talentsLoading, setTalentsLoading] = useState<boolean>(true);
  const [teamDetails, setTeamDetails] = useState<TeamMemberDetails[]>([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

  const userDetails = useFlexternUserStore((state) => state.userDetails);

  const populateCompetencies = useCompetenciesStore((state) => state.populateCompetencies);
  const isCompetenciesLoading = useCompetenciesStore((state) => state.isCompetenciesLoading);

  const populateNoteCategories = useNoteCategoriesStore((state) => state.populateNoteCategories);
  const isNoteCategoriesLoading = useNoteCategoriesStore((state) => state.isNoteCategoriesLoading);

  const { projectId } = useParams();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<GiveRecognitionForm | GiveNotesForm>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(GiveCommentsSchema[category]),
  });

  const { append, remove } = useFieldArray({
    control,
    name: 'selectedTalents',
  });

  const selectedTalents = watch('selectedTalents');

  const closeConfirmationModal = async () => {
    reset(defaultValues);
    await refreshStats?.();
    setIsConfirmationModalOpen(false);
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleToggle = (talentId: string) => {
    const talentIndex = selectedTalents.findIndex((talent) => talent.talentId === talentId);
    if (talentIndex === -1) {
      append({ talentId, competencies: [], comment: '' });
    } else {
      remove(talentIndex);
    }
  };

  const onSubmit = async (data: GiveRecognitionForm | GiveNotesForm) => {
    if (!projectId) throw new Error('Project ID is required');

    setIsSubmitLoading(true);
    try {
      if (category === QuickActionCategory.RECOGNITION) {
        const recognitionData = data as GiveRecognitionForm;
        await submitRecognition(projectId, recognitionData.milestone._id, recognitionData.selectedTalents);
      } else {
        // Notes submission to be implemented
        const notesData = data as GiveNotesForm;
        await submitNotes(projectId, notesData.milestone._id, notesData.selectedTalents);
      }
      openConfirmationModal();
    } catch (error: unknown) {
      showToastMessage(ToastType.ERROR, error instanceof Error ? error.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitLoading(false);
    }
  };

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
    populateNoteCategories();
  }, [projectId]);

  useEffect(() => {
    reset(watch(), { keepErrors: false });
  }, [category, reset]);

  if (talentsLoading || isCompetenciesLoading || (isNoteCategoriesLoading && category === QuickActionCategory.NOTE))
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
            <div className="text-base text-grey-600 font-medium leading-6">{giveCommentsTitle[category]}</div>
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
                <GiveCommentsTalentCard
                  key={joinedTalent.id}
                  selected={selectedTalents.some((selectedTalent) => selectedTalent.talentId === joinedTalent.id)}
                  talentInfo={{
                    ...joinedTalent,
                    name: joinedTalent.name || 'Unknown Name',
                    designation: joinedTalent.designation || 'Unknown Designation',
                  }}
                  control={control}
                  onToggle={() => handleToggle(joinedTalent.id)}
                  category={category}
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
      <QuickActionConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
        title="Great Job!"
        description={`You have submitted the ${
          category === QuickActionCategory.NOTE ? 'Notes' : userDetails.userType === UserType.TALENT ? 'Kudos!' : 'WOWs'
        }!`}
      />
    </SimpleElevatedCard>
  );
}

type GiveCommentsProps = {
  refreshStats?: () => Promise<void>;
  category?: QuickActionCategory;
};
