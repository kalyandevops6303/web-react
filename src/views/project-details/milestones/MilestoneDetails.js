import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MilestoneOverview from './MilestoneOverview';
import { getMilestoneDetail } from '../../../redux/actions/milestoneActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { clearData } from '../../../redux/reducers/milestone';

const MilestoneDetails = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const currentMilestone = useSelector((state) => state.milestone.milestoneData);
  const isLoading = useSelector((state) => state.milestone.loading);
  useEffect(() => {
    dispatch(getMilestoneDetail({ projectId: param?.projectId }));

    return () => {
      dispatch(clearData());
    };
  }, []);
  if (isLoading) {
    return <ComponentSpinner />;
  }
  return <MilestoneOverview selectedMilestone={currentMilestone} />;
};

export default MilestoneDetails;
