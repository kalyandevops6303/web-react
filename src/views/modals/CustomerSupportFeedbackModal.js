import React from 'react';
import Proptypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../custom-styles.scss';
import GreatJobTick from '../../assets/images/greatJobGif.gif';
import { RelistModalWrapper } from './style';

const FeedbackForCustomerSupportModal = ({ modal, toggleModal }) => (
  <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
    <ModalHeader toggle={toggleModal} />
    <ModalBody className="pt-0">
      <RelistModalWrapper className="pe-50">
        <div className="d-flex pr-1 mt-1">
          <div className="ms-2 me-3 d-flex align-items-end mb-2">
            <img src={GreatJobTick} alt="project-relisted" width={120} height={120} />
          </div>
          <div>
            <h2 className="mb-1">Thanks for contacting us!</h2>
            <p className="note-text font-medium-3 mt-75">We’ll get back to you soon.</p>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center mb-2 mt-1">
          <Button outline color="primary" onClick={toggleModal}>
            Close
          </Button>
        </div>
      </RelistModalWrapper>
    </ModalBody>
  </Modal>
);

export default FeedbackForCustomerSupportModal;

FeedbackForCustomerSupportModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

FeedbackForCustomerSupportModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
