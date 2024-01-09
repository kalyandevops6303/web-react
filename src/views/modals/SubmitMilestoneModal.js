import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, CardSubtitle, Spinner } from 'reactstrap';
import AcceptGif from '../../assets/images/gifs/submit_milestone.gif';
import { AcceptModalWrapper } from './style';

const SubmitMilestoneModal = ({ isFinalSubmit, isLoading, onAccept, modal, toggleModal }) => {
  const onClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="delete-modal" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={isLoading ? null : onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={AcceptGif} width={150} height={150} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom">
                {isFinalSubmit ? 'Final' : 'Interim'} milestone submission!
              </CardTitle>
              <CardSubtitle className="mb-75 fw-bold subtitle">Are you sure you want to submit?</CardSubtitle>
              <CardText className="desc fw-light">Cancel if you want to make some changes.</CardText>
            </div>
          </div>
          <div className="d-flex gap-1 mt-3 justify-content-end">
            <Button disabled={isLoading} outline color="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={onAccept}>
              {isLoading ? <Spinner size="sm" /> : 'Submit'}
            </Button>
          </div>
        </AcceptModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default SubmitMilestoneModal;

SubmitMilestoneModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  onAccept: Proptypes.func,
  isLoading: Proptypes.bool,
  isFinalSubmit: Proptypes.bool,
};

SubmitMilestoneModal.defaultProps = {
  modal: false,
  isLoading: false,
  isFinalSubmit: false,
  toggleModal: () => {},
  onAccept: () => {},
};
