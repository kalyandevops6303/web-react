import MilestoneTile from './MilestoneTile'
import { MilestoneStatus } from '@flexternships/enums/core-enums'

export default function MilestoneTab() {
  const milestones = [
    {
      title: 'Milestone 1',
      status: MilestoneStatus.ACTIVE,
      startDate: 1729382400,
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
    </div>
  )
}