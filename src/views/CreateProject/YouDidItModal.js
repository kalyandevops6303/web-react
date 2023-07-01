import React from 'react';
import Proptypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../custom-styles.scss';
import Notepad from '../../assets/images/youDidIt.gif';
import { YouDidItGifContainer } from './style';

const YouDidItModal = ({ modal, toggleModal, stepper }) => (
  <Modal
    isOpen={modal}
    toggle={toggleModal}
    contentClassName="custom-modal-style"
    className="modal-dialog-centered modal-lg"
  >
    <ModalHeader toggle={toggleModal} />
    <ModalBody>
      <div className="d-flex justify-content-between pr-1">
        <YouDidItGifContainer>
          <img src={Notepad} alt="you-did-it" width={244} height={244} />
        </YouDidItGifContainer>
        <div>
          <h2 className="fw-bold font-large-1 text-center mb-2">You did it!</h2>
          <h4 className="fw-bold font-small-5">Project listed</h4>
          <p className="fw-light w-75 mt-50">Your project listing will go live on your selected start date</p>
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-center mt-3 mb-2 me-2">
        <Button
          color="flat-danger"
          className="me-1"
          onClick={() => {
            stepper.previous();
            toggleModal();
          }}
        >
          Oops, Recall
        </Button>
        <Button color="primary" onClick={toggleModal}>
          Done
        </Button>
      </div>
    </ModalBody>
  </Modal>
);

export default YouDidItModal;

YouDidItModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  stepper: Proptypes.object,
};

YouDidItModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  stepper: {},
};
