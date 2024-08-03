/* eslint-disable no-nested-ternary */
import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardSubtitle } from 'reactstrap';
import { useSelector } from 'react-redux';
import DelegateModeGif from '../../assets/images/youDidIt.gif';
import { DelegateModeModalWrapper } from './style';
import { selectUserData } from '../../redux/selectors/authSelectors';
import DelegateNameCard from '../cards/DelegateNameCard';

const DelegateModeModal = ({ modal, toggleModal }) => {
  const userDetailsData = useSelector(selectUserData);

  const userName = `${userDetailsData?.client_info?.first_name} ${userDetailsData?.client_info?.last_name}`;

  const onClose = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style delete-modal" className="modal-dialog-centered">
      <ModalHeader toggle={onClose} />
      <ModalBody>
        <DelegateModeModalWrapper>
          <div className="grid">
            <div className="d-flex justify-content-center align-items-center">
              <img className="object-cover" src={DelegateModeGif} width={150} height={150} alt="AccountCreated" />
            </div>
            <div>
              <CardTitle className="modal-heading">Delegate Mode</CardTitle>
              <CardSubtitle className="mb-2 fw-light subtitle">
                You’re in delegate mode. You will be performing actions on behalf of the user
              </CardSubtitle>
              {userDetailsData && (
                <DelegateNameCard
                  img={
                    userDetailsData?.client_info?.image_uri.length > 0
                      ? userDetailsData?.client_info?.image_uri
                      : userDetailsData?.default_avatar
                  }
                  userType={userDetailsData?.user_type}
                  userName={userName}
                />
              )}
            </div>
          </div>
          <div className="d-flex gap-1 mt-3 justify-content-end">
            <Button color="primary">Get Started</Button>
          </div>
        </DelegateModeModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default DelegateModeModal;

DelegateModeModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
};

DelegateModeModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
};
