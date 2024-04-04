import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AccountCreatedGif from '../../assets/images/accountCreatedGif.gif';

const ClubCreatedModal = ({ modal, toggleModal }) => {
  const navigate = useNavigate();

  const onClose = () => {
    toggleModal();
  };

  const onCountinue = () => {
    onClose();
    navigate('/dashboard');
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onCountinue} />
      <ModalBody>
        <div className="d-flex justify-content-between pr-1">
          <img
            src={AccountCreatedGif}
            width={244}
            height={244}
            alt="account-created"
            className="account-created-image"
          />
          <div>
            <h2 className="modal-heading">Request Submitted</h2>
            <p className="fw-light modal-text w-75 mt-2">Your request to create a Trumio Club account has been received. </p>
            <p className="fw-light modal-text w-75 mt-2">We will get back to you shortly. </p>
          </div>
        </div>
        <div className=" d-flex justify-content-end  pb-2 pe-2">
          <Link to="/dashboard">
            <Button color="primary" onClick={onCountinue}>
              Continue
            </Button>
          </Link>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ClubCreatedModal;

ClubCreatedModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

ClubCreatedModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
