import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton'
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText'
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/flexternships/app/components/ui/accordion'
import React from 'react'
import { ArrowLeft, Check } from 'react-feather'

export default function MilestoneDetails() {
    const goBackToAllMilestones = () => {
        // navigate(-1);
        // TODO: Implement go back to all milestones
    }
    const acceptMilestone = () => {
        // TODO: Implement accept milestone
    }
    return (
        <div className='flex flex-col gap-y-6'>
            <div className='flex flex-row justify-between'>
                <PrimaryIconText icon={<ArrowLeft className='text-white' />} text='All Milestones' onClick={goBackToAllMilestones} bgDark />
                <PrimaryButton onClick={acceptMilestone}>
                    Accept
                </PrimaryButton>
            </div>
            <SimpleElevatedCard className='flex flex-col px-8 pt-6 pb-10 gap-y-10 bg-white-fa overflow-hidden'>
                <div className='flex flex-row'>
                    <h1>
                        Milestone 5
                    </h1>
                    <div>
                        In Progress
                    </div>
                </div>
                <div className='flex flex-row gap-x-20'>
                    <div className='flex flex-col gap-y-1.5'>
                        <div className='text-sm font-normal not-italic leading-5.5 text-grey'>
                            Start
                        </div>
                        <div className='text-lg font-semibold not-italic text-grey-heading'>
                            Apr 12, 23
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-1.5'>
                        <div className='text-sm font-normal not-italic leading-5.5 text-grey'>
                            Duration
                        </div>
                        <div className='text-lg font-semibold not-italic text-grey-heading'>
                            3w
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-1.5'>
                        <div className='text-sm font-normal not-italic leading-5.5 text-grey'>
                            Hours/week
                        </div>
                        <div className='text-lg font-semibold not-italic text-grey-heading'>
                            255 hr
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-1.5'>
                        <div className='text-sm font-normal not-italic leading-5.5 text-grey'>
                            Status
                        </div>
                        <div className='text-lg font-semibold not-italic text-grey-heading'>
                            In Progress
                        </div>
                    </div>
                </div>
                <SimpleElevatedCard className='flex flex-col p-6 gap-y-6 overflow-hidden'>
                    <div className='flex flex-col gap-y-4'>
                        <h2 className='text-lg font-normal not-italic text-grey-heading'>
                            Milestone Name
                        </h2>
                        <p className='text-sm font-normal not-italic leading-5.5 text-grey'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                        </p>
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <h2 className='text-lg font-normal not-italic text-grey-heading'>
                            Description
                        </h2>
                        <p className='text-sm font-normal not-italic leading-5.5 text-grey'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                        </p>
                    </div>
                </SimpleElevatedCard>
            </SimpleElevatedCard>
            <SimpleElevatedCard className='overflow-hidden'>
                <Accordion type='single' collapsible className='w-full'>
                    <AccordionItem value='submission-history' className='border-none bg-white-fa'>
                        <AccordionTrigger className='py-6 px-8 hover:no-underline'>
                            <div className='text-lg font-medium not-italic text-grey-heading'>
                                Submission History
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className='px-8 pb-6'>
                            Submission History
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </SimpleElevatedCard>
            <div className='flex flex-col gap-y-6'>
                <div className='flex flex-row justify-between items-center px-6 py-5 bg-success bg-opacity-[0.12] rounded-md'>
                    <div className='flex flex-row items-center gap-x-3'>
                        <span className='text-center align-middle bg-success rounded-full p-[5px]'>
                            <Check size={15} className='text-white' />
                        </span>
                        <div className='text-success text-base not-italic font-semibold leading-6'>
                            Team Feedback Completed
                        </div>
                    </div>
                    <span className='text-trublue-secondary-500 text-base not-italic font-medium cursor-pointer'>
                        View
                    </span>
                </div>
            </div>
        </div>
    )
}