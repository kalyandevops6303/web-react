import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton'
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText'
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard'
import Spinner from '@/flexternships/app/components/core/Spinner'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/flexternships/app/components/ui/accordion'
import { ToastType, UserType } from '@/flexternships/constraints/enums/core-enums'
import { useFlexternUserStore } from '@/flexternships/stores/core-stores'
import { useProjectMilestonesStore } from '@/flexternships/stores/project-milestones-store'
import { showToastMessage } from '@/flexternships/utils/core-utils'
import { formatEpochToHumanReadable } from '@/flexternships/utils/date-utils'
import { useEffect, useState } from 'react'
import { ArrowLeft, Check } from 'react-feather'
import { useNavigate, useParams } from 'react-router-dom'
import SubmissionItem from './SubmissionItem'

export default function MilestoneDetails() {
    const userDetails = useFlexternUserStore((state) => state.userDetails);
    const milestoneDetails = useProjectMilestonesStore((state) => state.milestoneDetails);
    const populateMilestoneDetails = useProjectMilestonesStore((state) => state.populateMilestoneDetails);

    const [isDetailsLoading, setIsDetailsLoading] = useState(true);

    const navigate = useNavigate();
    const { milestoneId } = useParams();

    useEffect(() => {
        const fetchMilestoneDetails = async () => {
            if (!milestoneId) return;

            setIsDetailsLoading(true);
            try {
                await populateMilestoneDetails(milestoneId);
            } catch (error: unknown) {
                showToastMessage(ToastType.ERROR, error instanceof Error ? error.message : 'Error fetching milestone details');
            } finally {
                setIsDetailsLoading(false);
            }
        }
        fetchMilestoneDetails();
    }, [milestoneId, populateMilestoneDetails]);

    const goBackToAllMilestones = () => {
        navigate(-1);
    }
    const handleMilestonePrimaryAction = () => {
        // TODO: Implement accept milestone and mark as completed
    }

    if (isDetailsLoading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-48'>
                <div className='h-8 w-8'>
                    <Spinner />
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-y-6'>
            <div className='flex flex-row justify-between'>
                <PrimaryIconText icon={<ArrowLeft className='text-white' />} text='All Milestones' onClick={goBackToAllMilestones} bgDark />
                <PrimaryButton onClick={handleMilestonePrimaryAction}>
                    {userDetails.userType === UserType.CLIENT ? 'Accept' : 'Mark as Completed'}
                </PrimaryButton>
            </div>
            <SimpleElevatedCard className='flex flex-col px-8 pt-6 pb-10 gap-y-10 bg-white-fa overflow-hidden'>
                <div className='flex flex-row'>
                    <h1>
                        Milestone {milestoneDetails.seq}
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
                            {formatEpochToHumanReadable(milestoneDetails?.startDate ?? 0, true)}
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-1.5'>
                        <div className='text-sm font-normal not-italic leading-5.5 text-grey'>
                            Duration
                        </div>
                        <div className='text-lg font-semibold not-italic text-grey-heading'>
                            {milestoneDetails?.estimatedDuration?.duration}w
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-1.5'>
                        <div className='text-sm font-normal not-italic leading-5.5 text-grey'>
                            Hours/week
                        </div>
                        <div className='text-lg font-semibold not-italic text-grey-heading'>
                            255 hr {/* Query: Hours per week of milestone */}
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
                            {milestoneDetails?.name}
                        </p>
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <h2 className='text-lg font-normal not-italic text-grey-heading'>
                            Description
                        </h2>
                        <p className='text-sm font-normal not-italic leading-5.5 text-grey'>
                            {milestoneDetails?.description}
                        </p>
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <h2 className='text-lg font-normal not-italic text-grey-heading'>
                            Deliverables
                        </h2>
                        <ul className='list-none'>
                            {
                                milestoneDetails?.deliverables?.map((deliverable, index) => (
                                    <li key={index} className='relative pl-6 text-sm font-normal not-italic leading-5.5 text-grey before:content-["."] before:text-xl before:absolute before:left-2 before:bottom-0.5'>
                                        {deliverable}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </SimpleElevatedCard>
            </SimpleElevatedCard>
            <SimpleElevatedCard className='overflow-hidden'>
                <Accordion type='single' collapsible className='w-full'>
                    <AccordionItem value='submission-history' className='border-none bg-white-fa py-6 px-8'>
                        <AccordionTrigger className='hover:no-underline p-0'>
                            <div className='text-lg font-medium not-italic text-grey-heading'>
                                Submission History
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className=''>
                            <div className='shadow-table w-full mt-6 border-1 border-solid border-grey-border bg-white rounded-md overflow-hidden'>
                                <div className='flex flex-row items-center border-b-1 border-solid border-grey-border bg-grey-background min-h-10 px-1.5'>
                                    <div className='px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[212px]'>
                                        Name
                                    </div>
                                    <div className='px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[319px]'>
                                        Description
                                    </div>
                                    <div className='px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[126px]'>
                                        Submitted By
                                    </div>
                                    <div className='px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[194px]'>
                                        Submitted On
                                    </div>
                                    <div className='px-2.5 text-grey-heading text-xs not-italic font-semibold tracking-wide uppercase w-[122px]'>
                                        Action
                                    </div>
                                </div>
                                <div>
                                    {
                                        milestoneDetails?.submissions?.map((submission, index) => (
                                            <SubmissionItem key={index} data={submission} last={index === milestoneDetails.submissions.length - 1} />
                                        ))
                                    }
                                </div>
                            </div>
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