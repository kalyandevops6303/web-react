import { ChevronDown, ChevronUp } from 'react-feather';
import { Controller, FieldErrors, useWatch } from 'react-hook-form';
import SimpleElevatedCard from '@flexternships/app/components/core/cards/SimpleElevatedCard';
import MultiSelectInput from '@flexternships/app/components/core/form/MultiSelectInput';
import NumberInput from '@flexternships/app/components/core/form/NumberInput';
import SingleSelectInput from '@flexternships/app/components/core/form/SingleSelectInput';
import FormFieldsStyles from '@flexternships/styles/components/core/form-fields.module.css';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { ProjectRole } from '@flexternships/types/project-creation-types';
import {
  fetchRolesPaginated,
  fetchSkillsPaginated,
  fetchToolsPaginated,
} from '@/flexternships/services/user-management';

export default function RoleCard(props: Props) {
  const { index, removable, remove, control, errors, isExpanded, expandRole, closeExpandedRole } = props;

  const role = useWatch({
    control,
    name: `projectRoles.${index}`,
  });

  const toggleExpanded = () => {
    if (isExpanded) {
      closeExpandedRole();
    } else {
      expandRole(index);
    }
  };

  return (
    <div>
      <SimpleElevatedCard className={`${Styles.roleCard} ${isExpanded ? 'max-h-[600px]' : 'max-h-[150px]'}`}>
        <div className={Styles.chevronContainer} onClick={toggleExpanded}>
          {isExpanded ? (
            <ChevronUp className="text-grey-muted cursor-pointer" size={24} />
          ) : (
            <ChevronDown className="text-grey-muted cursor-pointer" size={24} />
          )}
        </div>

        <div className="flex flex-row flex-wrap py-5 pr-6 gap-x-6 gap-y-10">
          <SingleSelectInput
            name={`projectRoles.${index}.role`}
            control={control}
            pageSize={10}
            loadOptions={fetchRolesPaginated}
            className="w-[510px]"
            label="Project Role "
            placeholder="Enter role"
            error={errors?.role?.message}
            maxMenuHeight={220}
            required
          />

          <Controller
            name={`projectRoles.${index}.count`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <NumberInput
                // className="w-[247px]"
                label="Headcount "
                min={1}
                value={value}
                onChange={onChange}
                required
              />
            )}
          ></Controller>

          <div className="flex flex-col gap-3 mx-4 min-w-[68px]">
            <div className="text-grey-500 text-xs font-normal not-italic leading-5">
              Skills <span className={FormFieldsStyles.requiredAsterisk}>*</span>
            </div>
            <div
              className={`${
                role?.skills.length
                  ? 'text-base text-grey-600 not-italic font-medium leading-6'
                  : 'text-sm text-grey-200 italic font-normal leading-5.5'
              }`}
            >
              {role?.skills.length || 'Add skills'}
            </div>
          </div>

          <div className="flex flex-col gap-3 mx-4 min-w-[68px]">
            <div className="text-grey-500 text-xs font-normal not-italic leading-5">Tools</div>
            <div
              className={`${
                role?.tools.length
                  ? 'text-base text-grey-600 not-italic font-medium leading-6'
                  : 'text-sm text-grey-200 italic font-normal leading-5.5'
              }`}
            >
              {role?.tools.length || 'Add tools'}
            </div>
          </div>

          {isExpanded && (
            <>
              <MultiSelectInput
                name={`projectRoles.${index}.skills`}
                control={control}
                pageSize={10}
                loadOptions={fetchSkillsPaginated}
                className="w-[510px]"
                label="Skills "
                placeholder="Enter skills"
                error={errors?.skills?.message}
                maxMenuHeight={220}
                required
              />
              <MultiSelectInput
                name={`projectRoles.${index}.tools`}
                control={control}
                pageSize={10}
                loadOptions={fetchToolsPaginated}
                className="w-[510px]"
                label="Tools"
                placeholder="Enter tools"
                error={errors?.tools?.message}
                maxMenuHeight={220}
              />
            </>
          )}
        </div>

        {isExpanded && removable && (
          <div className="mr-6 pb-6 flex flex-row justify-end">
            <span className={Styles.errorTextButton} onClick={remove}>
              Remove Role
            </span>
          </div>
        )}
      </SimpleElevatedCard>
    </div>
  );
}

type Props = {
  index: number;
  isExpanded: boolean;
  expandRole: (index: number) => void;
  closeExpandedRole: () => void;
  removable: boolean;
  control: any;
  remove: () => void;
  errors: FieldErrors<ProjectRole> | undefined;
};
