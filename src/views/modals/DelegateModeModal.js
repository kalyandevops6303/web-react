/* eslint-disable no-nested-ternary */
import React from 'react';
import Proptypes from 'prop-types';
import '../custom-styles.scss';
import { Button, Modal, ModalHeader, ModalBody, CardTitle, CardSubtitle } from 'reactstrap';
import { useSelector } from 'react-redux';
import AccountCreated from '../../assets/images/accountCreated.png';
import { DelegateModeModalWrapper } from './style';
import DelegateCard from '../cards/DelegateCard';
import { selectSavedUserData, selectUserData } from '../../redux/selectors/authSelectors';
import { userTypes } from '../../utility/constants/Constant';

const DelegateModeModal = ({ modal, toggleModal }) => {
  const userDetailsData = useSelector(selectUserData);
  const savedUserDetails = useSelector(selectSavedUserData);

  const savedUserName = savedUserDetails
    ? savedUserDetails?.user_type === userTypes.talent
      ? `${savedUserDetails?.talent_info?.first_name} ${savedUserDetails?.talent_info?.last_name}`
      : `${savedUserDetails?.client_info?.first_name} ${savedUserDetails?.client_info?.last_name}`
    : '';

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
              <img className="object-cover" src={AccountCreated} width={150} height={150} alt="AccountCreated" />
            </div>
            <div>
              <CardTitle className="modal-heading">Delegate Mode</CardTitle>
              <CardSubtitle className="mb-2 fw-light subtitle">
                You’re in delegate mode. You will be performing actions on behalf of the user
              </CardSubtitle>
              <DelegateCard
                savedUserDetails={savedUserDetails}
                userDetailsData={userDetailsData}
                savedUserName={savedUserName}
              />
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
