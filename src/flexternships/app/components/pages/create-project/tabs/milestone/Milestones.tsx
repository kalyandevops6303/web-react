import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, Plus } from 'react-feather';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import PrimaryButton from '@flexternships/app/components/core/buttons/PrimaryButton';
import PrimaryIconText from '@flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@flexternships/app/components/core/buttons/SecondaryButton';
import { DatePicker } from '@flexternships/app/components/core/form/DatePicker';
import UpdateDurationModal from '@flexternships/app/components/core/modals/UpdateDurationModal';
import { MilestonesFormSchema } from '@flexternships/schemas/project-creation-schemas';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { MilestoneInfoType, MilestonesForm, ModalType } from '@flexternships/types/project-creation-types';
import { dateToEpoch, getTodayDate } from '@flexternships/utils/date-utils';
import MilestoneInfo from './MilestoneInfo';
import SortableMilestoneCard from './SortableMilestoneCard';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { getUserTimezone, showToastMessage } from '@/flexternships/utils/core-utils';
import DurationUpdated from '@/flexternships/app/components/core/modals/DurationUpdated';
import { useParams } from 'react-router-dom';
import { useAppStore } from '@/flexternships/stores/core-stores';
import { saveForLaterModalContent } from '@/flexternships/static/core-content';

