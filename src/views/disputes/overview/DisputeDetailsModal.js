import React, { useRef, useState } from 'react';
import Proptypes from 'prop-types';
import '../../custom-styles.scss';
import { Modal, ModalHeader, ModalBody, Row, Col, Input, Button, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Upload } from 'react-feather';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { DisputeDetailsContainer } from '../style';
import theme from '../../../configs/themeVariables';
import Timeline from '../../../@core/components/timeline';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';
import { disputeStatusEnum } from '../../../utility/constants/Constant';
import DateTime from '../../../lib/date-time';
import { replyOnDisputeApi } from '../../../redux/actions/disputeActions';
import { replyOnDisputeLoading } from '../../../redux/selectors/disputeSelectors';

const DisputeDetailsModal = ({ modal, toggleModal, selectedDispute }) => {
  const timelineData = [
    {
      isDisabled: false,
      color: theme.orangeColor,
      customContent: (
        <div>
          <div className="d-flex justify-content-between mb-25">
            <p className="fw-bold mb-0">Dispute Response</p>
            <p className="font-small-3 mb-0">2 Day ago</p>
          </div>
          <p>Apr 28, 23</p>
          <div className="d-flex align-items-center">
            <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" className="me-50" />
            <div>
              <p className="fw-bold mb-0">Leona Watkins (Team Member)</p>
              <p className="mb-0">R&D</p>
            </div>
          </div>
          <p className="fw-bold mt-1 mb-75">Dispute Type</p>
          <p className="font-medium-1">
            labore et dolore magna aliqua. Eu scelerisque felis imperdiet proin fermentum. Donec enim diam vulputate ut
            pharetra sit. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere.
          </p>
        </div>
      ),
    },
    {
      isDisabled: false,
      color: theme.orangeColor,
      customContent: (
        <div>
          <div className="d-flex justify-content-between mb-25">
            <p className="fw-bold mb-0">Dispute Accepted & Under Review</p>
            <p className="font-small-3 mb-0">2 Day ago</p>
          </div>
          <p>Apr 28, 23</p>
          <div className="d-flex align-items-center">
            <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" className="me-50" />
            <div>
              <p className="fw-bold mb-0">Leona Watkins (Team Member)</p>
              <p className="mb-0">R&D</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      isDisabled: false,
      color: theme.orangeColor,
      customContent: (
        <div>
          <div className="d-flex justify-content-between mb-25">
            <p className="fw-bold mb-0">Dispute Raise</p>
            <p className="font-small-3 mb-0">2 Day ago</p>
          </div>
          <p>Apr 28, 23</p>
          <div className="d-flex align-items-center">
            <Avatar img={defaultAvatar} imgHeight="38" imgWidth="38" className="me-50" />
            <div>
              <p className="fw-bold mb-0">Leona Watkins (Client)</p>
              <p className="mb-0">CEO of Figma</p>
            </div>
          </div>
          <p className="fw-bold mt-1 mb-75">Dispute Type</p>
          <p className="font-medium-1">
            labore et dolore magna aliqua. Eu scelerisque felis imperdiet proin fermentum. Donec enim diam vulputate ut
            pharetra sit.
          </p>
        </div>
      ),
    },
  ];

  const dispatch = useDispatch();

  const replyOnDisputeIsLoading = useSelector(replyOnDisputeLoading);

  const { dispute_number, project, status, created_at, _id } = selectedDispute;

  const [updatedTimelineData, setUpdatedTimelineData] = useState(timelineData);
  const [isReplyBoxPresent, setIsReplyBoxPresent] = useState(false);

  const rep = useRef('');

  const onSuccess = () => {
    setIsReplyBoxPresent(false);
    rep.current = '';
  };

  const onSubmit = () => {
    if (rep.current.length > 0) {
      const data = {
        dispute_id: _id,
        reply: rep.current,
      };

      dispatch(replyOnDisputeApi(data, onSuccess));
    } else {
      ShowToastMessage(ERROR, 'Please enter your response to dispute before submitting');
    }
  };

  const onCancelClick = () => {
    setUpdatedTimelineData(updatedTimelineData);
    setIsReplyBoxPresent(false);
  };

  const onReplyClick = () => {
    const newReply = {
      isDisabled: false,
      color: theme.orangeColor,
      customContent: (
        <div>
          <div className="mb-25">
            <p className="fw-bold mb-0">Response Dispute</p>
          </div>
          <div>
            <Row className="mb-1">
              <Col sm="12" md="12" lg="6">
                <Input
                  type="textarea"
                  placeholder="Enter your response to dispute"
                  rows="3"
                  // eslint-disable-next-line no-return-assign
                  onChange={(e) => (rep.current = e.target.value)}
                />
              </Col>
            </Row>
            <Button color="primary" className="mt-2 d-flex align-items-center py-50">
              <Upload size={18} className="me-75" />
              Upload
            </Button>
            <div className="d-flex justify-content-end">
              <Button outline color="primary" className="me-3" onClick={onCancelClick}>
                Cancel
              </Button>
              <Button color="primary" onClick={onSubmit} disabled={replyOnDisputeIsLoading}>
                {replyOnDisputeIsLoading ? <Spinner size="sm" /> : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
      ),
    };

    if (!isReplyBoxPresent) {
      setUpdatedTimelineData([newReply, ...updatedTimelineData]);
      setIsReplyBoxPresent(true);
    }
  };

  return (
    <Modal isOpen={modal} contentClassName="listing-team-members-modal-style" className="modal-dialog-centered">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="pt-0 px-5">
        <DisputeDetailsContainer>
          <div className="d-flex justify-content-between align-items-center mt-1">
            <div>
              <h4 className="font-medium-4 mb-25">#{dispute_number}</h4>
              <p className="fw-bold font-medium-1 mb-0">Project name - {project?.details?.name}</p>
            </div>
            <div className="d-flex">
              <div className="text-end me-2">
                <p className="mb-25">Status</p>
                <h4 className="font-medium-1">{disputeStatusEnum[status]}</h4>
              </div>
              <div className="text-end">
                <p className="mb-25">Raised On</p>
                <h4 className="font-medium-1">{DateTime.fromMillis(created_at).toFormat('MMM dd, yy')}</h4>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center my-2">
            <p className="text-decoration-underline fw-bold blue-btn mb-0 me-3 cursor-pointer">Dispute Resolved</p>
            <p className="text-decoration-underline fw-bold blue-btn mb-0 cursor-pointer" onClick={onReplyClick}>
              Reply
            </p>
          </div>
          <Timeline data={updatedTimelineData} />
        </DisputeDetailsContainer>
      </ModalBody>
    </Modal>
  );
};

export default DisputeDetailsModal;

DisputeDetailsModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  selectedDispute: Proptypes.object,
};

DisputeDetailsModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  selectedDispute: {},
};
