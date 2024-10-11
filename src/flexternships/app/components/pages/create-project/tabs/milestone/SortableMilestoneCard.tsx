import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'react-feather';
import { Controller, FieldErrors, useFieldArray, UseFormRegister } from 'react-hook-form';
import PrimaryIconText from '@flexternships/app/components/core/buttons/PrimaryIconText';
import SimpleElevatedCard from '@flexternships/app/components/core/cards/SimpleElevatedCard';
import TextInput from '@flexternships/app/components/core/form/TextInput';
import Styles from '@flexternships/styles/pages/create-project/tabs.module.css';
import { Milestone } from '@flexternships/types/project-creation-types';

export default function SortableMilestoneCard(props: Props) {
    const { id, milestoneIndex, removable, control, remove, errors } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        maxHeight: isDragging ? '150px':'600px',
    };

    const { fields: deliverables, append: appendDeliverable, remove: removeDeliverable } = useFieldArray({
        control,
        name: `milestones.${milestoneIndex}.deliverables`,
    });

    useEffect(() => {
        setIsExpanded((cur) => (isDragging ? false : cur));
    }, [isDragging]);

    console.log(deliverables);


    return (
        <div ref={setNodeRef} style={style}>
            <SimpleElevatedCard
                className={`${Styles.roleCard} ${isExpanded ? 'max-h-[600px]' : 'max-h-[150px]'}`}
            >
                <div className={Styles.chevronContainer} onClick={toggleExpand}>
                    {isExpanded ? (
                        <ChevronUp className="text-grey-muted cursor-pointer" size={24} />
                    ) : (
                        <ChevronDown className="text-grey-muted cursor-pointer" size={24} />
                    )}
                </div>
                <div className="flex flex-row flex-wrap">
                    <div className='self-center mr-5' {...attributes} {...listeners}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_6220_37698" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="3" y="7" width="18" height="10">
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.5601 9.80078H4.4401C3.9361 9.80078 3.6001 9.40078 3.6001 8.80078C3.6001 8.20078 3.9361 7.80078 4.4401 7.80078H19.5601C20.0641 7.80078 20.4001 8.20078 20.4001 8.80078C20.4001 9.40078 20.0641 9.80078 19.5601 9.80078ZM19.5601 16.6C20.0641 16.6 20.4001 16.2 20.4001 15.6C20.4001 15 20.0641 14.6 19.5601 14.6H4.4401C3.9361 14.6 3.6001 15 3.6001 15.6C3.6001 16.2 3.9361 16.6 4.4401 16.6H19.5601Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_6220_37698)">
                                <rect width="24" height="24" fill="#B9B9C3" />
                            </g>
                        </svg>
                    </div>
                    <Controller
                        name={`milestones.${milestoneIndex}.title`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <TextInput
                                value={value}
                                onChange={onChange}
                                className="w-[510px]" 
                                label={`Milestone  ${milestoneIndex + 1}`} 
                                placeholder="Enter milestone"
                                error={errors?.title?.message}
                                required />
                        )}>
                    </Controller>
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
                                type='numeric'
                                extra="wk"
                                error={errors?.duration?.message}
                                required />
                        )}>
                    </Controller>

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
                                        className="w-[554px]" 
                                        label="Description" 
                                        placeholder="Enter description"
                                        tooltip='This is a mandatory field'
                                        error={errors?.description?.message}
                                        textarea required />
                                )}>
                            </Controller>
                            <div className='flex flex-col'>
                                {
                                    deliverables.map((field, index) => (
                                        <div key={field.id} className='relative'>
                                            <Controller
                                                name={`milestones.${milestoneIndex}.deliverables.${index}`}
                                                control={control}
                                                render={({ field: { value, onChange } }) => (
                                                    <TextInput
                                                        value={value}
                                                        onChange={onChange}
                                                        key={field.id}
                                                        className="w-[428px]"
                                                        label="Deliverables"
                                                        placeholder="Enter deliverables"
                                                        error={errors?.deliverables?.[index]?.message}
                                                    />
                                                )}>
                                            </Controller>
                                            {
                                                deliverables.length > 1 && (
                                                    <span className='absolute -right-2 bottom-[35px] text-error cursor-pointer' onClick={() => (removeDeliverable(index))}>
                                                        <Trash2 size={18} />
                                                    </span>
                                                )
                                            }
                                        </div>

                                    ))
                                }
                                <div>
                                    <PrimaryIconText className={'mt-2'} text='Add Deliverables' icon={<Plus className={'text-trublue'} size={18} />} onClick={() => appendDeliverable('')} />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Display the Remove Role button only if expanded */}
                <div className="mr-6 pb-6 flex flex-row justify-end">

                    {(isExpanded && removable) && (
                        <span className={Styles.errorTextButton} onClick={remove}>
                            Remove Milestone
                        </span>
                    )}
                </div>
            </SimpleElevatedCard>
        </div>
    );
}

type Props = {
    id: string
    milestoneIndex: number
    removable: boolean
    control: any;
    remove: () => void;
    errors: FieldErrors<Milestone> | undefined;
};