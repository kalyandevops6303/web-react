import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardText, Spinner } from 'reactstrap';
import Notepad from '../../assets/images/youDidIt.gif';
import { AcceptModalWrapper } from './style';

const AcceptMilestoneModal = ({ isLoading, onAccept, modal, toggleModal }) => {
  const onClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="delete-modal" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={isLoading ? null : onClose} />
      <ModalBody>
        <AcceptModalWrapper>
          <div className="d-flex justify-content-between pr-1">
            <img className="gif" src={Notepad} width={150} height={150} alt="gif" />
            <div className="content-side">
              <CardTitle className="modal-title-custom">Accept milestone submission?</CardTitle>
              <CardText className="desc fw-light">
                By accepting, you confirm that you&apos;re satisfied with the milestone submission.
              </CardText>
              <CardText className="desc fw-light">
                If not then connect with the talent/team if you require any changes.
              </CardText>
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

export default AcceptMilestoneModal;

AcceptMilestoneModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  onAccept: Proptypes.func,
  isLoading: Proptypes.bool,
};

AcceptMilestoneModal.defaultProps = {
  modal: false,
  isLoading: false,
  toggleModal: () => {},
  onAccept: () => {},
};
