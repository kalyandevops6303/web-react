import React, { useState } from 'react';
import Proptypes from 'prop-types';
import '../../custom-styles.scss';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, ModalHeader, ModalBody, Form, Row, Col, Input, Button } from 'reactstrap';
import { Upload } from 'react-feather';
import Avatar from '@components/avatar';
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';
import { DisputeDetailsContainer } from '../style';
import theme from '../../../configs/themeVariables';
import Timeline from '../../../@core/components/timeline';
import ShowToastMessage from '../../../@core/components/toast';
import { ERROR } from '../../../utility/constants/ToastTypes';

const DisputeDetailsModal = ({ modal, toggleModal }) => {
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

  const ResponseSchema = yup.object().shape({
    response: yup
      .string()
      .min(100, 'Response must be at least 100 characters')
      .max(2000, 'Response must be 2000 characters or less')
      .required('Response is required'),
  });

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ResponseSchema),
  });

  const [updatedTimelineData, setUpdatedTimelineData] = useState(timelineData);
  const [isReplyBoxPresent, setIsReplyBoxPresent] = useState(false);

  const onSubmit = () => {
    trigger();
    if (errors) {
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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-1">
                <Col sm="12" md="12" lg="6">
                  <Controller
                    id="response"
                    name="response"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="textarea" placeholder="Enter your respone to dispute" rows="3" />
                    )}
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
                <Button color="primary" onClick={onSubmit}>
                  Submit
                </Button>
              </div>
            </Form>
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
              <h4 className="font-medium-4 mb-25">#557630</h4>
              <p className="fw-bold font-medium-1 mb-0">Project name - Elementum pulvinar etiam non</p>
            </div>
            <div className="d-flex">
              <div className="text-end me-2">
                <p className="mb-25">Status</p>
                <h4 className="font-medium-1">Resolved</h4>
              </div>
              <div className="text-end">
                <p className="mb-25">Raised On</p>
                <h4 className="font-medium-1">Apr 28, 23</h4>
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
};

DisputeDetailsModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
