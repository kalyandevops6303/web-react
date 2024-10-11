import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import { Controller, FieldErrors, useWatch } from 'react-hook-form';
import SimpleElevatedCard from '@flexternships/app/components/core/cards/SimpleElevatedCard';
import MultiSelectInput from '@flexternships/app/components/core/form/MultiSelectInput';
import NumberInput from '@flexternships/app/components/core/form/NumberInput';
import SingleSelectInput from '@flexternships/app/components/core/form/SingleSelectInput';
import { useStaticDataStore } from '@flexternships/stores/static-data-store';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { ProjectRole } from '@flexternships/types/project-creation-types';

export default function RoleCard(props: Props) {
    const { index, removable, remove, control, errors } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    const rolesData = useStaticDataStore((state) => state.roles);
    const skillsData = useStaticDataStore((state) => state.skills);
    const toolsData = useStaticDataStore((state) => state.tools);

    const role = useWatch({
        control,
        name: `projectRoles.${index}`,
    });

    return (
        <div>
            <SimpleElevatedCard
                className={`${Styles.roleCard} ${isExpanded ? 'max-h-[600px]' : 'max-h-[150px]'}`}
            >
                <div className={Styles.chevronContainer} onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? (
                        <ChevronUp className="text-grey-muted cursor-pointer" size={24} />
                    ) : (
                        <ChevronDown className="text-grey-muted cursor-pointer" size={24} />
                    )}
                </div>

                <div className="flex flex-row flex-wrap">
                    <Controller
                        name={`projectRoles.${index}.role`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <SingleSelectInput
                                value={value}
                                onChange={onChange}
                                choices={rolesData ?? []}
                                className="w-[510px]"
                                label="Project Role "
                                placeholder="Enter role"
                                required/>
                        )}>
                    </Controller>
                    <Controller
                        name={`projectRoles.${index}.count`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <NumberInput
                                className="w-[247px]"
                                label="Count "
                                min={1}
                                value={value}
                                onChange={onChange}
                                required
                            />
                        )}>
                    </Controller>

                    {
                        role?.skills.length > 0 && (
                            <div className='flex flex-col justify-center gap-1 mr-10 items-center'>
                                <div className='text-grey-500 text-xs font-normal not-italic leading-5'>
                                    Skills
                                </div>
                                <div className='mt-2 text-base text-grey-600 not-italic font-medium leading-6'>
                                    {role?.skills.length}
                                </div>
                            </div>
                        )
                    }

                    {
                        role?.tools.length > 0 && (
                            <div className='flex flex-col justify-center gap-1 items-center'>
                                <div className='text-grey-500 text-xs font-normal not-italic leading-5'>
                                    Tools
                                </div>
                                <div className='mt-2 text-base text-grey-600 not-italic font-medium leading-6'>
                                    {role?.tools.length}
                                </div>
                            </div>
                        )
                    }

                    {isExpanded && (
                        <>

                            <MultiSelectInput
                                name={`projectRoles.${index}.skills`}
                                control={control}
                                choices={skillsData ?? []}
                                className="w-[510px]"
                                label="Skills "
                                placeholder="Enter skills"
                                error={errors?.skills?.message}
                                required
                            />
                            <MultiSelectInput
                                name={`projectRoles.${index}.tools`}
                                control={control}
                                choices={toolsData ?? []}
                                className="w-[510px]"
                                label="Tools"
                                placeholder="Enter tools"
                                error={errors?.tools?.message}
                            />
                        </>
                    )}
                </div>


                {(isExpanded && removable) && (
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
    removable: boolean
    control: any;
    remove: () => void;
    errors: FieldErrors<ProjectRole> | undefined;
};