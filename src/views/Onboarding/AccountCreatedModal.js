import React from 'react';
import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import '../custom-styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AccountCreatedGif from '../../assets/images/accountCreatedGif.gif';
import { AccountCreatedImageContainer } from './style';
import { setLoggedInStatus } from '../../redux/reducers/auth';
const AccountCreatedModal = ({ modal, toggleModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const getOnboardingType = () => {
    const route = window.location.pathname;
  
    if (route.includes('talent-onboarding')) {
      return 'TALENT';
    } else if (route.includes('client-onboarding')) {
      return 'CLIENT';
    } else {
      return null;
    }
  }

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
    <>
      {getOnboardingType() === "TALENT" ?
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
                <h2 className="fw-normal">Account Created!</h2>
                <p className="fw-light mt-2">Take assessment to inrease your discoverability on Trumio.</p>
                <p className="fw-light mt-2"><b>Assessment: </b>Increase your chance of getting hired by taking assessments.</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Link to="/dashboard">
              <Button color="transparent" onClick={onGetStartedClick}>
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/assessments">
              <Button color="primary" onClick={onGetStartedClick}>
                Take Assessment
              </Button>
            </Link>
          </ModalFooter>
        </Modal>
        :
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
      }
    </>
  );
};

export default AccountCreatedModal;

AccountCreatedModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

AccountCreatedModal.defaultProps = {
  modal: false,
  toggleModal: () => { },
};
