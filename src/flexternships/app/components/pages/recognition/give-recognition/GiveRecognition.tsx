// React and hooks
import { useState } from 'react';
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

export default function GiveRecognition() {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<GiveRecognitionForm>({
    mode: 'onChange',
    defaultValues: {
      milestone: {
        _id: '1',
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

  return (
    <SimpleElevatedCard className="bg-white p-6 flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-2 items-start">
        <div className="text-base text-grey-600 font-medium leading-6">
          Do you see impressive work or contribution from team member(s)? Recognize with a WOW!
        </div>
        <div className="w-[540px]">
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
          {mockUsers.map((user) => (
            <GiveRecognitionTalentCard
              key={user.id}
              selected={selectedTalents.some((talent) => talent.talentId === user.id)}
              talentInfo={user}
              control={control}
              onToggle={() => handleToggle(user.id)}
            />
          ))}
        </div>
      </div>
      <div>
        <PrimaryButton className="m-0" onClick={handleSubmit(onSubmit)} loading={isSubmitLoading} disabled={!isValid}>
          Submit
        </PrimaryButton>
      </div>
    </SimpleElevatedCard>
  );
}
