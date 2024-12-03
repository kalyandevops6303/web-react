import { MilestoneDetails } from '@/flexternships/constraints/types/project-milestones-types';
import MilestoneTile from './MilestoneTile';

type DefaultMilestonesViewProps = {
  milestones: MilestoneDetails[];
};

export default function DefaultMilestonesView(props: DefaultMilestonesViewProps) {
  const { milestones } = props;
  return (
    <>
      {milestones.map((milestone, index) => (
        <MilestoneTile data={milestone} key={index} />
      ))}
    </>
  );
}
