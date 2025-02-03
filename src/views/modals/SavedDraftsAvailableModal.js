import React from 'react';
import Proptypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../custom-styles.scss';
import Available from '../../assets/images/accountCreatedGif.gif';
import { RelistModalWrapper } from './style';

const SavedDraftsAvailableModal = ({
  modal,
  toggleModal,
  modalText,
  firstBtnText,
  secondBtnText,
  firstBtnAction,
  secondBtnAction,
}) => (
  <Modal isOpen={modal} contentClassName="custom-modal-style" className="trumio modal-dialog-centered modal-lg">
    <ModalHeader toggle={toggleModal} />
    <ModalBody className="pt-0">
      <RelistModalWrapper className="pe-50">
        <div className="d-flex pr-1">
          <div className="me-2 ms-1">
            <img src={Available} alt="you-did-it" width={189} height={189} />
          </div>
          <div>
            <h2 className="mb-1 modal-heading">Saved Drafts Available</h2>
            <p className="modal-sub-heading mb-50 mt-1">{modalText}</p>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center mb-2 btns-container">
          <Button color="primary" outline className="me-2" onClick={firstBtnAction}>
            {firstBtnText}
          </Button>
          <Button color="primary" onClick={secondBtnAction}>
            {secondBtnText}
          </Button>
        </div>
      </RelistModalWrapper>
    </ModalBody>
  </Modal>
);

export default SavedDraftsAvailableModal;

SavedDraftsAvailableModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  modalText: Proptypes.string,
  firstBtnText: Proptypes.string,
  secondBtnText: Proptypes.string,
  firstBtnAction: Proptypes.func,
  secondBtnAction: Proptypes.func,
};

SavedDraftsAvailableModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  modalText: '',
  firstBtnText: '',
  secondBtnText: '',
  firstBtnAction: () => {},
  secondBtnAction: () => {},
};
