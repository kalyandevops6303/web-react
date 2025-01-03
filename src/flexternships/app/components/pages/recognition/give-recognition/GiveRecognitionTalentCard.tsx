// React Hook Form
import { Control, Controller, useController } from 'react-hook-form';

// Types and enums
import { GiveRecognitionForm } from '@/flexternships/constraints/types/recognition-types';

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import Rating from '../../../core/feedback/Rating';
import SelectCompetencyCard from './SelectCompetencyCard';
import TextInput from '../../../core/form/TextInput';

// Icons and assets
import checkedIcon from '@flexternships/assets/icons/checkboxes/checked.svg';
import uncheckedIcon from '@flexternships/assets/icons/checkboxes/unchecked.svg';

// Utils and data
import { mockCompetencies } from '@/flexternships/mocks/recognition-data';
import { stringToColour } from '@/flexternships/utils/miscellaneous-utils';

export default function GiveRecognitionTalentCard(props: GiveRecognitionTalentCardProps) {
  const { selected, talentInfo, onToggle, control } = props;

  const talentIndex = useController({
    name: 'selectedTalents',
    control,
  }).field.value.findIndex((talent: { talentId: string }) => talent.talentId === talentInfo.id);

  const {
    field: { value: selectedCompetencies = [], onChange: onCompetenciesChange },
  } = useController({
    name: `selectedTalents.${talentIndex}.competencies`,
    control,
    defaultValue: [],
    shouldUnregister: true,
  });

  const handleCompetencyToggle = (competencyId: string) => {
    if (selectedCompetencies.includes(competencyId)) {
      onCompetenciesChange(selectedCompetencies.filter((id: string) => id !== competencyId));
    } else {
      onCompetenciesChange([...selectedCompetencies, competencyId]);
    }
  };

  return (
    <div
      className={`flex flex-col gap-y-4 py-3 px-6 rounded-lg ${selected ? 'bg-trublue-light' : 'bg-white shadow-card'}`}
    >
      <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-2" onClick={onToggle}>
        <div className="flex flex-row items-center gap-x-3">
          <div>
            <img src={selected ? checkedIcon : uncheckedIcon} alt="checkbox" />
          </div>
          <div className="flex flex-row items-center gap-x-4">
            <Avatar className="size-8">
              <AvatarImage src={''} />
              <AvatarFallback
                className="p-2 font-semibold text-sm"
                style={{
                  color: stringToColour(talentInfo.name),
                  backgroundColor: `${stringToColour(talentInfo.name, { opacity: 10 })}`,
                }}
              >
                {talentInfo.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="w-[400px] text-sm font-semibold leading-5.5 text-grey">{talentInfo.name}</div>
          </div>
        </div>
        <div className="w-[200px] text-sm text-grey font-medium leading-5.5">{talentInfo.designation}</div>
        <div>
          {talentInfo.averageRating && (
            <Rating rating={talentInfo.averageRating} ratingColor="#0185E4" showTotalScore />
          )}
        </div>
      </div>
      {selected && (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <div className="text-sm font-medium leading-5.5 text-grey-600">
              Select applicable competencies <span className="text-error">*</span>
            </div>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
              {mockCompetencies.map((competency) => (
                <SelectCompetencyCard
                  key={competency.id}
                  text={competency.name}
                  value={competency.id}
                  selected={selectedCompetencies.includes(competency.id)}
                  onClick={() => handleCompetencyToggle(competency.id)}
                />
              ))}
            </div>
          </div>
          <div>
            <Controller
              name={`selectedTalents.${talentIndex}.message`}
              control={control}
              defaultValue=""
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextInput
                  label="Your comment"
                  textarea
                  required
                  placeholder="Please enter your comment"
                  className="w-full"
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}

type GiveRecognitionTalentCardProps = {
  selected?: boolean;
  talentInfo: {
    id: string;
    name: string;
    profileImage?: string;
    designation: string;
    averageRating?: number;
    isDocumentsSigned?: boolean;
  };
  onToggle?: () => void;
  control: Control<GiveRecognitionForm>;
};
