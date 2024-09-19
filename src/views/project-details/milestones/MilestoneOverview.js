import React, { useState } from 'react';
import { ArrowLeft } from 'react-feather';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Proptypes from 'prop-types';
import theme from '../../../configs/themeVariables';
import { BackButtonContainer, BackIconContainer } from '../../CreateProject/style';
import { StickyHeader, TabWrapper } from './style';
import { selectAuthUserData } from '../../../redux/selectors/authSelectors';
import { userTypes } from '../../../utility/constants/Constant';
import RaiseDisputeModal from '../../disputes/overview/RaiseDisputeModal';
import { projectDetails } from '../../../redux/selectors/projectDetailsSelectors';
import MarkMilestoneCompleteModal from '../../modals/MarkMilestoneCompleteModal';
import FeedbackForCompleteModal from '../../modals/FeedbackForCompleteModal';
import AcceptMilestoneModal from '../../modals/AcceptMilestone';
import FeedbackForAcceptModal from '../../modals/FeedbackForAcceptModal';
import { accpetMilestone, getMilestoneDisputes, markComplete } from '../../../redux/actions/milestoneActions';
import { setConfirmSaveForLater, setNavigatingRoute } from '../../../redux/reducers/formData';

const MilestoneOverview = ({ isPaymentDone, selectedMilestone }) => {
  const userData = useSelector(selectAuthUserData);
  const projectDetailsData = useSelector(projectDetails);
  const dispatch = useDispatch();
  const [raiseDisputeModal, setRaiseDisputeModal] = useState(null);
  const [markCompleteModal, setMarkCompleteModal] = useState(false);
  const [feedbackAcceptModal, setFeedbackAcceptModal] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);
  const [feedbackCompleteModal, setFeedbackCompleteModal] = useState(false);
  const submissionHistory = useSelector((state) => state.milestone.submissionHistory);
  const param = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    if (selectedMilestone?.status === 'IN_REVIEW') navigate(`/project-details/${param?.projectId}/milestone`);
    else {
      dispatch(setConfirmSaveForLater(true));
      dispatch(setNavigatingRoute(`/project-details/${param?.projectId}/milestone`));
    }
  };
  const handleDispute = () => {
    setRaiseDisputeModal(true);
  };

  const onComplete = () => {
    const onSuccess = () => {
      setMarkCompleteModal(false);
      setFeedbackCompleteModal(true);
    };

    dispatch(markComplete({ milestoneId: param.milestoneId, onSuccess }));
  };

  const handleAccept = () => {
    setAcceptModal(true);
  };

  const onAccept = () => {
    const onSuccess = () => {
      setAcceptModal(false);
      setFeedbackAcceptModal(true);
    };

    dispatch(accpetMilestone({ milestoneId: param.milestoneId, onSuccess }));
  };

  const onDisputeSuccess = () => {
    dispatch(
      getMilestoneDisputes({
        milestoneId: param?.milestoneId,
        projectId: param?.projectId,
        metaData: { page: 1, page_size: 10 },
      }),
    );
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
              {selectedMilestone?.status === 'IN_REVIEW' && userData?.user_type === userTypes.client && (
                <Button onClick={handleAccept} className="d-contents" color="primary" disabled={projectDetailsData?.status === "DISPUTED"}>
                  Accept & Pay
                </Button>
              )}
              {selectedMilestone?.status === 'ON_GOING' && userData?.user_type !== userTypes.client && (
                <Button
                  disabled={submissionHistory?.data?.length === 0 || !isPaymentDone}
                  onClick={() => setMarkCompleteModal(true)}
                  className="d-contents"
                  color="primary"
                >
                  Mark as complete
                </Button>
              )}
            </div>
          </div>
        </div>
      </StickyHeader>

      {raiseDisputeModal && (
        <RaiseDisputeModal
          modal={raiseDisputeModal}
          fetchMilestoneDisutes={onDisputeSuccess}
          toggleModal={() => setRaiseDisputeModal(!raiseDisputeModal)}
          primaryFilter="all"
          projectDetail={{ label: projectDetailsData?.details?.name, value: projectDetailsData?._id }}
        />
      )}
      {markCompleteModal && (
        <MarkMilestoneCompleteModal
          data={selectedMilestone}
          modal={markCompleteModal}
          toggleModal={() => setMarkCompleteModal(!markCompleteModal)}
          onSuccess={onComplete}
        />
      )}
      {feedbackCompleteModal && (
        <FeedbackForCompleteModal
          data={selectedMilestone}
          modal={feedbackCompleteModal}
          toggleModal={() => {
            setFeedbackCompleteModal(!feedbackCompleteModal);
            setMarkCompleteModal(false);
          }}
          projectName={projectDetailsData?.details?.name}
        />
      )}
      {acceptModal && (
        <AcceptMilestoneModal
          data={selectedMilestone}
          modal={acceptModal}
          toggleModal={() => setAcceptModal(!acceptModal)}
          // isLoading={isLoading}
          onSuccess={onAccept}
        />
      )}
      {feedbackAcceptModal && (
        <FeedbackForAcceptModal
          data={selectedMilestone}
          modal={feedbackAcceptModal}
          toggleModal={() => {
            setFeedbackAcceptModal(!feedbackAcceptModal);
            setAcceptModal(false);
          }}
        />
      )}
    </TabWrapper>
  );
};

MilestoneOverview.propTypes = {
  selectedMilestone: Proptypes.object,
  isPaymentDone: Proptypes.bool,
};

MilestoneOverview.defaultProps = {
  selectedMilestone: {},
  isPaymentDone: false,
};
export default MilestoneOverview;
