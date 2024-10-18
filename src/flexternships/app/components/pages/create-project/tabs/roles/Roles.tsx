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

export default function Roles() {
  const rolesData = useProjectCreationStore((state) => state.data.roles);
  const previousTab = useProjectCreationStore((state) => state.previousTab);
  const nextTab = useProjectCreationStore((state) => state.nextTab);
  const updateRolesData = useProjectCreationStore((state) => state.updateRolesData);
  const saveAsDraft = useProjectCreationStore((state) => state.saveDraft);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProjectRolesForm>({
    mode: 'onChange',
    resolver: yupResolver(ProjectRolesFormSchema),
    defaultValues: {
      projectRoles: rolesData,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projectRoles',
  });

  const onContinue = (data: ProjectRolesForm) => {
    updateRolesData(data.projectRoles);
    nextTab();
  };

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
            onClick={saveAsDraft}
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