export default function Milestones() {
  const {
    previousTab,
    nextTab,
    data: {
      requirements: { estimatedStartDate, estimatedDuration },
      milestones: milestonesData,
    },
    isSaveDraftLoading,
    updateEstimatedStartDate,
    updateEstimatedDuration,
    updateMilestonesData,
    saveDraft,
    openModal,
    appendRemovedMilestoneId,
  } = useProjectCreationStore();

  const setWip = useAppStore((state) => state.setWip);
  const unsetWip = useAppStore((state) => state.unsetWip);
  const closeGlobalModal = useAppStore((state) => state.closeModal);

  const [milestoneDurationState, setMilestoneDurationState] = useState<MilestoneInfoType>(MilestoneInfoType.BALANCED);
  const [newMilestoneIndex, setNewMilestoneIndex] = useState<number | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<MilestonesForm>({
    mode: 'onChange',
    resolver: yupResolver(MilestonesFormSchema),
    defaultValues: useMemo(() => {
      let runningTotal = 0;
      let isDefault = true;
      const totalMilestones = milestonesData.length;

      return {
        milestones: milestonesData.map((milestoneItem, index) => {
          if (!isDefault) return milestoneItem;
          if (milestoneItem.duration >= 1) {
            isDefault = false;
            return milestoneItem;
          }

          const duration =
            index === totalMilestones - 1
              ? Math.max(1, Math.abs(estimatedDuration - runningTotal)) // Last item ensures remaining duration is >= 1
              : Math.ceil(milestoneItem.duration * estimatedDuration);

          runningTotal += duration;

          return { ...milestoneItem, duration };
        }),
      };
    }, [estimatedDuration, milestonesData]),
  });

  const { projectId } = useParams();

  const { fields, append, remove, move } = useFieldArray({ control, name: 'milestones' });
  const milestones = useWatch({ control, name: 'milestones' });

  const sumOfMilestoneDuration = useMemo(() => {
    return milestones.reduce((total, { duration }) => {
      const parsedDuration = typeof duration === 'string' ? parseFloat(duration) : duration;
      return total + (isNaN(parsedDuration) ? 0 : parsedDuration);
    }, 0);
  }, [milestones]);

  const durationDiff = sumOfMilestoneDuration - estimatedDuration;

  useEffect(() => {
    if (durationDiff > 0) {
      setMilestoneDurationState(MilestoneInfoType.OVERSHOT);
    } else if (durationDiff < 0) {
      setMilestoneDurationState(MilestoneInfoType.UNDERSHOT);
    } else if (milestoneDurationState !== MilestoneInfoType.UPDATED) {
      setMilestoneDurationState(MilestoneInfoType.BALANCED);
    }
  }, [durationDiff, milestoneDurationState, sumOfMilestoneDuration]);

  const matchEstimatedDuration = () => {
    updateEstimatedDuration(sumOfMilestoneDuration);
    setMilestoneDurationState(MilestoneInfoType.UPDATED);
  };

  const handleRemoveMilestone = (milestoneIndex: number) => {
    if (milestones[milestoneIndex]._id) {
      appendRemovedMilestoneId(milestones[milestoneIndex]._id);
    }
    remove(milestoneIndex);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  };

  const handleEstimatedStartDateChange = (newDate: number) => {
    if (newDate >= dateToEpoch(new Date(new Date().setHours(0, 0, 0, 0)))) {
      updateEstimatedStartDate(newDate);
    }
  };

  const onContinue = (data: MilestonesForm) => {
    if (durationDiff < 0) {
      openModal(ModalType.DURATION_UNDERSHOT);
    } else if (durationDiff > 0) {
      openModal(ModalType.DURATION_OVERSHOT);
    } else {
      updateMilestonesData(data.milestones);
      nextTab();
    }
  };

  const onSaveDraft = async () => {
    try {
      updateMilestonesData(watch('milestones'));
      await saveDraft(projectId);
    } catch (error) {
      showToastMessage(ToastType.ERROR, 'Failed to save draft. Please try again.');
    }
  };

  const addNewMilestone = () => {
    append({ title: '', duration: 1, description: '', deliverables: [' '] });
    setNewMilestoneIndex(watch('milestones').length - 1);
  };

  useEffect(() => {
    setWip(saveForLaterModalContent, {
      onConfirm: async () => {
        await onSaveDraft();
        closeGlobalModal();
      },
      onCancel: unsetWip,
      onClose: closeGlobalModal,
    });
  }, []);

  return (
    <>
      <div className={Styles.tabContent}>
        <div className={Styles.tabContentHeader}>Project Overview</div>
        <div className={Styles.tabContentBody}>
          <DatePicker
            value={estimatedStartDate}
            onChange={handleEstimatedStartDateChange}
            className="w-[272px] mt-5"
            label="Estimated Start Date"
            placeholder="Enter start date"
            fromDate={getTodayDate(getUserTimezone())}
            timeZone={getUserTimezone()}
            required
          />
          <div className={Styles.durationContainer}>
            <div className={Styles.durationTitle}>Estimated Duration (in weeks)</div>
            <div className="flex flex-col items-end relative">
              <span className={Styles.durationValue}>
                {estimatedDuration} wk
                {milestoneDurationState === MilestoneInfoType.UPDATED && (
                  <span className={Styles.milestoneDurationUpdatedTag}>Updated</span>
                )}
              </span>
              {durationDiff !== 0 && (
                <span className={`${Styles.durationValueDiff} ${durationDiff < 0 ? Styles.undershot : Styles.exceed}`}>
                  {durationDiff < 0 ? '-' : '+'} {Math.abs(durationDiff)} wk
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={Styles.tabContent}>
        <div className={Styles.tabContentHeader}>Milestones</div>
        <div className={`${Styles.milestonesContentBody} mt-6`}>
          {durationDiff !== 0 && (
            <MilestoneInfo
              updateHandler={() => {
                if (durationDiff < 0) {
                  openModal(ModalType.DURATION_UNDERSHOT);
                } else if (durationDiff > 0) {
                  openModal(ModalType.DURATION_OVERSHOT);
                }
              }}
              infoType={milestoneDurationState}
            />
          )}
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={fields} strategy={verticalListSortingStrategy}>
              {fields.map((field, index) => (
                <SortableMilestoneCard
                  key={field.id}
                  id={field.id}
                  milestoneIndex={index}
                  control={control}
                  removable={fields.length > 2}
                  remove={() => handleRemoveMilestone(index)}
                  errors={errors.milestones?.[index]}
                  newMilestoneIndex={newMilestoneIndex}
                />
              ))}
            </SortableContext>
          </DndContext>
          <PrimaryIconText
            className="mt-2"
            text="Add Milestone"
            icon={<Plus className="text-trublue" size={18} />}
            onClick={addNewMilestone}
          />
        </div>
      </div>

      <div className={Styles.bottomActionsContainer}>
        <PrimaryIconText text="Back" icon={<ChevronLeft className="text-trublue" size={18} />} onClick={previousTab} />
        <div className={Styles.buttonsContainer}>
          <SecondaryButton className="mr-6" onClick={onSaveDraft} loading={isSaveDraftLoading}>
            Save as Draft
          </SecondaryButton>
          <PrimaryButton onClick={handleSubmit(onContinue)} disabled={!isValid}>
            Continue
          </PrimaryButton>
        </div>
      </div>
      <UpdateDurationModal
        estimatedDuration={estimatedDuration}
        revisedEstimatedDuration={sumOfMilestoneDuration}
        onConfirm={() => {
          matchEstimatedDuration();
          openModal(ModalType.DURATION_UPDATED);
        }}
      />
      <DurationUpdated duration={estimatedDuration} />
    </>
  );
}
