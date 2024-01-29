import React from 'react';
import { ArrowLeft } from 'react-feather';
import Proptypes from 'prop-types';

import theme from '../../../configs/themeVariables';
import MilestoneDetailsTab from './MilestoneDetailsTab';
import { BackButtonContainer, BackIconContainer } from '../../CreateProject/style';
import { TabWrapper } from './style';

const MilestoneOverview = ({
  setSelectedMilestone,
  setSelectedMilestoneIndex,
  selectedMilestone,
  fetchProjectMilestones,
}) => (
  <TabWrapper>
    <BackButtonContainer className="p-0 mb-1">
      <div
        onClick={() => {
          setSelectedMilestoneIndex(null);
          setSelectedMilestone(null);
        }}
        className="p-0 d-flex"
      >
        <BackIconContainer>
          <ArrowLeft size={18} color={theme.white} />
        </BackIconContainer>
        <h4 className="m-0 fw-light blue-text mt-25 mx-50">Go to Milestone</h4>
      </div>
    </BackButtonContainer>

    <MilestoneDetailsTab
      setSelectedMilestoneIndex={setSelectedMilestoneIndex}
      fetchProjectMilestones={fetchProjectMilestones}
      selectedMilestone={selectedMilestone}
    />
  </TabWrapper>
);

MilestoneOverview.propTypes = {
  setSelectedMilestone: Proptypes.func.isRequired,
  selectedMilestone: Proptypes.object.isRequired,
  fetchProjectMilestones: Proptypes.func.isRequired,
  setSelectedMilestoneIndex: Proptypes.func.isRequired,
};

export default MilestoneOverview;
