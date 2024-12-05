import { MilestoneDetails } from '@/flexternships/constraints/types/project-milestones-types';
import MilestoneTile from './MilestoneTile';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

type DefaultMilestonesViewProps = {
  milestones: MilestoneDetails[];
};

export default function DefaultMilestonesView(props: DefaultMilestonesViewProps) {
  const { milestones } = props;

  const [isAnyMilestoneBlocked, setIsAnyMilestoneBlocked] = useState(false);

  useEffect(() => {
    !isEmpty(milestones) && setIsAnyMilestoneBlocked(milestones.some((milestone) => milestone.isBlocked));
  }, [milestones]);

  return (
    <>
      {milestones.map((milestone, index) => (
        <MilestoneTile data={milestone} key={index} disabled={isAnyMilestoneBlocked && !milestone?.isBlocked} />
      ))}
    </>
  );
}
