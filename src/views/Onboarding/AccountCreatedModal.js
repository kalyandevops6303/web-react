import React from 'react';
import Proptypes from 'prop-types';
import { useDispatch } from 'react-redux';
import '../custom-styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AccountCreatedGif from '../../assets/images/accountCreatedGif.gif';
import { AccountCreatedImageContainer } from './style';
import { setLoggedInStatus } from '../../redux/reducers/auth';

const AccountCreatedModal = ({ modal, toggleModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setLoggedInStatus());
    toggleModal();
    navigate('/dashboard');
  };

  const onGetStartedClick = () => {
    dispatch(setLoggedInStatus());
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={onClose} />
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
          <div className="pe-3">
            <h2 className="fw-normal">Your Account is Ready!</h2>
            <p className="fw-light w-75 mt-2">Get started with Trumio.</p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Link to="/dashboard">
          <Button color="primary" onClick={onGetStartedClick}>
            Get Started
          </Button>
        </Link>
      </ModalFooter>
    </Modal>
  );
};

export default AccountCreatedModal;

AccountCreatedModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

AccountCreatedModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
