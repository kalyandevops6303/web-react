import React, { useState } from 'react';
import MilestoneListing from './MilestoneListing';
import MilestoneOverview from './MilestoneOverview';

const Milestone = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  return (
    <div>
      {selectedMilestone ? (
        <MilestoneOverview selectedMilestone={selectedMilestone} />
      ) : (
        <MilestoneListing setSelectedMilestone={setSelectedMilestone} />
      )}
    </div>
  );
};

export default Milestone;
