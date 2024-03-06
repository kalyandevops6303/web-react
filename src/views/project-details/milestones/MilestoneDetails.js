import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MilestoneOverview from './MilestoneOverview';
import { getMilestoneDetail } from '../../../redux/actions/milestoneActions';
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner';
import { clearData } from '../../../redux/reducers/milestone';
import MilestoneDetailsTab from './MilestoneDetailsTab';
import { TabWrapper } from './style';
import SubmissionHistory from './SubmissionHistory';

const MilestoneDetails = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const currentMilestone = useSelector((state) => state.milestone.milestoneData);
  const isLoading = useSelector((state) => state.milestone.loading);
  useEffect(() => {
    dispatch(getMilestoneDetail({ milestoneId: param?.milestoneId }));

    return () => {
      dispatch(clearData());
    };
  }, []);
  if (isLoading) {
    return <ComponentSpinner />;
  }
  return (
    <div style={{ minHeight: '75rem' }}>
      <MilestoneOverview selectedMilestone={currentMilestone} />
      <TabWrapper>{currentMilestone && <MilestoneDetailsTab selectedMilestone={currentMilestone} />}</TabWrapper>
      <SubmissionHistory selectedMilestone={currentMilestone} />
    </div>
  );
};

export default MilestoneDetails;
