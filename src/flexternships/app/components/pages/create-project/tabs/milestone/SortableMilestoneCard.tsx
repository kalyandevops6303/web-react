import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'react-feather';
import { Controller, FieldErrors, useFieldArray } from 'react-hook-form';
import PrimaryIconText from '@flexternships/app/components/core/buttons/PrimaryIconText';
import SimpleElevatedCard from '@flexternships/app/components/core/cards/SimpleElevatedCard';
import TextInput from '@flexternships/app/components/core/form/TextInput';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { Milestone } from '@flexternships/types/project-creation-types';
import reorderIcon from '@flexternships/assets/icons/core/reorderIcon.svg';
import { TextInputType } from '@/flexternships/constraints/enums/form-enums';

export default function SortableMilestoneCard(props: Props) {
  const { id, milestoneIndex, removable, control, remove, errors } = props;

  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    maxHeight: isDragging ? '150px' : '600px',
  };

  const {
    fields: deliverables,
    append: appendDeliverable,
    remove: removeDeliverable,
  } = useFieldArray({
    control,
    name: `milestones.${milestoneIndex}.deliverables`,
  });

  useEffect(() => {
    setIsExpanded((cur) => (isDragging ? false : cur));
  }, [isDragging]);

  const handleRemoveDeliverable = (index: number) => {
    if (deliverables.length > 1) {
      removeDeliverable(index);
    }
  };

  return (
    <div ref={setNodeRef} className="w-full" style={style}>
      <SimpleElevatedCard className={`${Styles.roleCard} ${isExpanded ? 'max-h-[600px]' : 'max-h-[150px]'}`}>
        <div className={Styles.chevronContainer} onClick={toggleExpand}>
          {isExpanded ? (
            <ChevronUp className="text-grey-muted cursor-pointer" size={24} />
          ) : (
            <ChevronDown className="text-grey-muted cursor-pointer" size={24} />
          )}
        </div>
        <div className="flex flex-row flex-wrap py-5 pr-6 gap-x-6 gap-y-10">
          <div className="flex flex-row gap-x-5">
            <div className="self-center" {...attributes} {...listeners}>
              <img src={reorderIcon} alt="reorder" />
            </div>
            <Controller
              name={`milestones.${milestoneIndex}.title`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChange={onChange}
                  className="w-[474px]"
                  label={`Milestone  ${milestoneIndex + 1}`}
                  placeholder="Enter milestone"
                  error={errors?.title?.message}
                  required
                />
              )}
            ></Controller>
          </div>

          <Controller
            name={`milestones.${milestoneIndex}.duration`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-[247px]"
                label="Duration (in weeks)"
                placeholder="Enter duration"
                type={TextInputType.NUMERIC}
                extra="wk"
                error={errors?.duration?.message}
                required
              />
            )}
          ></Controller>

          {/* Render the rest of the inputs only if expanded */}
          {isExpanded && (
            <>
              <Controller
                name={`milestones.${milestoneIndex}.description`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    value={value}
                    onChange={onChange}
                    className="w-[518px]"
                    label="Description"
                    placeholder="Enter description"
                    tooltip="Describe the milestone objectives and output required"
                    error={errors?.description?.message}
                    textarea
                    required
                  />
                )}
              ></Controller>
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-normal leading-5 text-grey-500">Deliverables</div>
                <div className="flex flex-col gap-y-5">
                  <div className="flex flex-col gap-y-5">
                    {deliverables.map((field, index) => (
                      <div key={field.id} className="flex flex-row gap-x-6 items-center">
                        <Controller
                          name={`milestones.${milestoneIndex}.deliverables.${index}`}
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <TextInput
                              value={value}
                              onChange={onChange}
                              key={field.id}
                              className="w-[428px]"
                              label=""
                              placeholder="Enter deliverables"
                              error={errors?.deliverables?.[index]?.message}
                            />
                          )}
                        ></Controller>
                        <span
                          className={`text-error text-xs tracking-wide font-semibold ${
                            deliverables.length > 1 ? 'cursor-pointer' : 'opacity-60'
                          }`}
                          onClick={() => handleRemoveDeliverable(index)}
                        >
                          Remove
                        </span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <PrimaryIconText
                      className={'mt-2'}
                      text="Add Deliverable"
                      icon={<Plus className={'text-trublue'} size={18} />}
                      onClick={() => appendDeliverable('')}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {isExpanded && removable && (
          <div className="mr-6 pb-6 flex flex-row justify-end">
            <span className={Styles.errorTextButton} onClick={remove}>
              Remove Milestone
            </span>
          </div>
        )}
      </SimpleElevatedCard>
    </div>
  );
}

type Props = {
  id: string;
  milestoneIndex: number;
  removable: boolean;
  control: any;
  remove: () => void;
  errors: FieldErrors<Milestone> | undefined;
};
