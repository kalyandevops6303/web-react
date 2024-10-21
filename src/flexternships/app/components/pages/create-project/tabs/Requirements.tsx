"use client";

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PrimaryButton from '@flexternships/app/components/core/buttons/PrimaryButton';
import SecondaryButton from '@flexternships/app/components/core/buttons/SecondaryButton';
import { DatePicker } from '@flexternships/app/components/core/form/DatePicker';
import FileUpload from '@flexternships/app/components/core/form/FileUpload';
import TextInput from '@flexternships/app/components/core/form/TextInput';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { ProjectDetails } from '@flexternships/types/project-creation-types';
import { ProjectDetailsSchema } from '@flexternships/schemas/project-creation-schemas';
import { getTodayDate } from '@flexternships/utils/date-utils';
import { TextInputType } from '@/flexternships/constraints/enums/form-enums';
import { showToastMessage } from '@/flexternships/utils/toast-utils';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';

export default function Requirements() {
  const requirementsData = useProjectCreationStore((state) => state.data.requirements);
  const isSaveDraftLoading = useProjectCreationStore((state) => state.isSaveDraftLoading);
  const updateRequirementsData = useProjectCreationStore((state) => state.updateRequirementsData);
  const nextTab = useProjectCreationStore((state) => state.nextTab);
  const saveAsDraft = useProjectCreationStore((state) => state.saveDraft);


  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProjectDetails>({
    mode: 'onChange',
    resolver: yupResolver(ProjectDetailsSchema),
    defaultValues: requirementsData,
  });

  const onContinue = (data: ProjectDetails) => {
    updateRequirementsData(data);
    nextTab();
  };

  const onSaveDraft = async () => {
    const data = watch();
    updateRequirementsData(data);
    try {
      await saveAsDraft();
    } catch (error) {
      showToastMessage(ToastType.ERROR, "Failed to save draft. Please try again.");
    }
  };

  // Watch for changes in estimatedDuration and estimatedWeeklyHours to autofill totalHours
  const estimatedDuration = watch('estimatedDuration');
  const estimatedWeeklyHours = watch('estimatedWeeklyHours');
  useEffect(() => {
    if (estimatedDuration && estimatedWeeklyHours) {
      const totalHours = estimatedDuration * estimatedWeeklyHours;
      setValue('totalProjectHoursEach', totalHours, { shouldValidate: true });
    } else {
      setValue('totalProjectHoursEach', 0, { shouldValidate: true });
    }
  }, [estimatedDuration, estimatedWeeklyHours, setValue]);


  return (
    <div className="flex flex-col">
      <div className={Styles.tabContent}>
        <div className={Styles.tabContentHeader}>Project Listing Details</div>
        <div className={`${Styles.tabContentBody} px-6 py-5`}>
          <Controller
            name="projectName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-[568px]"
                type={TextInputType.ALPHANUMERIC}
                label="Project Name"
                placeholder="Enter project name"
                error={errors.projectName?.message}
                required />
            )}>

          </Controller>
          <Controller
            name="estimatedStartDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                value={value}
                onChange={onChange}
                className="w-[272px]"
                label="Estimated Start Date"
                placeholder="Enter start date"
                error={errors.estimatedStartDate?.message}
                fromDate={getTodayDate()}
                required />
            )}>
          </Controller>
          <Controller
            name="estimatedDuration"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-[272px]"
                type={TextInputType.NUMERIC}
                label="Estimated Duration (in weeks)"
                placeholder="Enter duration"
                extra="wk"
                error={errors.estimatedDuration?.message}
                required />
            )}>

          </Controller>
          <Controller
            name="estimatedWeeklyHours"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-[272px]" 
                type={TextInputType.NUMERIC} 
                label="Estimated Hours / Week per Flextern"
                placeholder="Enter estimation" 
                extra="hrs/wk"
                error={errors.estimatedWeeklyHours?.message}
                required />

            )}>

          </Controller>

          <Controller
            name="totalProjectHoursEach"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-[272px]" 
                type={TextInputType.NUMERIC} 
                label="Total Project Hours per Flextern" 
                placeholder="Add duration & hours/week" 
                extra="hrs/flextern"
                readOnly />
            )}>

          </Controller>
          <Controller
            name="projectDescription"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-full" 
                type={TextInputType.ALPHANUMERIC} 
                label="Project Description" 
                placeholder="Enter project background and requirements" 
                error={errors.projectDescription?.message}
                required textarea />
            )}>
          </Controller>

          <FileUpload
            name={'documents'}
            control={control}
            label="Upload requirement documents (optional)"
            placeholder="Upload Document" />


        </div>
      </div>
      <div className={Styles.buttonsContainer}>
        <SecondaryButton 
          className="mr-6" 
          onClick={onSaveDraft} 
          loading={isSaveDraftLoading}>
            Save as Draft
          </SecondaryButton>
        <PrimaryButton onClick={handleSubmit(onContinue)} disabled={!isValid}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
