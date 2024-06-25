import React from 'react';
import Proptypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../custom-styles.scss';
import Saved from '../../assets/images/gifs/green_check.gif';
import { RelistModalWrapper } from './style';

const DraftSavedModal = ({ modal, toggleModal, path, onPrimaryBtnClick }) => (
  <Modal isOpen={modal} contentClassName="custom-modal-style" className="modal-dialog-centered modal-lg">
    <ModalHeader toggle={toggleModal} />
    <ModalBody className="pt-0">
      <RelistModalWrapper className="pe-50">
        <div className="d-flex pr-1">
          <div className="me-3 ms-1 mt-4">
            <img src={Saved} alt="you-did-it" width={120} height={120} />
          </div>
          <div>
            <h2 className="mb-1 modal-heading">Draft Saved!</h2>
            <p className="modal-sub-heading mb-50 mt-1">
              We’ve saved your work as a draft. Feel free to return when you’re ready to complete it.
            </p>
            <p className="details m-0 mt-2">
              <span className="fw-bold">Note: </span>To find your drafts please go to,
            </p>
            <p className="details m-0 fw-bold">{path}</p>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center mb-2 mt-3">
          <Button color="primary" outline className="me-2" onClick={toggleModal}>
            Close
          </Button>
          <Button color="primary" onClick={onPrimaryBtnClick}>
            View Drafts
          </Button>
        </div>
      </RelistModalWrapper>
    </ModalBody>
  </Modal>
);

export default DraftSavedModal;

DraftSavedModal.propTypes = {
  modal: Proptypes.bool,
  toggleModal: Proptypes.func,
  path: Proptypes.string,
  onPrimaryBtnClick: Proptypes.func,
};

DraftSavedModal.defaultProps = {
  modal: false,
  toggleModal: () => {},
  path: '',
  onPrimaryBtnClick: () => {},
};
