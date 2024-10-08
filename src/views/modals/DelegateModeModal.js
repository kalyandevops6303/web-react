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
import { getItem, setItem } from '../../utility/localStorageControl';
import { delegateTypes } from '@src/utility/constants/Constant';

const DelegateModeModal = ({ modal, toggleModal }) => {
  const userDetailsData = useSelector(selectUserData);

  // const userName = `${userDetailsData?.client_info?.first_name} ${userDetailsData?.client_info?.last_name}`;
const adminUserName = `${userDetailsData?.admin_client_info?.first_name} ${userDetailsData?.admin_client_info?.last_name}`;

const delegateType = getItem('delegateType');

  const onClose = () => {
    setItem('markDelegateModeModalAsSeen', true);
    toggleModal();
  };
//  console.log('userDetailsData', userDetailsData);
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
              <CardTitle className="modal-heading">{delegateType === delegateTypes.payment_delegate ? 'Payment Delegate' : 'Delegate Mode'}</CardTitle>
              <CardSubtitle className="mb-2 fw-light subtitle">
                {delegateType === delegateTypes.payment_delegate ? 'You will be making payments on behalf of the following user:' : 'You’re in delegate mode. You will be performing actions on behalf of the user'}
              </CardSubtitle>
              {userDetailsData && (
                <DelegateNameCard
                  img={
                    userDetailsData?.admin_client_info?.image_uri.length > 0
                      ? userDetailsData?.admin_client_info?.image_uri
                      : userDetailsData?.default_avatar
                  }
                  companyName={userDetailsData?.admin_client_info?.company_name}
                  userName={adminUserName}
                />
              )}
            </div>
          </div>
          <div className="d-flex gap-1 mt-3 justify-content-end">
            <Button onClick={onClose} color="primary">
              Get Started
            </Button>
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
