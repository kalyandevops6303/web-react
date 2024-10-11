import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { AlertCircle, ChevronLeft, Plus } from 'react-feather';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import PrimaryButton from '@flexternships/app/components/core/buttons/PrimaryButton';
import PrimaryIconText from '@flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@flexternships/app/components/core/buttons/SecondaryButton';
import { DatePicker } from '@flexternships/app/components/core/form/DatePicker';
import SuccessTag from '@flexternships/app/components/core/tags/SuccessTag';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { MilestonesForm, ModalType } from '@flexternships/types/project-creation-types';
import { MilestonesFormSchema } from '@flexternships/schemas/project-creation-schemas';
import { dateToEpoch } from '@flexternships/utils/date-utils';
import MilestoneInfo from './MilestoneInfo';
import SortableMilestoneCard from './SortableMilestoneCard';
import UpdateDurationModal from '@flexternships/app/components/core/modals/UpdateDurationModal';


export default function Milestones() {
  const previousTab = useProjectCreationStore((state) => (state.previousTab));
  const nextTab = useProjectCreationStore((state) => (state.nextTab));
  const estimatedStartDate = useProjectCreationStore((state) => (state.data.requirements.estimatedStartDate));
  const estimatedDuration = useProjectCreationStore((state) => (state.data.requirements.estimatedDuration));
  const milestonesData = useProjectCreationStore((state) => state.data.milestones);
  const updateEstimatedStartDate = useProjectCreationStore((state) => (state.updateEstimatedStartDate));
  const updateEstimatedDuration = useProjectCreationStore((state) => (state.updateEstimatedDuration));
  const updateMilestonesData = useProjectCreationStore((state) => state.updateMilestonesData);
  const saveAsDraft = useProjectCreationStore((state) => state.saveDraft);
  const openModal = useProjectCreationStore((state) => state.openModal);
  const closeModal = useProjectCreationStore((state) => state.closeModal);


  const [milestoneDurationState, setMilestoneDurationState] = useState<"undershot" | "overshot" | "balanced" | "updated">("balanced");

  const sensors = useSensors(useSensor(PointerSensor));

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<MilestonesForm>({
    mode: 'onChange',
    resolver: yupResolver(MilestonesFormSchema),
    defaultValues: {
      milestones: milestonesData,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'milestones',
  });

  const milestones = useWatch({
    control,
    name: "milestones",
  });


  const sumOfMilestoneDuration: number = milestones.reduce((total, milestone) => {
    const duration = typeof milestone.duration === 'string' ? parseFloat(milestone.duration) : milestone.duration;
    return total + (isNaN(duration) ? 0 : duration); // Handle NaN case
  }, 0);
  const durationDiff: number = sumOfMilestoneDuration - estimatedDuration;

  useEffect(() => {
    console.log("Total Duration updated:", sumOfMilestoneDuration);
    if (durationDiff === 0) {
      setMilestoneDurationState("balanced");
      return;
    }
    if (durationDiff > 0) {
      setMilestoneDurationState('overshot');
    } else {
      setMilestoneDurationState('undershot');
    }
  }, [sumOfMilestoneDuration]);

  const matchEstimatedDuration = () => {
    updateEstimatedDuration(sumOfMilestoneDuration);
    setMilestoneDurationState("updated");
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex(field => field.id === active.id);
      const newIndex = fields.findIndex(field => field.id === over.id);

      move(oldIndex, newIndex);
    }
  };

  const handleEstimatedStartDateChange = (newDate: number) => {
    if(newDate < dateToEpoch(new Date(new Date().setHours(0, 0, 0, 0)))) return;
    updateEstimatedStartDate(newDate);
  }

  const onContinue = (data: MilestonesForm) => {
    if (durationDiff !== 0) {
      // open modal
      console.log('entered', durationDiff)
      openModal(ModalType.DURATION_OVERSHOT)
      return;
    }
    updateMilestonesData(data.milestones);
    nextTab();
  }

  return (
    <>
      <div className={Styles.tabContent}>
        <div className={Styles.tabContentHeader}>
          Project Overview
        </div>
        <div className={Styles.tabContentBody}>
          <DatePicker value={estimatedStartDate} onChange={handleEstimatedStartDateChange} className='w-[272px]' label='Estimated Start Date' placeholder='Enter start date' required />
          <div className={`${Styles.durationContainer}`}> {/* Apply class based on type */}
            <div className={Styles.durationTitle}>
              Estimated Duration (in weeks)
            </div>
            <div className={`flex flex-col items-end relative`}>
              <span className={Styles.durationValue}>
                {estimatedDuration} wk
                {
                  (milestoneDurationState === "updated") && (
                    <span className={Styles.milestoneDurationUpdatedTag}>
                      Updated
                    </span>
                  )
                }
              </span>
              {
                (durationDiff !== 0) && (
                  <span className={`${Styles.durationValueDiff} ${durationDiff < 0 ? Styles.undershot : (durationDiff > 0 ? Styles.exceed : '')}`}>
                    {durationDiff < 0 ? '-' : (durationDiff > 0 ? '+' : '')} {Math.abs(durationDiff)} wk
                  </span>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.tabContent}>
        <div className={Styles.tabContentHeader}>
          Milestones
        </div>
        <div className={`${Styles.tabContentBody} mt-6`}>
          {
            (durationDiff !== 0) && (
              <MilestoneInfo updateHandler={matchEstimatedDuration} infoType={milestoneDurationState} />
            )
          }
          <div className='w-full'>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                {fields.map((field, index) => (
                  <SortableMilestoneCard
                    key={field.id}
                    id={field.id}
                    milestoneIndex={index}
                    control={control}
                    removable={fields.length > 2}
                    remove={() => remove(index)}
                    errors={errors.milestones?.[index]}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <div>
              <PrimaryIconText
                className={'mt-2'}
                text='Add Milestone'
                icon={<Plus className={'text-trublue'} size={18} />}
                onClick={() => append({
                  title: '',
                  duration: 1,
                  description: '',
                  deliverables: [' '],
                })} />
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.bottomActionsContainer}>
        {/* Make this a separate component */}
        <PrimaryIconText text='Back' icon={<ChevronLeft className='text-trublue' size={18} />} onClick={previousTab} />
        <div className={Styles.buttonsContainer}>
          <SecondaryButton className='mr-6' text='Save as Draft ' onClick={saveAsDraft} />
          <PrimaryButton onClick={handleSubmit(onContinue, (formErrors) => console.log('Validation Errors:', formErrors))} disabled={!isValid}>
            Continue
          </PrimaryButton>
        </div>
      </div>
      <UpdateDurationModal estimatedDuration={estimatedDuration} revisedEstimatedDuration={sumOfMilestoneDuration} onConfirm={() => { matchEstimatedDuration(); closeModal(); }} />
    </>
  );
}
