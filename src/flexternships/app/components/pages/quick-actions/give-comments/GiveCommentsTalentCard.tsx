// React Hook Form
import { Control, Controller, useController } from 'react-hook-form';

// Types and enums
import { GiveRecognitionForm, GiveNotesForm } from '@/flexternships/constraints/types/quick-actions-types';

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import Rating from '../../../core/feedback/Rating';
import SelectOptionCard from '../../../core/form/SelectOptionCard';
import TextInput from '../../../core/form/TextInput';

// Icons and assets
import checkedIcon from '@flexternships/assets/icons/checkboxes/checked.svg';
import uncheckedIcon from '@flexternships/assets/icons/checkboxes/unchecked.svg';

// Utils and data
import { stringToColour } from '@/flexternships/utils/miscellaneous-utils';
import { useCompetenciesStore } from '@/flexternships/stores/competencies-store';
import { QuickActionCategory } from '@/flexternships/constraints/enums/quick-actions-enums';
import { useNoteCategoriesStore } from '@/flexternships/stores/note-categories-store';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { ReactNode, useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp } from 'react-feather';

function UnselectedTalentCard({
  talentInfo,
  onSelectionToggle,
  onExpandToggle,
  trailIcon,
  checkboxIcon = uncheckedIcon,
  className = 'bg-white shadow-card',
}: UnselectedTalentCardProps) {
  const handleClick = onExpandToggle || onSelectionToggle;
  const avatarColor = stringToColour(talentInfo.name);
  const avatarBgColor = stringToColour(talentInfo.name, { opacity: 10 });
  const nameInitial = talentInfo.name.charAt(0).toUpperCase();

  return (
    <div
      className={classNames('flex flex-row justify-between items-center py-3 px-6 rounded-lg', className, {
        'cursor-pointer': !!handleClick,
      })}
      onClick={handleClick}
    >
      <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-2">
        <div className="flex flex-row items-center gap-x-3">
          <div onClick={onSelectionToggle} className="cursor-default">
            <img src={checkboxIcon} alt="checkbox" />
          </div>
          <div className="flex flex-row items-center gap-x-4">
            <Avatar className="size-8">
              <AvatarImage src={''} />
              <AvatarFallback
                className="p-2 font-semibold text-sm"
                style={{
                  color: avatarColor,
                  backgroundColor: avatarBgColor,
                }}
              >
                {nameInitial}
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
      {!!onExpandToggle && trailIcon}
    </div>
  );
}

