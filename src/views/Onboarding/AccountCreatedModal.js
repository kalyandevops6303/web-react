import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Notepad from '../../assets/images/accountCreated.png';
import { AccountCreatedImageContainer } from './style';

const AccountCreatedModal = ({ modal, toggleModal }) => (
  <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog-centered modal-lg">
    <ModalHeader toggle={toggleModal} />
    <ModalBody>
      <div className="d-flex justify-content-between pr-1">
        <AccountCreatedImageContainer>
          <img src={Notepad} alt="account-created" className="account-created-image" />
        </AccountCreatedImageContainer>
        <div>
          <h2 className="fw-normal">Account Created!</h2>
          <p className="fw-light w-75 mt-2">Select continue to increase your discoverability on Trumio.</p>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <Link to="/dashboard">
        <Button color="primary" onClick={toggleModal}>
          Get Started
        </Button>
      </Link>
    </ModalFooter>
  </Modal>
);

export default AccountCreatedModal;

AccountCreatedModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

AccountCreatedModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
