import React from 'react'
import MilestoneTile from './MilestoneTile'
import { MilestoneFeedbackStatus, MilestoneFeedbackType, MilestoneStatus } from '@flexternships/enums/core-enums'
import MilestoneDetails from './MilestoneDetails'

export default function MilestoneTab() {
  const milestones = [
    {
      _id: '1',
      title: 'Milestone 1',
      status: MilestoneStatus.ACTIVE,
      startDate: 1729382400,
      feedback: {
        type: MilestoneFeedbackType.TEAM_FEEDBACK,
        status: MilestoneFeedbackStatus.PENDING,
      }
    }
  ]
  return (
    <div className='flex flex-col gap-4'>
      {/* TODO: MilestoneTile */}
      {
        milestones.map((milestone) => (
          <MilestoneTile data={milestone} />
        ))
      }
      <div>
        <MilestoneDetails />
      </div>
    </div>
  )
}