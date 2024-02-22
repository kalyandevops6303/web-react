import React from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import Feedback from '../../assets/images/gifs/feedback_success.gif';
import { AcceptModalWrapper } from './style';

const FeedbackForCompleteModal = ({ onAccept, modal, toggleModal, data }) => {
  const onClose = () => {
    toggleModal();
  };
  const isLoading = useSelector((state) => state.projectDetails.sendDocumentLoading);
  const isSignLoading = useSelector((state) => state.projectDetails.signContractByTalentLoading);

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={isSignLoading || isLoading ? null : onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={Feedback} width={250} height={180} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom">Great Job!</CardTitle>
              <CardSubtitle className="mb-75 subtitle">
                You have successfully completed the <br /> milestone
              </CardSubtitle>
              <CardSubtitle className="subtitle">Milestone: ABC </CardSubtitle>
              <CardSubtitle className="mb-75 subtitle">Project Name: {data?.project?.name} </CardSubtitle>
            </div>
          </div>
          <div className="d-flex gap-1  justify-content-end">
            <Button disabled={isSignLoading || isLoading} outline color="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isSignLoading || isLoading} color="primary" onClick={onAccept}>
              {isSignLoading || isLoading ? <Spinner size="sm" /> : 'Agree & Sign'}
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default FeedbackForCompleteModal;

FeedbackForCompleteModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  onAccept: Proptypes.func,
  data: Proptypes.object,
};

FeedbackForCompleteModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  onAccept: () => {},
  data: {},
};
