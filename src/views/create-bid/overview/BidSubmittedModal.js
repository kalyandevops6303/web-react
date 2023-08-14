import React from 'react';
import Proptypes from 'prop-types';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { AccountCreatedImageContainer } from '../../Onboarding/style';
import AccountCreatedGif from '../../../assets/images/accountCreatedGif.gif';

const BidSubmittedModal = ({ modal, toggleModal }) => (
  <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
    <ModalHeader toggle={toggleModal} />
    <ModalBody>
      <div className="d-flex justify-content-between pr-1">
        <AccountCreatedImageContainer>
          <img
            src={AccountCreatedGif}
            width={244}
            height={244}
            alt="account-created"
            className="account-created-image"
          />
        </AccountCreatedImageContainer>
        <div className="ms-2">
          <p className="font-large-1 text-center mb-3">Well Done!</p>
          <p className="fw-bold font-medium-3 ">Project Bid Submitted</p>
          <p className="w-75">You have completed bidding for this project. Good Luck!</p>
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-center mt-2 mb-2 pe-1">
        <Button color="flat-danger" className="me-1">
          Oops, Recall
        </Button>
        <Button color="primary">Done</Button>
      </div>
    </ModalBody>
  </Modal>
);

export default BidSubmittedModal;

BidSubmittedModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

BidSubmittedModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
