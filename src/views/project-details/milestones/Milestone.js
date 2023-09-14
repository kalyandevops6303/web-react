import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MilestoneListing from './MilestoneListing';
import MilestoneOverview from './MilestoneOverview';
import { projectMilestonesService } from '../../../services/projectMilestoneService';
import errorHandler from '../../../utility/errorHandler';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';

const Milestone = () => {
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState(null);
  const projectDetailsData = useSelector(projectDetails);
  const [milestonesData, setMilestonesData] = useState([]);

  const fetchProjectMilestones = async () => {
    try {
      const data = await projectMilestonesService(projectDetailsData._id).then((res) => res.data.data);
      setMilestonesData(data);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (projectDetailsData?._id) {
      fetchProjectMilestones();
    }
  }, [projectDetailsData?._id]);
  return (
    <div>
      {typeof selectedMilestoneIndex === 'number' ? (
        <MilestoneOverview
          fetchProjectMilestones={fetchProjectMilestones}
          selectedMilestone={milestonesData[selectedMilestoneIndex]}
          milestonesData={milestonesData}
          selectedMilestoneIndex={selectedMilestoneIndex}
        />
      ) : (
        <MilestoneListing milestonesData={milestonesData} setSelectedMilestoneIndex={setSelectedMilestoneIndex} />
      )}
    </div>
  );
};

export default Milestone;
