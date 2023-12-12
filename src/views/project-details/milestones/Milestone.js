import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MilestoneListing from './MilestoneListing';
import MilestoneOverview from './MilestoneOverview';
import { projectMilestonesService } from '../../../services/projectMilestoneService';
import errorHandler from '../../../utility/errorHandler';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const Milestone = () => {
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const projectDetailsData = useSelector(projectDetails);
  const [milestonesData, setMilestonesData] = useState([]);

  const fetchProjectMilestones = async () => {
    setLoading(true);
    try {
      const data = await projectMilestonesService(projectDetailsData._id).then((res) => res.data.data);
      setMilestonesData(data);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectDetailsData?._id) {
      fetchProjectMilestones();
    }
  }, [projectDetailsData?._id]);

  if (loading) {
    return <ComponentSpinner />;
  }
  return (
    <div>
      {typeof selectedMilestoneIndex === 'number' ? (
        <MilestoneOverview
          fetchProjectMilestones={fetchProjectMilestones}
          selectedMilestone={milestonesData[selectedMilestoneIndex]}
          selectedMilestoneIndex={selectedMilestoneIndex}
          setSelectedMilestoneIndex={setSelectedMilestoneIndex}
        />
      ) : (
        <MilestoneListing milestonesData={milestonesData} setSelectedMilestoneIndex={setSelectedMilestoneIndex} />
      )}
    </div>
  );
};

export default Milestone;