function SelectedTalentCard({
  talentInfo,
  onSelectionToggle,
  control,
  talentIndex,
  category = QuickActionCategory.RECOGNITION,
}: SelectedTalentCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const competencies = useCompetenciesStore((state) => state.competencies);
  const noteCategories = useNoteCategoriesStore((state) => state.noteCategories);

  const {
    field: { value: selectedCompetencies = [], onChange: onCompetenciesChange },
  } = useController({
    name: `selectedTalents.${talentIndex}.competencies`,
    control,
    defaultValue: [],
    shouldUnregister: true,
  });

  const {
    field: { value: selectedNoteCategory = '', onChange: onNoteCategoryChange },
  } = useController({
    name: `selectedTalents.${talentIndex}.noteCategory`,
    control,
    shouldUnregister: true,
  });

  const {
    fieldState: { error },
  } = useController({
    name: `selectedTalents.${talentIndex}`,
    control,
    shouldUnregister: true,
  });

  const handleExpandToggle = () => setIsExpanded((prev) => !prev);

  const handleCompetencyToggle = (competencyId: string) => {
    const newCompetencies = selectedCompetencies.includes(competencyId)
      ? selectedCompetencies.filter((id: string) => id !== competencyId)
      : [...selectedCompetencies, competencyId];
    onCompetenciesChange(newCompetencies);
  };

  const handleNoteCategoryToggle = (noteCategory: string) => {
    onNoteCategoryChange(noteCategory === selectedNoteCategory ? '' : noteCategory);
  };

  const isNotesCategory = category === QuickActionCategory.NOTE;
  const isRecognitionCategory = category === QuickActionCategory.RECOGNITION;
  const showExpandedContent = isExpanded || isRecognitionCategory;
  const showErrorBanner = isNotesCategory && !isExpanded && !isEmpty(error);

  const cardClassName = classNames('flex flex-col rounded-lg border-1', {
    'bg-trublue-light border-trublue-secondary-500 gap-y-4': isRecognitionCategory || isExpanded || !showErrorBanner,
    'border-error': showErrorBanner,
  });

  return (
    <div className={cardClassName}>
      <UnselectedTalentCard
        talentInfo={talentInfo}
        onSelectionToggle={onSelectionToggle}
        onExpandToggle={isNotesCategory ? handleExpandToggle : undefined}
        trailIcon={
          isExpanded ? (
            <ChevronUp size={24} className="text-grey-300" />
          ) : (
            <ChevronDown size={24} className="text-grey-300" />
          )
        }
        checkboxIcon={checkedIcon}
        className="bg-transparent"
      />

      {showExpandedContent && (
        <div className="flex flex-col gap-y-4 px-6 pb-3">
          <div className="flex flex-col gap-y-2">
            <div className="text-sm font-medium leading-5.5 text-grey-600">
              Select applicable competencies {isRecognitionCategory && <span className="text-error">*</span>}
            </div>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
              {competencies.map((competency) => (
                <SelectOptionCard
                  key={competency.id}
                  text={competency.name}
                  value={competency.id}
                  selected={selectedCompetencies.includes(competency.id)}
                  onClick={() => handleCompetencyToggle(competency.id)}
                  multiselect
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            {isNotesCategory && (
              <>
                <div className="text-sm font-medium leading-4.5 text-grey-600">
                  Your note <span className="text-error">*</span>
                </div>
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
                  {noteCategories.map((noteCategory) => (
                    <SelectOptionCard
                      key={noteCategory.id}
                      text={noteCategory.name}
                      value={noteCategory.id}
                      selected={noteCategory.id === selectedNoteCategory}
                      onClick={() => handleNoteCategoryToggle(noteCategory.id)}
                    />
                  ))}
                </div>
              </>
            )}
            <Controller
              name={`selectedTalents.${talentIndex}.comment`}
              control={control}
              defaultValue=""
              render={({ field: { value, onChange }, fieldState: { error: commentError } }) => (
                <TextInput
                  label={isRecognitionCategory ? 'Your comment' : undefined}
                  textarea
                  required
                  placeholder="Please enter your comment"
                  className="w-full"
                  value={value}
                  onChange={onChange}
                  error={commentError?.message}
                />
              )}
            />
          </div>
        </div>
      )}

      {showErrorBanner && (
        <div className="px-6 py-3 flex flex-row items-center gap-x-2 text-error bg-error bg-opacity-10">
          <AlertCircle size={18} />
          <div className="text-sm font-medium leading-4.5">
            <span className="font-semibold">Note:</span> Please enter all required details to submit a note.
          </div>
        </div>
      )}
    </div>
  );
}

export default function GiveCommentsTalentCard(props: GiveCommentsTalentCardProps) {
  const { selected, talentInfo, onToggle, control, category = QuickActionCategory.RECOGNITION } = props;

  const talentIndex = useController({
    name: 'selectedTalents',
    control,
  }).field.value.findIndex((talent: { talentId: string }) => talent.talentId === talentInfo.id);

  if (selected) {
    return (
      <SelectedTalentCard
        talentInfo={talentInfo}
        onSelectionToggle={onToggle}
        control={control}
        talentIndex={talentIndex}
        category={category}
      />
    );
  }

  return <UnselectedTalentCard talentInfo={talentInfo} onSelectionToggle={onToggle} />;
}

type GiveCommentsTalentCardProps = {
  selected?: boolean;
  talentInfo: {
    id: string;
    name: string;
    profileImage?: string;
    designation: string;
    averageRating?: number;
    isDocumentsSigned?: boolean;
  };
  onToggle: () => void;
  control: Control<GiveRecognitionForm | GiveNotesForm>;
  category?: QuickActionCategory;
};

type SelectedTalentCardProps = {
  talentInfo: GiveCommentsTalentCardProps['talentInfo'];
  onSelectionToggle: () => void;
  control: Control<GiveRecognitionForm | GiveNotesForm>;
  talentIndex: number;
  category?: QuickActionCategory;
};

type UnselectedTalentCardProps = {
  talentInfo: GiveCommentsTalentCardProps['talentInfo'];
  onSelectionToggle: () => void;
  onExpandToggle?: () => void;
  trailIcon?: ReactNode;
  checkboxIcon?: string;
  className?: string;
};
