"use client";

import { yupResolver } from '@hookform/resolvers/yup';
import { ChevronLeft, Plus } from 'react-feather';
import { useFieldArray, useForm } from 'react-hook-form';
import PrimaryButton from '@flexternships/app/components/core/buttons/PrimaryButton';
import PrimaryIconText from '@flexternships/app/components/core/buttons/PrimaryIconText';
import SecondaryButton from '@flexternships/app/components/core/buttons/SecondaryButton';
import { useProjectCreationStore } from '@flexternships/stores/project-creation-store';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { ProjectRolesForm } from '@flexternships/types/project-creation-types';
import { ProjectRolesFormSchema } from '@flexternships/schemas/project-creation-schemas';
import RoleCard from './RoleCard';
import { ToastType } from '@/flexternships/constraints/enums/core-enums';
import { showToastMessage } from '@/flexternships/utils/core-utils';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Roles() {
  const rolesData = useProjectCreationStore((state) => state.data.roles);
  const isSaveDraftLoading = useProjectCreationStore((state) => state.isSaveDraftLoading);
  const previousTab = useProjectCreationStore((state) => state.previousTab);
  const nextTab = useProjectCreationStore((state) => state.nextTab);
  const updateRolesData = useProjectCreationStore((state) => state.updateRolesData);
  const saveAsDraft = useProjectCreationStore((state) => state.saveDraft);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<ProjectRolesForm>({
    mode: 'onChange',
    resolver: yupResolver(ProjectRolesFormSchema),
    defaultValues: {},
  });
  const { projectId } = useParams();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projectRoles',
  });

  const onContinue = (data: ProjectRolesForm) => {
    updateRolesData(data.projectRoles);
    nextTab();
  };


  const onSaveDraft = async () => {
    try {
      updateRolesData(watch('projectRoles'));
      await saveAsDraft(projectId);
    } catch (error) {
      showToastMessage(ToastType.ERROR, "Failed to save draft. Please try again.");
    }
  }

  useEffect(() => {
    if (!isEmpty(rolesData)) {
      reset({
        projectRoles: rolesData,
      });
    }
  }, [rolesData, reset]);

  return (
    <div className='flex flex-col'>
      <div className={Styles.tabContent}>
        <div className={Styles.tabContentHeader}>Required Roles</div>
        <div className={`${Styles.tabContentBody} mt-6`}>
          <div className='w-full'>
            {fields.map((field, index) => (
              <RoleCard
                key={field.id}
                index={index}
                control={control}
                removable={fields.length > 1}
                remove={() => remove(index)}
                errors={errors.projectRoles?.[index]}
              />
            ))}
            <div>
              <PrimaryIconText
                className="mt-2"
                text="Add Role"
                icon={<Plus className="text-trublue" size={18} />}
                onClick={() => append({ role: { _id: '', name: '' }, count: 1, skills: [], tools: [] })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.bottomActionsContainer}>
        <PrimaryIconText
          text="Back"
          icon={<ChevronLeft className="text-trublue" size={18} />}
          onClick={previousTab}
        />
        <div className={Styles.buttonsContainer}>
          <SecondaryButton
            className="mr-6"
            onClick={onSaveDraft}
            loading={isSaveDraftLoading}
          >
            Save as Draft
          </SecondaryButton>
          <PrimaryButton
            onClick={handleSubmit(onContinue, (formErrors) => console.log('Validation Errors:', formErrors))}
            disabled={!isValid}
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
