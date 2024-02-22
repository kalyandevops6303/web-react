import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'react-feather';
import Proptypes from 'prop-types';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import theme from '../../../configs/themeVariables';
import MilestoneDetailsTab from './MilestoneDetailsTab';
import { BackButtonContainer, BackIconContainer } from '../../CreateProject/style';
import { StickyHeader, TabWrapper } from './style';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import { clearData } from '../../../redux/reducers/milestone';
import RaiseDisputeModal from '../../disputes/overview/RaiseDisputeModal';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import MarkMilestoneCompleteModal from '../../modals/MarkMilestoneCompleteModal';
import FeedbackForCompleteModal from '../../modals/FeedbackForCompleteModal';

const MilestoneOverview = ({ setSelectedMilestoneIndex, selectedMilestone, fetchProjectMilestones }) => {
  const userData = useSelector(selectAuthUserData);
  const projectDetailsData = useSelector(projectDetails);

  const [raiseDisputeModal, setRaiseDisputeModal] = useState(null);
  const [markCompleteModal, setMarkCompleteModal] = useState(false);
  const [feedbackCompleteModal, setFeedbackCompleteModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  useEffect(() => () => dispatch(clearData()), []);
  const handleBack = () => {
    navigate(`/project-details/${param?.projectId}/milestone`);
  };
  const handleDispute = () => {
    setRaiseDisputeModal(true);
  };

  const onComplete = () => {
    setFeedbackCompleteModal(true);
  };

  return (
    <TabWrapper>
      <StickyHeader>
        <div className="fixed-head">
          <div className="inner-head">
            <BackButtonContainer className="p-0">
              <div onClick={handleBack} className="p-0 d-flex">
                <BackIconContainer>
                  <ArrowLeft size={18} color={theme.white} />
                </BackIconContainer>
                <h4 className="m-0 fw-light blue-text mt-25 mx-50">Go to Milestones</h4>
              </div>
            </BackButtonContainer>
            <div>
              <Button onClick={handleDispute} className="me-2 raise-dispute-btn">
                Raise Dispute
              </Button>
              {userData?.user_type === userTypes.client ? (
                <Button className="d-contents" color="primary">
                  Accept
                </Button>
              ) : (
                <Button onClick={() => setMarkCompleteModal(true)} className="d-contents" color="primary">
                  Mark as complete
                </Button>
              )}
            </div>
          </div>
        </div>
      </StickyHeader>

      {selectedMilestone && (
        <MilestoneDetailsTab
          setSelectedMilestoneIndex={setSelectedMilestoneIndex}
          fetchProjectMilestones={fetchProjectMilestones}
          selectedMilestone={selectedMilestone}
        />
      )}
      {raiseDisputeModal && (
        <RaiseDisputeModal
          modal={raiseDisputeModal}
          toggleModal={() => setRaiseDisputeModal(!raiseDisputeModal)}
          primaryFilter="all"
          projectDetail={{ label: projectDetailsData?.details?.name, value: projectDetailsData?._id }}
        />
      )}
      {markCompleteModal && (
        <MarkMilestoneCompleteModal
          modal={markCompleteModal}
          toggleModal={() => setMarkCompleteModal(!markCompleteModal)}
          onSuccess={onComplete}
        />
      )}
      {feedbackCompleteModal && (
        <FeedbackForCompleteModal
          modal={feedbackCompleteModal}
          toggleModal={() => {
            setFeedbackCompleteModal(!feedbackCompleteModal);
            setMarkCompleteModal(false);
          }}
        />
      )}
    </TabWrapper>
  );
};

MilestoneOverview.propTypes = {
  selectedMilestone: Proptypes.object.isRequired,
  fetchProjectMilestones: Proptypes.func.isRequired,
  setSelectedMilestoneIndex: Proptypes.func.isRequired,
};

export default MilestoneOverview;
