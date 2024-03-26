import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MilestoneListing from './MilestoneListing';
import { projectMilestonesService } from '../../../services/projectMilestoneService';
import errorHandler from '../../../utility/errorHandler';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';

const Milestone = () => {
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const [milestonesData, setMilestonesData] = useState([]);

  const fetchProjectMilestones = async () => {
    setLoading(true);
    try {
      const data = await projectMilestonesService(param.projectId).then((res) => res.data.data);
      setMilestonesData(data);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectMilestones();
  }, []);

  if (loading) return <ComponentSpinner />;

  return <MilestoneListing milestonesData={milestonesData} />;
};

export default Milestone;
