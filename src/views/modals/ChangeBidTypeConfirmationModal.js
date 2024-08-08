import React from 'react';
import Proptypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { clearAllFormData } from '../../redux/reducers/formData';

import '../custom-styles.scss';
import Notepad from '../../assets/images/youDidIt.gif';
import { ChangeBidTypeConfirmationModalWrapper } from '../create-bid/style';

// eslint-disable-next-line arrow-body-style
const ChangeBidTypeConfirmationModal = ({ modal, toggleModal, toggleCreateBidModal }) => {
  const dispatch = useDispatch();
  return (
    <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={toggleModal} />
      <ModalBody className="px-2 pb-2">
        <ChangeBidTypeConfirmationModalWrapper className="px-75 pb-50">
          <div className="d-flex pe-1">
            <img src={Notepad} alt="notepad" width={189} height={189} className="notepad-gif me-2" />
            <div>
              <p className="fw-bold modal-custom-heading">Are you sure you want to Change Bid Type?</p>
              <p className="mt-75 modal-custom-sub-heading mb-0">
                Changing Bid Type may result in loss of unsaved milestone data.
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <Button color="flat-primary" className="me-2" onClick={toggleModal}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                toggleModal();
                toggleCreateBidModal();
                dispatch(clearAllFormData());
              }}
            >
              Change Bid Type
            </Button>
          </div>
        </ChangeBidTypeConfirmationModalWrapper>
      </ModalBody>
    </Modal>
  );
};

export default ChangeBidTypeConfirmationModal;

ChangeBidTypeConfirmationModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  toggleCreateBidModal: Proptypes.func,
};

ChangeBidTypeConfirmationModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  toggleCreateBidModal: () => {},
};
