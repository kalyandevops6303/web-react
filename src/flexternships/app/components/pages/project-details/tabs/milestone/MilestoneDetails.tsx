import PrimaryButton from '@/flexternships/app/components/core/buttons/PrimaryButton'
import PrimaryIconText from '@/flexternships/app/components/core/buttons/PrimaryIconText'
import SimpleElevatedCard from '@/flexternships/app/components/core/cards/SimpleElevatedCard'
import React from 'react'
import { ArrowLeft } from 'react-feather'

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
            <SimpleElevatedCard className='flex flex-col p-6 gap-y-10 bg-white'>
                <div className='flex flex-row'>
                    <h1>
                        Milestone 5
                    </h1>
                    <div>
                        In Progress
                    </div>
                </div>
                <div>
                    <div>
                        Start
                    </div>
                    <div>
                        Apr 12, 23
                    </div>
                </div>
                <SimpleElevatedCard>
                    <div>
                        <h2>
                            Milestone Name
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                        </p>
                    </div>
                    <div>
                        <h2>
                            Milestone Name
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                        </p>
                    </div>
                </SimpleElevatedCard>
            </SimpleElevatedCard>
            <SimpleElevatedCard>
                <div> {/** TODO: Accordion */}
                    Submission History
                </div>
            </SimpleElevatedCard>
            <div></div>
        </div>
    )
}