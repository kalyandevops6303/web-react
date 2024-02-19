import React from 'react';
import { ArrowLeft } from 'react-feather';
import Proptypes from 'prop-types';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';

import theme from '../../../configs/themeVariables';
import MilestoneDetailsTab from './MilestoneDetailsTab';
import { BackButtonContainer, BackIconContainer } from '../../CreateProject/style';
import { StickyHeader, TabWrapper } from './style';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';

const MilestoneOverview = ({
  setSelectedMilestone,
  setSelectedMilestoneIndex,
  selectedMilestone,
  fetchProjectMilestones,
}) => {
  const userData = useSelector(selectAuthUserData);
  return (
    <TabWrapper>
      <StickyHeader>
        <div className="fixed-head">
          <div className="inner-head">
            <BackButtonContainer className="p-0">
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
                <h4 className="m-0 fw-light blue-text mt-25 mx-50">Go to Milestones</h4>
              </div>
            </BackButtonContainer>
            <div>
              <Button className="me-2 raise-dispute-btn">Raise Dispute</Button>
              {userData?.user_type === userTypes.client ? (
                <Button className="d-contents" color="primary">
                  Accept
                </Button>
              ) : (
                <Button className="d-contents" color="primary">
                  Mark as complete
                </Button>
              )}
            </div>
          </div>
        </div>
      </StickyHeader>

      <MilestoneDetailsTab
        setSelectedMilestoneIndex={setSelectedMilestoneIndex}
        fetchProjectMilestones={fetchProjectMilestones}
        selectedMilestone={selectedMilestone}
      />
    </TabWrapper>
  );
};

MilestoneOverview.propTypes = {
  setSelectedMilestone: Proptypes.func.isRequired,
  selectedMilestone: Proptypes.object.isRequired,
  fetchProjectMilestones: Proptypes.func.isRequired,
  setSelectedMilestoneIndex: Proptypes.func.isRequired,
};

export default MilestoneOverview;
