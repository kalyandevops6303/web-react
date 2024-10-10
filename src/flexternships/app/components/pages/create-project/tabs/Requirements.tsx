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
import { useStaticDataStore } from '@flexternships/stores/static-data-store';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { ProjectDetails } from '@flexternships/types/project-creation-types';
import { ProjectDetailsSchema } from '@flexternships/schemas/project-creation-schemas';

export default function Requirements() {
  const requirementsData = useProjectCreationStore((state) => state.data.requirements);
  const isSaveDraftLoading = useProjectCreationStore((state) => state.isSaveDraftLoading);
  const updateRequirementsData = useProjectCreationStore((state) => state.updateRequirementsData);
  const nextTab = useProjectCreationStore((state) => state.nextTab);
  const fetchStaticData = useStaticDataStore((state) => state.fetchStaticData);
  const saveAsDraft = useProjectCreationStore((state) => state.saveDraft);

  useEffect(() => {
    fetchStaticData();
  }, [fetchStaticData])


  const {
    control,
    register,
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
        <div className={Styles.tabContentBody}>
          <Controller
            name="projectName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                className="w-[568px]"
                type="alphanumeric"
                label="Project Name"
                placeholder="Enter project name"
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
                type="numeric"
                label="Estimated Duration (in weeks)"
                placeholder="Enter duration"
                extra="wk"
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
                className="w-[272px]" type="numeric" label="Estimated Hours / Week"
                placeholder="Enter estimation" 
                extra="hrs/wk"
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
                className="w-[272px]" type="numeric" 
                label="Total Project Hours / Flextern" 
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
                className="w-full" type="alphanumeric" label="Project Description" placeholder="Enter project background and requirements" required textarea />
            )}>
          </Controller>

          <FileUpload
            name={'documents'}
            control={control}
            label="Upload detailed requirements document (optional)"
            placeholder="Upload Document" />


        </div>
      </div>
      <div className={Styles.buttonsContainer}>
        <SecondaryButton className="mr-6" text="Save as Draft " onClick={saveAsDraft} loading={isSaveDraftLoading} />
        <PrimaryButton onClick={handleSubmit(onContinue)} disabled={!isValid}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
